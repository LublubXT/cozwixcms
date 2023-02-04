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

const editpage = require("./editpage")
router.use("/editpage", editpage)

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
    const fileTypes = /jpeg|jpg|png|gif|mp4|ogg|webm|mp3|wav/;

    //check extension names
    const extName = path.extname(file.originalname).toLowerCase()

    const mimeType = file.mimetype

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Not right file type!!");
    }
};

router
    .get("/", (req, res) => {
        res.render('admin/login');
        // if (variable.permittedIn == true) {
        //     res.redirect('/admin/home');
        // } else if (variable.permittedIn == false) {
        //     res.redirect('/')
        // }

    })

router
    .post("/login", (req, res) => {
        var username = req.body.username
        var password = req.body.password

        fs.readFile('./setupdata.json', 'utf8', (error, data) => {
            if (error) {
                console.log(error);
                return;
            }
            data = JSON.parse(data)
                // console.log(data)
            var user = data.username
            var pass = data.password

            // console.log("username: ", username, user)
            // console.log("password: ", password, pass)

            if (username === user && password === pass) {
                // console.log("Your in!")
                variable.permittedIn = true
                res.redirect('/admin/home')
            } else if (username !== user && password !== pass) {
                // console.log("You can't come in!")
                res.redirect("/")
            }
        })

    })

router
    .get("/home", (req, res) => {
        if (variable.permittedIn == true) {
            res.render('admin/home');
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }
    })

router
    .get("/posts", (req, res) => {
        if (variable.permittedIn == true) {

            variable.Post.find({}, function(err, p) {
                if (err) {
                    console.log(err)
                } else {

                    res.render('admin/posts', { data: p, json: JSON.stringify(p.reverse()) });
                }
            })
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }


    })

router
    .get("/pages", (req, res) => {
        if (variable.permittedIn == true) {
            variable.Page.find({}, function(err, p) {
                if (err) {
                    console.log(err)
                } else {

                    res.render('admin/pages', { data: p, json: JSON.stringify(p) });
                }
            })
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }


    })

router
    .get("/newpostsetup", (req, res) => {
        if (variable.permittedIn == true) {
            res.render('admin/newpostsetup');
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }
    })

router
    .get("/newpost", (req, res) => {
        if (variable.permittedIn == true) {
            res.render('admin/newpost', { "data": JSON.stringify(variable.dataStorage) });
        } else if (variable.permittedIn == false) {
            res.redirect('/')
        }
    })

router
    .post("/uploadaudio", upload.single("audio"), async(req, res) => {
        if (req.file) {
            const { filename: audio } = req.file;

            // console.log("this data isn't working", audio)

            variable.dataStorage = JSON.parse(req.body.data)
            res.redirect(`/admin/newpost`)
        } else {
            res.status(400).send("Please upload a valid audio");
        }

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
    .post("/uploadvideo", upload.single("video"), async(req, res) => {

        if (req.file) {
            const { filename: video } = req.file;

            // console.log("this data isn't working", req.body.data)

            variable.dataStorage = JSON.parse(req.body.data)
            res.redirect('/admin/newpost')
        } else {
            res.status(400).send("Please upload a valid video");
        }

    })

router
    .post("/uploadvideoedit", upload.single("video"), async(req, res) => {
        if (req.file) {
            const { filename: video } = req.file;

            // console.log("this data isn't working", req.body.data)

            variable.editdataStorage = JSON.parse(req.body.data)
            res.redirect(`/admin/edit/${variable.editdataStorage.slug}`)
        } else {
            res.status(400).send("Please upload a valid video");
        }

    })

router
    .post("/uploadaudioedit", upload.single("audio"), async(req, res) => {
        if (req.file) {
            const { filename: audio } = req.file;

            // console.log("this data isn't working", audio)

            variable.editdataStorage = JSON.parse(req.body.data)
            res.redirect(`/admin/edit/${variable.editdataStorage.slug}`)
        } else {
            res.status(400).send("Please upload a valid audio");
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


        variable.Post.findOne({ id: variable.editdataStorage.id }, function(err, p) {
            if (err) {
                console.log(err)
            } else {
                // console.log(variable.editdataStorage, p)

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
    let result = '';
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