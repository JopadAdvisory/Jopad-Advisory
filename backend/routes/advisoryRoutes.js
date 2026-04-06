const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const Booking = require("../models/Bookings");
// Get booked slots
router.get("/booked", async (req, res) => {
    try {
        const { date } = req.query;
        let bookings;

        if (!date) {
            bookings = await Booking.find();
        } else {
            bookings = await Booking.find({
                startTime: {
                    $gte: new Date(date),
                    $lt: new Date(date + "T23:59:59.999Z")
                }
            });
        }
        res.json(bookings);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Post new bookings
router.post("/book", async (req, res) => {
    try {
        const { 
            time,
            dText,
            dateString,
            dayString,
            duration,
            description,
            email,
            firstName,
            lastName,
            number,
            referral,
            referralName,
            timeRange,
            timeString
        } = req.body;

    
    if (
        !dText || !time || !dateString || !dayString || 
        !description || !duration || !email || 
        !firstName || !lastName || !number || 
        !referral || !timeRange || !timeString) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const startTime = new Date(time);
    const endTime = new Date(startTime);

    endTime.setMinutes(endTime.getMinutes() + Number(duration));

    const existingBookings = await Booking.find();
    const conflict = existingBookings.some(booking => {
        const existingStart = new Date(booking.startTime);
        const existingEnd = new Date(existingStart);

        existingEnd.setMinutes(existingEnd.getMinutes() + Number(booking.duration));

        return startTime < existingEnd && endTime > existingStart;
    });

    if (conflict) {
        return res.status(409).json({
            message: "This time slot has already been booked"
        });
    }

    const newBooking = new Booking({
        startTime,
        dText,
        dateString,
        dayString,
        description,
        duration,
        email,
        firstName,
        lastName,
        number,
        referral,
        referralName,
        timeRange,
        timeString
    });


    await newBooking.save();

    try {
            const airtableRes = await fetch("https://api.airtable.com/v0/appfiyT04pNU9buss/Bookings", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.AIRTABLE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fields: {
                        "Name": `${firstName} ${lastName}`,
                        "Email": email,
                        "WhatsApp Number": number,
                        "Description": description,
                        "How did you hear about us": referral,
                        "Name of referral": referralName,
                        "Duration": timeRange,
                        "Date": `${dayString} ${dateString}`
                    }
                })
            });

            const airtableData = await airtableRes.json();

            console.log("Airtable status:", airtableRes.status);
            console.log("Airtable redponde:", airtableData);
        } catch (err) {
            console.log("Airtable error:", err.message);
        }

    res.status(201).json({
        message: "Booking created",
        booking: newBooking
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error", error: err.message })
    }
});

module.exports = router;