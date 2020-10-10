require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;
const Image = require('./mongodb/image');
const path = require('path');
const fs = require('fs');
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get('/', express.static(path.join(__dirname, './public')));

app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// IMAGE UPLOAD CONFIGURATION
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, image, cb) => {
    console.log(image);
    var filetype = '';
    if (image.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (image.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (image.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
try {
  mongoose.connect('mongodb://localhost/crud-images', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  });
} catch (error) {}

// since mongoose promise is depreciated, we overide it with node's promise
mongoose.Promise = global.Promise;

// Initialize CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
var upload = multer({ storage: storage });

// ROUTES
app.get('/', (req, res) => {
  Image.find(function(err, images) {
    if (err) {
      res.json(err.message);
    } else {
      res.json(images);
    }
  });
});

app.post('/add', upload.single('image'), (req, res) => {
  // console.log("Request ---", req.body);
  console.log('Request file ---', req.file); // Here you get file.

  if (!req.file) {
    res.status(500);
    return next(err);
  } else {
    Image.create(req.body, function(err, image) {
      const tempPath = req.file.path;
      if (path.extname(req.file.originalname).toLowerCase() === '.png') {
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
        });
      }
      req.body.image =
        'http://192.168.0.7:5000/public/images/' + req.file.filename;
      if (err) {
        res.json(err.message);
        console.log(err);
        return res.redirect('/');
      }
      image.image = req.body.image;
      image.save();
      // res.json(req.body)
      res.json(image);
    });
  }
});

app.get('/:id', function(req, res) {
  let id = req.params.id;
  Image.findById(id, {}).then(data => {
    // res.json(data);
    res.sendFile(path.join(__dirname, data.image));
  });
});

app.listen(port, () => {
  console.log(
    '\u{1F525}\u{1F680} app listen on port',
    port,
    '\u{1F525}\u{1F680}'
  );
});
