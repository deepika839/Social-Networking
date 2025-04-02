const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
    {
        text:{type:String, trim:true}, //trim helps to remove whitespace from both ends
        media:{type:String},//stores path to the media file
        mediaType:{type:String, enum:["image", "video", "none"], default:"none"}, //enum is a datatype , here it ensures that mediaType can only be image,video or none nothing else basically its restricted mediaType field
    },
    {timestamps:true}
);
module.exports=mongoose.model("Post", PostSchema);