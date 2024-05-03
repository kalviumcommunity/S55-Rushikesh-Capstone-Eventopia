const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
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

router.get('/list', async (req, res) => {
  try {
    const test = await dataModel.find({});
    console.log(test);
    res.send(test);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

router.get('/', (req, res) => {
  res.send('Server Deployed Successfully');
});

router.post(
  '/signup',
  [
    body('firstName').trim().isLength({ min: 1 }).withMessage('Username is required'),
    body('email').trim().isLength({ min: 1 }).withMessage('Username is required'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')

  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { firstName,email, password } = req.body;
      const response = await userModel.create({ firstName,email,password });
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
    const { firstName, email, password } = req.body;
    const response = await userModel.findOne({ firstName,email, password });

    if (!response) {
      res.status(401).send("Invalid user credentials");
      return;
    }

    res.status(200).send(response);
  } catch (err) {
    console.log("Login failed", err);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
