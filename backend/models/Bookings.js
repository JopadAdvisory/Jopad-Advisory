const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    dText: String,
    dateString: String,
    dayString: String,
    description: String,
    duration: Number,
    email: String,
    firstName: String,
    lastName: String,
    number: String,
    referral: String,
    referralName: String,
    timeRange: String,
    timeString: String,
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Bookings", bookingSchema);