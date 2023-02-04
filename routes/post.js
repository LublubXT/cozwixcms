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
        if (variable.permittedIn == true) {
            // this will give you the product slug
            const pslug = req.params.postSlug;
            // console.log(pslug)
            variable.Post.findOne({ slug: `${pslug}` }, function(err, p) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log("p data", p.data[p.data.length - 1].data)
                    variable.Post.find({}, function(err, a) {

                        res.render('post', { postdata: p, postjson: JSON.stringify(p), last3postdata: a.slice(-3) });
                    })
                }
            })
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }

    })


module.exports = router;