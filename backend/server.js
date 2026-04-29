require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Atlas connected");
    app.listen(5000, () => {
    console.log(`server running on port 5000`);
    });
})
.catch(err => console.log("DB Error:", err));



