var mongodb = require('mongodb');
var assert = require('assert');
var fs = require('fs');
var MongoClient = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017/KoiEnglish';
var url =
  'mongodb+srv://trucntt1999:<password>@englishsupport.7g7vi.mongodb.net/<dbname>?retryWrites=true&w=majority';

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, databases) {
    if (error) {
      throw error;
    }
    var dbase = databases.db('KoiEnglish');
    /*  dbase.createCollection("cardsClt", function (error, response) {
             if (error) {
                 throw error;
             }
             console.log("collection is created.....")
             databases.close();
         }); * / */

    var bucket = new mongodb.GridFSBucket(dbase, { bucketName: 'audioTest' });

    fs.createReadStream('../audio/avamax.mp3')
      .pipe(bucket.openUploadStream('avamax.mp3'))
      .on('error', function(error) {
        assert.ifError(error);
      })
      .on('finish', function() {
        console.log('done!');
        process.exit(0);
      });
  }
);
