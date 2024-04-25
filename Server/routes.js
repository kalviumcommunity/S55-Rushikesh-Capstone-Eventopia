const express = require("express");
const router = express.Router();
const { getDataFromDatabase } = require("./db.js");
const {dataModel} = require("./schema.js");
const {userModel} = require("./userschema.js")

router.get("/data", async (req, res) => {
  try {
    const data = await dataModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get('/list', async (req,res) => {
  try{
      const test = await dataModel.find({})
      console.log(test)
      res.send(test)
  }
  catch(err){
      console.log(err)
  }
})

router.get('/', (req, res) => {
  res.send('Server Deployed Successfully');
});

router.post('/signup',async (req,res)=>{
  try{
      const {username,password} = req.body


          const response = await userModel.create(user)
          res.status(200).send(response);
  }
  catch(err){
      console.log("Error in signing up user",err);
  }
})

router.post('/signin',async (req,res)=>{
  try{
          const {username,password} = req.body
          const response = await userModel.findOne({username,password})
          if(!response){
              res.status(500).send("invalid user credentials")
          }
          
          res.status(200).send(response)
  }
  catch(err){
      console.log("Login failed",err);
  }
})



module.exports = router;
