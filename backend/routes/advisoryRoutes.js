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
    const { startTime, duration } = req.body;

    if (!startTime || !duration) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newBooking = {
        startTime,
        duration
    };

    bookings.push(newBooking);

    res.status(201).json({
        message: "Booking created",
        booking: newBooking
    });
});

module.exports = router;