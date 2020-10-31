const multer = require('multer') ;
const  Exam = require('./examModel');

exports.upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, '../../../public/exam');
    },
    filename(req, file, callback) {
      callback(null, `${new Date().getTime()}_${file.orignalname}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024 // max file 50mb
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(pdf|mp3|doc|docx)$/)) {
      return callback(
        new Error(
          'Only upload file with pdf, mp3, doc, docx'
        )
      )
    }
    callback(undefined, true) // continue with upload
  }
});

exports.postExam = async function(req, res, next){
  try {
    const { title, type } = req.body;
    const { path, mimetype } = req.file;
    const exam = new Exam({
      title,
      type,
      file_path: path,
      file_mimetype: mimetype
    });
    await exam.save();
    return res.send('File uploaded successfully.');
  } catch (error) {
    return res.status(400).send('Error while uploading file. Try again later.');
  }
};

exports.getExam = async (req, res, next) => {
  try {
    const exam = await Exam.find({});
    const sortedByCreationDate = exam.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    return res.send(sortedByCreationDate);
  } catch (error) {
    return res.status(400).send('Error while getting list of files. Try again later');
  }
};

// exports.getOneExam = async (req, res, next) => {
//   try {
//     const exam = await Exam.findById(req.params.id);
//     res.set({
//       'Content-Type':exam.file_mimetype
//     });
//     res.sendFile(path.join(__dirname,'..', exam.file_path));
//   } catch(error){
//     res.status(400).send('Error while ')
//   }
// }

