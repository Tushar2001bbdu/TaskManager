const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:'user'
    },
        title: {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"general"
    },
    Date: {
        type:String,
        default:Date.now
    },
    Completed:{
        type:String,
        default:"Uncomplete"
    }

   
  });
  let notes=mongoose.model('Notes',NotesSchema);
  module.exports=notes