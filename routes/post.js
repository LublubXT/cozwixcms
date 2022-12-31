const express = require("express");
let router = express.Router();
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const variable = require("../variables")

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))


router
    .get("/:postSlug", (req, res) => {

        // this will give you the product slug
        const pslug = req.params.postSlug;
        console.log(pslug)
        variable.Post.findOne({ slug: `${pslug}` }, function(err, p) {
            if (err) {
                console.log(err)
            } else {
                console.log(p)

                res.render('post', { data: p, json: JSON.stringify(p) });
            }
        })

    })


module.exports = router;