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
    .get("/:postSlug", async(req, res) => {

        // this will give you the product slug
        const pslug = req.params.postSlug;
        // console.log(pslug)
        await variable.Post.deleteOne({ slug: `${pslug}` })
        res.redirect('/admin/home');

    })


module.exports = router;