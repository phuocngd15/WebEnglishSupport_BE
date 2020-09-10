var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/"
MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error, databases) {
        if (error) {
            throw error;

        }
        var dbase = databases.db("KoiEnglish");
        dbase.collection("cardsClt").drop(function (error, delOK) {
            if (error) {
                throw error;
            }
            if (delOK) console.log("Collection deleted");
            databases.close();
        });
    });  