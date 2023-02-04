const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const fs = require('fs')

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

    variable.Post.find({}, function(err, postdata) {
        if (err) {
            console.log(err)
        } else {
            variable.Page.findOne({ id: 'homepage' }, function(err, pagedata) {
                if (err) {
                    console.log(err)
                } else {

                    // console.log(pagedata)

                    // console.log("Home...")
                    var importData = {
                        postdata: '',
                        postjson: '',
                        allpostdata: '',
                        allpostjson: '',
                        last3postdata: '',
                        last3postjson: '',
                        pagedata: pagedata.data,
                        pagejson: JSON.stringify(pagedata)
                    }
                    for (var i = 0; i < pagedata.importPostData.length; i++) {
                        if (pagedata.importPostData[i] == "lastPostData") {
                            importData.postdata = postdata[postdata.length - 1]
                            importData.postjson = JSON.stringify(postdata[postdata.length - 1]).replaceAll("'", "\\'")
                        } else if (pagedata.importPostData[i] == "allPostData") {
                            importData.allpostdata = postdata
                            importData.allpostjson = JSON.stringify(postdata).replaceAll("'", "\\'")
                        } else if (pagedata.importPostData[i] == "last3Posts") {
                            importData.last3postdata = postdata.slice(-3)
                            importData.last3postjson = JSON.stringify(postdata.slice(-3)).replaceAll("'", "\\'")
                        }
                    }

                    // for (var i = 0; i < pagedata.importPostData.length; i++) {
                    //     if (pagedataimportPostData[i] == "lastPostData") {
                    //         var postd = postdata[postdata.length - 1]
                    //         var postjs = JSON.stringify(postdata[postdata.length - 1])
                    //     } else if (pagedata.importPostData[i] == "allPostData") {
                    //         var allpostdata = postdata
                    //         var allpostjson = JSON.stringify(postdata)
                    //     } else if (pagedata.importPostData[i] == "last3Posts") {
                    //         var last3postdata = postdata.slice(-3)
                    //         var last3postjson = JSON.stringify(postdata.slice(-3))
                    //     }

                    // }
                    // console.log(postd, postjs, allpostdata, allpostjson, last3postdata, last3postjson)

                    res.render('index', importData);
                }
            })


        }
    })

})

app.get("/:pageSlug", (req, res) => {

    // this will give you the product slug
    const pslug = req.params.pageSlug;
    // console.log("pslug", pslug)

    if (pslug != "" && pslug != "favicon.ico") {
        variable.Page.findOne({ slug: `${pslug}` }, function(err, pagedata) {
            if (err) {
                console.log(err)
            } else {
                // console.log(pagedata)
                var importData = {
                    postdata: '',
                    postjson: '',
                    allpostdata: '',
                    allpostjson: '',
                    last3postdata: '',
                    last3postjson: '',
                    pagedata: pagedata.data,
                    pagejson: JSON.stringify(pagedata)
                }

                // console.log(pagedata.importPostData)

                if (pagedata.importPostData.length == 0) {
                    // console.log("only page dta")
                    res.render(`${pagedata.fileName}`, importData);
                } else if (pagedata.importPostData.length != 0) {
                    variable.Post.find({}, function(err, postd) {
                        if (err) {
                            console.log(err)
                        } else {
                            async function displayPost() {
                                // postd = await postd.reverse()
                                for (var i = 0; i < pagedata.importPostData.length; i++) {
                                    if (pagedata.importPostData[i] == "lastPostData") {
                                        importData.postdata = postd[postd.length - 1]
                                        importData.postjson = JSON.stringify(postd[postd.length - 1]).replaceAll("'", "\\'")
                                    } else if (pagedata.importPostData[i] == "allPostData") {

                                        importData.allpostdata = postd.reverse()
                                        importData.allpostjson = JSON.stringify(importData.allpostdata).replaceAll("'", "\\'")
                                    } else if (pagedata.importPostData[i] == "last3Posts") {
                                        importData.last3postdata = postd.slice(-3)
                                        importData.last3postjson = JSON.stringify(postd.slice(-3)).replaceAll("'", "\\'")
                                    }
                                }
                                // importData = JSON.stringify(importData)
                                // console.log("paged data", importData.pagedata)
                                res.render(`${pagedata.fileName}`, importData)
                            }

                            displayPost()
                        }
                    })

                }

            }
        })
    }



})


app.listen(3001, function() {
    console.log('Server started on port 3001.');
});