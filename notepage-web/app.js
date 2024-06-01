const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
    console.log("connected to database: " + config.database);
});

mongoose.connection.on('error', (err) => {
    console.log("Database error: " + err);
});

const app = express();

const users = require("./routes/users");

const port = process.env.port || 3000;

app.use(cors()); // Cors middleware
app.use(bodyparser.json()); // Bodyparser Middleware

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public'))); // Sets static Folder

app.use("/users", users);

app.get("/", (req, res) => {
    res.send("Not alowed!");
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(port, () => {
    console.log("Server startet on Port: " + port);
});