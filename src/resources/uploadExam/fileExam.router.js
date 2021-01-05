import { Router } from 'express';
import { google } from 'googleapis';
import fs from 'fs';
import { ggAuthorize } from './ggdrive/config';
import multer from 'multer';
const CREDENTIAL = './src/resources/uploadExam/ggdrive/credentials.json';
const router = Router();

router.get('/getAllFiles', async (req, clientRes) => {
  try {
    console.log('test get all file');
    const listFiles = auth => {
      const drive = google.drive({ version: 'v3', auth });
      let getFiles = null;
      drive.files.list(
        {
          // pageSize: so luong file
          // pageSize: 1,
          fields: 'nextPageToken, files'
        },
        (err, googleRes) => {
          if (err)
            return console.log('listFiles, The API returned an error: ' + err);
          const files = googleRes.data.files;
          getFiles = files;
          if (files.length) {
            console.log('Files:');
            files.map(file => {
              console.log(`${file.name} (${file.id}) (${file.webContentLink})`);
            });
          } else {
            console.log('No files found.');
          }
          clientRes.send(getFiles);
        }
      );
      console.log('getFiles', getFiles);
    };

    fs.readFile(
      './src/resources/uploadExam/ggdrive/credentials.json',
      (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        ggAuthorize(JSON.parse(content), listFiles);
      }
    );
  } catch (error) {
    clientRes
      .status(400)
      .send('Error while getting list of files. Try again later.');
  }
});
router.get('/getOne/:id', async (req, clientRes) => {
  try {
    const { id } = req.params;
    console.log('req.query', req.query);
    console.log('req.params', req.params);
    console.log('test get all file');
    const download = auth => {
      const drive = google.drive({ version: 'v3', auth });

      // var fileId = '1wrbAeA27oBQi-_3116_evqngJNTQMtTY'; // img
      // var fileId = '17R-pfSN8PNx8c185efLN-QXEdQL8rtdm'; // pdf
      var dest = fs.createWriteStream(`./aaa.jpg`);
      // var dest;
      drive.files.get(
        { fileId: id, alt: 'media' },
        { responseType: 'stream' },
        (error, ggRes) => {
          ggRes.data
            .on('end', () => {
              console.log('Done');
            })
            .on('error', () => {
              console.log('Error', error);
            })
            .pipe(clientRes);
        }
      );
    };

    fs.readFile(CREDENTIAL, (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      ggAuthorize(JSON.parse(content), download);
    });
  } catch (error) {
    clientRes
      .status(400)
      .send('Error while getting list of files. Try again later.');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    // destination(req, file, cb) {
    //   cb(null, "./files");
    // },
    filename(req, file, cb) {
      cb(null, `${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls|mp3)$/)
    ) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post(
  '/upload',
  upload.single('file'),
  async (req, clientRes) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;

      console.log(req.file);
      /*  fileName = req.file.filename;
      mimeType = mimetype;
      place = path;
      const file = new File({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype
      }); */
      const uploadFile = auth => {
        const drive = google.drive({ version: 'v3', auth });

        var fileMetadata = {
          // name: "audio.mp3",
          name: req.file.filename
        };
        var media = {
          // mimeType: "audio/mpeg",
          mimeType: mimetype,
          // body: fs.createReadStream("files/audio.mp3"),
          body: fs.createReadStream(path)
        };
        // console.log(fileMetadata," ", media)
        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: 'id'
          },
          function(err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
              console.log('File : ', file.data);
            }
          }
        );
      };
      fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        //   authorize(JSON.parse(content), uploadFile);
        ggAuthorize(JSON.parse(content), uploadFile);
      });

      //  console.log(file);
      // fs.unlinkSync(req.file.path);

      clientRes.send('file uploaded successfully.');

      //   await file.save();
      //   res.send("file uploaded successfully.");.
    } catch (error) {
      clientRes
        .status(400)
        .send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
export default router;
