const express = require("express");
const router = express.Router();

// Temporary in-memory storage
let bookings = [];

// Get booked slots
router.get("/booked", (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.json(bookings);
    }

    const filteredBookings = bookings.filter(booking => {
        const bookingDate = new Date(booking.startTime).toISOString().split("T")[0];
        return bookingDate === date;
    });

    res.json(filteredBookings);
});

// Post new bookings
router.post("/book", (req, res) => {
    const { 
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
    } = req.body;

    if (
        !dText || !dateString || !dayString || 
        !description || !duration || !email || 
        !firstName || !lastName || !number || 
        !referral || !timeRange || !timeString) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const isoDate = new Date(`${dateString} ${timeString}`).toISOString();
    const newBooking = {
        startTime: isoDate,
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
    };

    bookings.push(newBooking);

    res.status(201).json({
        message: "Booking created",
        booking: newBooking
    });
});

module.exports = router;