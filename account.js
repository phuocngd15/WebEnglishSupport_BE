const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const Account = require("./register/registerModel");
const path = require('path');
const fs = require('fs');
// put the HTML file containing your form in a directory named "public" (relative to where this script is located)
app.get("/", express.static(path.join(__dirname, "./public")));

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

// Connect db
mongoose.connect("mongodb://localhost/account", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(() => { console.log("DB is connected") })


// Register
const r = require('./register/registerRouter');
app.use(r);



app.get("/:id", function (req, res) {
    let id = req.params.id;
    Account.findById(id, {})
        .then(data => res.json(data));
})
app.put("/:id", function (req, res) {
    let id = req.params.id;
    Account.findById(id, {})
        .then(Account.update(req.body, id, function (err, account) {
            if (err) {
                res.json(err.message);
                console.log(err);
                return res.redirect("/");
            }
            account = req.body;
            // account.save();
            // res.json(req.body)
            res.json(account)
        }))
});


app.listen(port, () => {
    console.log("\u{1F525}\u{1F680} app listen on port", port, "\u{1F525}\u{1F680}")
});