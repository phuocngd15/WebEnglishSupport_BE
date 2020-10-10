var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/';
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, databases) {
    if (error) {
      throw error;
    }
    var dbase = databases.db('KoiEnglish');
    dbase.createCollection('cardsClt', function(error, response) {
      if (error) {
        throw error;
      }
      console.log('collection is created.....');
      databases.close();
    });
  }
);
