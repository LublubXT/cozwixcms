const express = require("express");
let router = express.Router();
const ejs = require("ejs")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const multer = require("multer");
const sharp = require('sharp');
const fs = require('fs');

const app = express()
app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'))

const variable = require("../variables")

const edit = require("./editpost")
router.use("/edit", edit)


const del = require("./deletepost")
router.use("/delete", del)



var headerImage = ""
var postTitle = ""
var subText = ""
var postcategory = ""
var postauthor = ""

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
    const fileTypes = /jpeg|jpg|png|gif|svg/;

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
    .get("/", (req, res) => {

        res.redirect('/admin/home');

    })

router
    .get("/home", (req, res) => {

        res.render('admin/home');

    })

router
    .get("/posts", (req, res) => {

        variable.Post.find({}, function(err, p) {
            if (err) {
                console.log(err)
            } else {

                res.render('admin/posts', { data: p, json: JSON.stringify(p) });
            }
        })


    })

router
    .get("/newpostsetup", (req, res) => {

        res.render('admin/newpostsetup');

    })

router
    .get("/newpost", (req, res) => {

        res.render('admin/newpost', { "data": JSON.stringify(variable.dataStorage) });

    })

router
    .post("/uploadimage", upload.single("image"), async(req, res) => {

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

            variable.dataStorage = JSON.parse(req.body.data)
            res.redirect('/admin/newpost')
        } else {
            res.status(400).send("Please upload a valid image");
        }

    })

router
    .post("/uploadimageedit", upload.single("image"), async(req, res) => {

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

            variable.editdataStorage = JSON.parse(req.body.data)
            res.redirect(`/admin/edit/${variable.editdataStorage.slug}`)
        } else {
            res.status(400).send("Please upload a valid image");
        }

    })

router
    .post("/savepostdetails", upload.single("image"), async(req, res) => {

        if (req.file) {
            headerImage = req.file.filename
            postTitle = req.body.posttitle
            subText = req.body.postsubtext
            postauthor = req.body.postauthor
            postcategory = req.body.postcategory

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

            res.redirect('/admin/newpost')
        } else {
            res.status(400).send("Please upload a valid image");
        }



    })

router
    .post("/save-edit", (req, res) => {

        // variable.dataStorage = JSON.parse(req.body.data)
        // console.log("data", JSON.parse(req.body.data))

        variable.editdataStorage = JSON.parse(req.body.data)


        variable.Post.findOne({ slug: variable.editdataStorage.slug }, function(err, p) {
            if (err) {
                console.log(err)
            } else {
                console.log(p)

                p.slug = variable.editdataStorage.slug
                p.author = variable.editdataStorage.author
                p.category = variable.editdataStorage.category
                p.headerImage = variable.editdataStorage.headerImage
                p.postTitle = variable.editdataStorage.postTitle
                p.underText = variable.editdataStorage.underText
                p.data = variable.editdataStorage.data

                p.save(function() {
                    res.redirect("/admin/posts");
                });

                variable.editdataStorage = []

            }
        })

    })

router
    .post("/save", (req, res) => {

        // variable.dataStorage = JSON.parse(req.body.data)
        // console.log("data", JSON.parse(req.body.data))

        variable.dataStorage = JSON.parse(req.body.data)



        var currentdate = new Date();
        var datetime = currentdate.getDate() + "/" +
            (currentdate.getMonth() + 1) + "/" +
            currentdate.getFullYear()

        const post = new variable.Post({
            id: generateString(10),
            slug: titleToSlug(postTitle),
            author: postauthor,
            dateposted: datetime,
            category: postcategory,
            headerImage: headerImage,
            postTitle: postTitle,
            underText: subText,
            data: variable.dataStorage
        })

        post.save()

        variable.dataStorage = []

        res.redirect('/admin/posts')


    })

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const titleToSlug = title => {
    let slug;

    // convert to lower case
    slug = title.toLowerCase();

    // remove special characters
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

    // replace spaces with dash symbols
    slug = slug.replace(/ /gi, "-");

    // remove consecutive dash symbols 
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');

    // remove the unwanted dash symbols at the beginning and the end of the slug
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
};


module.exports = router;
// module.exports = variable.dataStorage;