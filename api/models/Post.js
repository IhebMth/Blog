const mongoose = require("mongoose")
const {Schema, model} = mongoose;


const PostSchema= new Schema({
    title: String, 
    summary:String,
    content:String,
    cover: String,
    category: {
        type: String, 
        enum: ["Html", "Css", "JavaScript", "ReactJs", "Books", "Jobs"], 
        default: 'Html'},
    author: {type:Schema.Types.ObjectId, ref:'User'},
}, {
    // updated at / created at
    timestamps: true, 
})

const PostModel = model('Post', PostSchema)

module.exports = PostModel