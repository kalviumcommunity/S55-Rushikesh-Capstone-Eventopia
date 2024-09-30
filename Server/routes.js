const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { getDataFromDatabase } = require("./db.js");
const { dataModel } = require("./schema.js");
const { userModel } = require("./userschema.js");
const jwt = require('jsonwebtoken');

router.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many requests from this IP, please try again later.",
});

router.use(limiter);

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
      const response = await userModel.create({ firstName, email, password });
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

    if (user.password !== password) {
      return res.status(401).send("Invalid email or password");
    }

    res.status(200).send(user);
  } catch (err) {
    console.log("Login failed", err);
    res.status(500).send("Login failed");
  }
});
// get req for user data
router.get("/user", async (req, res) => {
  try {
    const users = await userModel.find({});

    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (error) {
    // Handle specific Mongoose errors (e.g., connection errors)
    if (error.name === "MongoNetworkError") {
      console.error("Database connection error:", error);
      return res
        .status(503)
        .json({ error: "Service unavailable, please try again later" });
    }

    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});
// get req for specific user email id
router.get('/user/:email', async (req, res) => {
  try {
    const user = await userModel.find({ email: req.params.email });
    res.json(user);
  } catch (error) {
    console.error("Error retrieving data from the database:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  const user = {
    username: username,
    password: password
  };

  try {
    const ACCESS_TOKEN = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: ACCESS_TOKEN });
  } catch (err) {
    console.log("Error generating access token", err);
    res.status(500).json({ error: "Failed to generate access token" });
  }
});

module.exports = router;
