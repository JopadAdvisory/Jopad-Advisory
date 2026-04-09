const express = require("express");
const router = express.Router();
const axios = require("axios");
const IntakeBooking = require("../models/intakeModel");
const { sendIntakeEmails } = require("../utils/sendEmail");

router.post("/submit", async (req, res) => {
    try {
        const { 
            intakeName,
            intakeEmail,
            intakeNumber,
            intakeCompany,
            intakeSubject,
            intakeMessage,
        } = req.body;

    
        if (!intakeEmail || !intakeNumber || !intakeMessage ) {
            return res.status(400).json({ message: "Missing required fields" });
        }


        const intakeBooking = new IntakeBooking({
            intakeName,
            intakeEmail,
            intakeNumber,
            intakeCompany,
            intakeSubject,
            intakeMessage,
        });


        await intakeBooking.save();
    
    try {
            const airtableRes = await axios.post("https://api.airtable.com/v0/appfiyT04pNU9buss/Intakes", {
                fields: {
                    "Full Name": intakeName,
                    Email: intakeEmail,
                    Company: intakeCompany,
                    Subject: intakeSubject,
                    Description: intakeMessage
                }
             },
             {
                headers: {
                "Authorization": `Bearer ${process.env.AIRTABLE_TOKEN}`,
                "Content-Type": "application/json"
                }
             }

            );
            
            console.log("Airtable intake saved");
        } catch (err) {
            console.log("Airtable error:", err.message);
        }


        sendIntakeEmails({
            intakeName,
            intakeEmail,
            intakeNumber,
            intakeCompany,
            intakeSubject,
            intakeMessage,
        }).catch(err => {
            console.log("Email failed:", err.message);
        });

        res.status(201).json({
            message: "Intake Submitted",
            booking: intakeBooking
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message })
    }
});

module.exports = router;