const express = require("express");
const router = express.Router();

// Temporary in-memory storage
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
    
            return res.json(bookings);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Server error", error: err.message })
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
           !dText || !time || !dateString || !dayString || 
           !description || !duration || !email || 
           !firstName || !lastName || !number || 
           !referral || !timeRange || !timeString || !req.body.time) {
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
   
       res.status(201).json({
           message: "Booking created",
           booking: newBooking
       });
      } catch (err) {
           console.log(err);
           res.status(500).json({ message: "Server error" });
      }
});

module.exports = router;