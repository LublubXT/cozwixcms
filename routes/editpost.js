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
            console.log(pslug)
            variable.Post.findOne({ slug: `${pslug}` }, function(err, p) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(p)
                    // console.log('editdatastorage', variable.editdataStorage)
                    if (variable.editdataStorage.length == 0 || variable.editdataStorage == null || variable.editdataStorage == undefined) {
                        // console.log('load normally')
                        p = JSON.stringify(p)

                        res.render('admin/editpost', { data: p.replaceAll("'", "\\'"), nsdata: JSON.parse(p) });
                    } else if (variable.editdataStorage.length != 0 || variable.editdataStorage.length != undefined) {
                        // console.log('load dataStoruage')
                        p = JSON.stringify(variable.editdataStorage)
                        res.render('admin/editpost', { data: p.replaceAll("'", "\\'"), nsdata: variable.editdataStorage });
                    }

                }
            })
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }

    })


module.exports = router;