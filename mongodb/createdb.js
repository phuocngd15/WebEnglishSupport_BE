var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/KoiEnglish';
MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(error, databases) {
    // use for to connect to the databases
    if (error) {
      throw error;
    }
    var dbobject = databases.db('KoiEnglish'); // use for create database
    console.log('databases is created');
    databases.close();
  }
);
