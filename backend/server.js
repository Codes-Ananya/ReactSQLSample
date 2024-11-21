const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Your MySQL username
    password: "root", // Your MySQL password
    database: "starterdb"
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to MySQL database.");
});

// Routes
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.post("/add-user", (req, res) => {
    const { name } = req.body;
    const sql = "INSERT INTO users (name) VALUES (?)";
    db.query(sql, [name], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            res.status(500).send("Error inserting user");
        } else {
            res.send("User added successfully");
        }
    });
});
