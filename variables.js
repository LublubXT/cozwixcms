const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect('mongodb://127.0.0.1:27017/')

var setupData;

const postSchema = {
    id: String,
    slug: String,
    author: String,
    dateposted: String,
    category: String,
    headerImage: String,
    postTitle: String,
    underText: String,
    data: []
}

const pageSchema = {
    id: String,
    fileName: String,
    pageName: String,
    importPostData: [String],
    slug: String,
    data: []
}

var dataStorage = []
var pagedataStorage = []
var editdataStorage = []

const Post = mongoose.model("Post", postSchema);
const Page = mongoose.model("Page", pageSchema);

// addPosts()


fs.readFile('./setupdata.json', 'utf8', async(error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    // setupData = JSON.parse(data)
    // console.log(JSON.parse(data));
    data = JSON.parse(data)
    if (data.createPages == true) {
        console.log('creat pages == true')
        if (data.createPagesAmount == "all") {
            console.log('Creating Pages...')
            async function creatingPages() {
                for (var i = 0; i < data.pages.length; i++) {
                    const page = new Page({
                        id: data.pages[i].id,
                        fileName: data.pages[i].fileName,
                        pageName: data.pages[i].pageName,
                        slug: data.pages[i].slug,
                        importPostData: data.pages[i].importPostData,
                        data: data.pages[i].data
                    })
                    console.log(i)
                    await page.save()
                }
                data.createPages = false
                fs.writeFile('./setupdata.json', JSON.stringify(data), function writeJSON(err) {
                    if (err) return console.log(err);
                    // console.log(JSON.stringify(data));
                });
            }
            await creatingPages()
            console.log("Done Creating Pages...")
        } else if (data.createPagesAmount != "all") {
            console.log('creating all pages')
            const page = new Page(data.pages[data.createPagesAmount])
            await page.save()
            data.createPages = false
            fs.writeFile('./setupdata.json', JSON.stringify(data), function writeJSON(err) {
                if (err) return console.log(err);
                // console.log(JSON.stringify(data));
            });
        }
    } else if (data.createPages != true) {
        console.log("Can't create pages")
    }

})


var blogPostHeaderImage = false
var editpageslug = ''
var permittedIn = false


module.exports = { postSchema, Post, Page, pageSchema, dataStorage, editdataStorage, blogPostHeaderImage, editpageslug, pagedataStorage, permittedIn }