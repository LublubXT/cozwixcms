const mongoose = require('mongoose');

mongoose.connect('mongo atlas link here')


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
    slug: String,
    data: []
}

var dataStorage = []
var editdataStorage = []

const Post = mongoose.model("Post", postSchema);
const Page = mongoose.model("Page", postSchema);

const page = new Page({
    id: 'homepage',
    slug: '',
    data: [
        { id: "randomid", type: 'headerimg', data: '' }
    ]
})

// page.save()

module.exports = { postSchema, Post, Page, pageSchema, dataStorage, editdataStorage }
