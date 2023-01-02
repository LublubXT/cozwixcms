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


var dataStorage = []
var editdataStorage = []

const Post = mongoose.model("Post", postSchema);


module.exports = { postSchema, Post, dataStorage, editdataStorage }
