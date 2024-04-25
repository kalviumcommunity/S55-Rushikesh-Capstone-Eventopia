const express = require("express");
const router = express.Router();
const { getDataFromDatabase } = require("./db.js");
const {dataModel} = require("./schema.js");

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

module.exports = router;
