const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    dText: string,
    dateString: string,
    dayString: string,
    description: string,
    duration: number,
    email: string,
    firstName: string,
    lastName: string,
    number: string,
    referral: string,
    referralName: string,
    timeRange: string,
    timeString: string,
    createdAt: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Bookings", bookingSchema);