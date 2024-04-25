const mongoose = require("mongoose");
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
  } catch (err) {
    console.log("connection failed", err);
    isConnected = false;
    throw err;
  }
};



const getConnectionStatus = async () => {
  return isConnected
    ? "Connection established"
    : "Failed to establish connection with db";
};

module.exports = { startDb, getConnectionStatus };
