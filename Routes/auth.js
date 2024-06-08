const express = require("express");
const User = require("../models/User");
const Router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const e = require("express");
var fetchuser=require('../middleware/fetchUser');

const JWT_SECRET = "xxxbhhhh";

// Create a user using using POST

Router.post(
  "/createuser",
  [
    body("name", "Enter a valid email").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password at least 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success=true
  
    const errors = validationResult(req);

   
    if (!errors.isEmpty()) {
      res.send({success:"You have entered inavlid credentials"});
    }
    else{

    
    try {
      let user = User.findOne({ email: req.body.email });
    
      if (user == true) {
        res.send({success:"false"});
      }
      else{
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const JWT_SECRET = "xxxbhhhh";
      //to create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = JWT.sign(data, JWT_SECRET);
      res.json({
        authToken: authToken,
        success:"You have successfully created an account"
      });}
      
    } catch (error) {
      console.log(error)
    }}
  } 
);
// to login or auhtenticate a user
Router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "cannot be blank").exists(),
  ],
  async (req, res) => {
    
    try{
    const result=validationResult(req)
    if(!result){
    
    res.json({"success":"false"})
    }
    const {email,password }=req.body
    
     let user=await User.findOne({email})
     if(!user){
    
      res.json({"success":"false"})
     }
     else{
     const PassCompare= await bcrypt.compare(req.body.password,user.password)
     if(!PassCompare){
      
      res.json({"success":"false"})
     }
     else{
     const data={
      user:{
        _id:user._id
      }
      
     }
     
     const authtoken =JWT.sign(data,JWT_SECRET)
    var JSON= {success:"true",authtoken:authtoken}
    res.json(JSON)}
    
    }}
    catch(error){
    res.send(error)
    }

   
   
  }

);
// endpoint to see details of a user
Router.post("/seeDetails", fetchuser, async function(req, res){
  try {
   let UserId = req.user._id
    const user = await User.findById(UserId);
    
    res.send(user)
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
