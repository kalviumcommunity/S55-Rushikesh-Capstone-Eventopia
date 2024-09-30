const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();
const dataModel = require("./schema.js");

let isConnected = false;

const startDb = async () => {
  try {
    let mongoURI = process.env.URI || "";
    console.log("Mongo URI:", mongoURI);
    if (!mongoURI) {
      throw new Error("URI environment variable is not defined.");
    }

    await mongoose.connect(mongoURI);
    console.log("db connected");
    isConnected = true;

    startCronJobs();

  } catch (err) {
    console.log("connection failed", err);
    isConnected = false;
    throw err;
  }
};

const startCronJobs = () => {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Running a task every minute...');
      
      const data = await dataModel.find(); 
      console.log('Fetched data:', data);

    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });

  console.log('Cron job scheduled to run every minute.');
};

const getConnectionStatus = async () => {
  return isConnected
    ? "Connection established"
    : "Failed to establish connection with db";
};

module.exports = { startDb, getConnectionStatus };
