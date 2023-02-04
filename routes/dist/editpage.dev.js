"use strict";

var express = require("express");

var router = express.Router();

var ejs = require("ejs");

var bodyParser = require("body-parser");

var mongoose = require('mongoose');

var variable = require("../variables");

var app = express();
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(express["static"]('public'));
router.get("/:postSlug", function(req, res) {
    // this will give you the product slug
    var pslug = req.params.postSlug;
    console.log(pslug);
    variable.Page.findOne({
        id: "".concat(pslug)
    }, function(err, p) {
        if (err) {
            console.log(err);
        } else {
            // console.log(p)
            res.render('admin/editpage', {
                data: JSON.stringify(p)
            });
        }
    });
});
module.exports = router;