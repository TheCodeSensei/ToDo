const mongoose = require('mongoose')

const schema = new mongoose.Schema(
{
Title: {
type:String,
required:true,
},
Description :{
type : String,
required : false,
default : "",
},
completed:{
type: Boolean,
default:false,
},
})

module.exports= mongoose.model("model", schema);