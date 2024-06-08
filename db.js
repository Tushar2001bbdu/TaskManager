const mongoose=require('mongoose')
const MONGURI="mongodb://localhost:27017/Tushar"
const connectToMongo =()=>{
    mongoose.connect(MONGURI)
}
module.exports=connectToMongo