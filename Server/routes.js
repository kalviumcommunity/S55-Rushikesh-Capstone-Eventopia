const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const router = express.Router();
const { getDataFromDatabase } = require("./db.js");
const { dataModel } = require("./schema.js");
const { userModel } = require("./userschema.js");
router.use(express.json());

router.get("/data", async (req, res) => {
  try {
    const data = await dataModel.find({});
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get('/', (req, res) => {
  res.send('Server Deployed Successfully');
});

router.post(
  '/signup',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10); 
      const response = await userModel.create({ firstName, email, password: hashedPassword }); 
      res.status(200).send(response);
      console.log(response);
    } catch (err) {
      console.log("Error in signing up user", err);
      res.status(500).send("Error in signing up user");
    }
  }
);

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(password, user.password); 
    if (!passwordMatch) {
      return res.status(401).send("Invalid email or password");
    }

    res.status(200).send(user);
  } catch (err) {
    console.log("Login failed", err);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
