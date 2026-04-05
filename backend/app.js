require("dotenv").config();

const express = require("express");
const cors = require("cors");
const advisoryRoutes = require("./routes/advisoryRoutes");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.log("DB Error:", err));


const allowedOrigin = [
    "https://jopadconsulting.com",
    "https://www.jopadconsulting.com",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5500",
]

// Middleware
app.use(cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/api/advisory", advisoryRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("API is running...")
});

module.exports = app;