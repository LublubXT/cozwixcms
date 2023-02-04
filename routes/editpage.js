const express = require("express");
let router = express.Router();
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const variable = require("../variables")
const multer = require("multer");
const sharp = require('sharp');
const fs = require('fs');

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

//Setting storage engine
const storageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

const path = require("path");

const checkFileType = function(file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg|mp4|ogg|webm/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};


router
    .get("/:postSlug", (req, res) => {
        if (variable.permittedIn == true) {
            // this will give you the product slug
            const pslug = req.params.postSlug;
            console.log(pslug)
            variable.editpageslug = pslug
            variable.Page.findOne({ id: `${pslug}` }, function(err, p) {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(p)
                    // console.log('editdatastorage', variable.pagedataStorage)
                    if (variable.pagedataStorage.length == 0 || variable.pagedataStorage == null || variable.pagedataStorage == undefined) {
                        // console.log('load normally')
                        p = JSON.stringify(p)
                            // console.log(p.replaceAll("'", "\\'"))
                            // console.log(p)
                        res.render('admin/editpage', { data: p.replaceAll("'", "\\'") });
                    } else if (variable.pagedataStorage.length != 0 || variable.pagedataStorage.length != undefined) {
                        // console.log('load dataStoruage')
                        p = JSON.stringify(variable.pagedataStorage)

                        res.render('admin/editpage', { data: p.replaceAll("'", "\\'") });
                    }

                }
            })
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }

    })

router
    .post("/uploadimg", upload.single("image"), async(req, res) => {

        if (req.file) {
            const { filename: image } = req.file;

            await sharp(req.file.path)
                .resize({
                    fit: sharp.fit.contain,
                    width: 1040
                })
                .jpeg({ quality: 90 })
                .toFile(
                    path.resolve(req.file.destination, 'resized', image)
                )
            fs.unlinkSync(req.file.path)

            variable.pagedataStorage = JSON.parse(req.body.data)
            res.redirect(`/admin/editpage/${variable.editpageslug}`)
        } else {
            res.status(400).send("Please upload a valid image");
        }

    })

router
    .post("/save", async(req, res) => {
        var data = JSON.parse(req.body.data)
        console.log("body.data", typeof data, data)

        variable.Page.findOne({ id: variable.editpageslug }, function async(err, p) {
            if (err) {
                console.log(err)
            } else {
                // console.log("p.data", p.data)

                p.data = data
                variable.editpageslug = ''
                variable.pagedataStorage = []

                p.save(function async() {
                    res.redirect("/admin/home");
                });


            }
        })

    })


module.exports = router;