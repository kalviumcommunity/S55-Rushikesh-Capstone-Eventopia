const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();
const dataModel = require("./schema.js");

let isConnected = false;

const startDb = async () => {
  try {
    const mongoURI = process.env.URI || "";
    console.log("Mongo URI:", mongoURI);

    if (!mongoURI) {
      throw new Error("URI environment variable is not defined.");
    }

    await mongoose.connect(mongoURI);
    console.log("Database connected");
    isConnected = true;

    startCronJobs();
  } catch (err) {
    console.error("Connection failed:", err.message);
    isConnected = false;
    process.exit(1); 
  }
};

const startCronJobs = () => {
  cron.schedule('* * * * *', async () => {
    try {
      console.log('Running a task every minute...');

      if (!isConnected) {
        console.warn("Cannot run cron job; database is not connected.");
        return; 
      }

      const data = await dataModel.find();
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error executing cron job:', error.message);
    }
  });

  console.log('Cron job scheduled to run every minute.');
};

const getConnectionStatus = async () => {
  return isConnected
    ? "Connection established"
    : "Failed to establish connection with the database";
};

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = { startDb, getConnectionStatus };
