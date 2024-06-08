const express = require("express");

const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
var fetchuser = require("../middleware/fetchUser");
 //fetch all notes(or tasks ) for a user
router.get("/fetchallnotes", fetchuser, async (req, res) => {

  const notes = await Notes.find({ user: req.user._id});
  res.send(notes);
});
// add a new note (or task) using post
router.post(
  "/addnewnote",
  fetchuser,
  [
    body("title", "Enter a valid email").isLength({ min: 3 }),
    body("description", "Enter a valid email").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag,completed} = req.body;
      const errors = validationResult(req);
      if (errors.isEmpty() == false) {
        res.status(500).send("there are some errors");
      }
      else{
      const Note = new Notes({
        title: title,
        description: description,
        tag: tag,
        task:completed,
        user: req.user
      });
      const savednote = await Note.save();
      res.json(savednote);}
    } catch (error) {
      console.log(error);
    }
  }
);
//delete an existing note(or task)

router.delete("/deletenote", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.body.id);
    if (!note) {
      return res.status(404).send("Your Task(Note) has already been deleted");
    }
    console.log("Values"+note.user+"-"+req.user+"---"+req.user._id)
    if (note.user == req.user._id) {
      
      await Notes.findByIdAndDelete(req.body.id);
      res.json({ "success": "Your note has been deleted" });
      
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }})
//update an existing note(or task)
router.put("/updatenote", fetchuser, async (req, res) => {
  try{
      let note = await Notes.findById(req.body.id);
       if (!note) {
         return res.status(500).send("Not Found");
       }
     
       if(note.user == req.user._id) {
        let NOTE = await Notes.findByIdAndUpdate(note._id,{title:req.body.title,description:req.body.description,tag:req.body.tag,completed:req.body.completed})
  res.send("Your notes has been updated")
        
       }
       else{
        return res.status(401).send("Not allowed");
       }
      
  }
  catch(error){
    console.log(error)
  }
});
// mark an existing note(or task as completed)
router.put("/markcomplete", fetchuser, async (req, res) => {
  try{
      let note = await Notes.findById(req.body.id);
       if (!note) {
         return res.status(500).send("Not Found");
       }
      
       if(note.user == req.user._id) {
        let NOTE = await Notes.findById(note._id)
        if( NOTE.Completed=="completed"){
         res.send("Your Task has already been marked as Completed") 
        }
        else{
          let NOTE = await Notes.findByIdAndUpdate(note._id,{Completed:"completed"})
          res.json(NOTE);
        }
        
        
       }
       else{
        return res.status(401).send("Not allowed");
       }
      
  }
  catch(error){
    console.log(error)
  }
});
module.exports = router;
