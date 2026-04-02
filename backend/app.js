const express = require("express");
const cors = require("cors");
const advisoryRoutes = require("./routes/advisoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/advisory", advisoryRoutes);

// Routes
app.get("/", (req, res) => {
    res.send("API is running...")
});

module.exports = app;