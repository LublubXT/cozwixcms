const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const admin = require("./routes/admin")
app.use("/admin", admin)

const post = require("./routes/post")
app.use("/post", post)


const variable = require("./variables")

app.get("/", (req, res) => {

    variable.Post.find({}, function(err, p) {
        if (err) {
            console.log(err)
        } else {

            res.render('index', { data: p[p.length - 1], json: JSON.stringify(p[p.length - 1]) });
        }
    })

})


app.listen(3000, function() {
    console.log('Server started on port 3000.');
});