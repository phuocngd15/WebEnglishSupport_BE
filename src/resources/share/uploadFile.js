import multer from 'multer'

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './public/exam')
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024 // max file 50mb
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(pdf|mp3|doc|docx)$/)) {
      return callback(new Error('Only upload file with pdf, mp3, doc, docx'))
    }
    callback(undefined, true) // continue with upload
  }
})
