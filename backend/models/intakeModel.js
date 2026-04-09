const mongoose = require("mongoose");

const intakeSchema = new mongoose.Schema({
    intakeName: String, 
    intakeEmail: String,
    intakeNumber: String,
    intakeCompany: String,
    intakeSubject: String,
    intakeMessage: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("IntakeBookings", intakeSchema);