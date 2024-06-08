const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type:String,
        required:true
    },password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    Date: {
        type:String,
        default:Date.now
    }

   
  });
  let User=mongoose.model('User',userSchema);
  
  module.exports=User