import { Router } from 'express';
import { google } from 'googleapis';
import fs from 'fs';
import { ggAuthorize } from './ggdrive/config';
const CREDENTIAL = './ggdrive/credentials.json';
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
router.get('/getOne', async (req, clientRes) => {
  try {
    console.log(req.query);
    const { id } = req.query;
    console.log('test get all file');
    const download = async auth => {
      const drive = google.drive({ version: 'v3', auth });

      // var fileId = '1TuI1WgsC9XmWj4PBSSXVoohdSg1bT3i4'; // img
      var fileId = '17R-pfSN8PNx8c185efLN-QXEdQL8rtdm'; // pdf
      var dest = fs.createWriteStream(`./aaa.pdf`);
      // var dest;
      drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' },
        (error, ggRes) => {
          ggRes.data
            .on('end', () => {
              console.log('Done');
            })
            .on('error', () => {
              console.log('Error', error);
            })
            .pipe(dest);
        }
      );
    };

    fs.readFile(
      './src/resources/uploadExam/ggdrive/credentials.json',
      (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        ggAuthorize(JSON.parse(content), download);
      }
    );
  } catch (error) {
    clientRes
      .status(400)
      .send('Error while getting list of files. Try again later.');
  }
});
export default router;
