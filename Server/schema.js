const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    eventName: String,
    date: String,
    location: String,
    timing: String,
    organizers: String,
    seats: Number,
    free: Boolean,
    image: String
});

const dataModel = mongoose.model("eventopia", eventSchema);

module.exports = { dataModel };
