// ================================
// Import Required Dependencies
// ================================
const express = require("express");
const mysql = require("mysql2");
require("dotenv").config(); // Load environment variables from .env file
const path = require("path"); // Handle file paths
const app = express();

// ================================
// Middleware
// ================================
app.use(express.json()); // Parse JSON requests
app.use(express.static(path.join(__dirname))); // Serve static files (e.g., HTML, CSS, JS)

// ================================
// Database Connection
// ================================
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// ================================
// Routes
// ================================

// Serve the login page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ================================
// Patient Routes
// ================================

// Fetch all patients
app.get("/patients", (req, res) => {
    db.query("SELECT * FROM Patient", (err, results) => {
        if (err) {
            console.error("Error fetching patients:", err);
            return res.status(500).send({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Add a new patient
app.post("/patients", (req, res) => {
    const { patient_fname, patient_lname, patient_dob, patient_gender, patient_phone, patient_address, patient_height } = req.body;

    // Validate required fields
    if (!patient_address || !patient_height) {
        return res.status(400).json({ message: "Address and Height are required fields." });
    }

    const sql = `
        INSERT INTO Patient 
        (patient_fname, patient_lname, patient_dob, patient_gender, patient_phone, patient_address, patient_height) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [patient_fname, patient_lname, patient_dob, patient_gender, patient_phone, patient_address, patient_height], (err, result) => {
        if (err) {
            console.error("Error inserting patient:", err);
            res.status(500).send(err);
        } else {
            res.json({ message: "Patient added successfully!", patientId: result.insertId });
        }
    });
});

// ================================
// Inventory Routes
// ================================

// Fetch all inventory items
app.get("/inventory", (req, res) => {
    const sql = "SELECT * FROM Inventory";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching inventory:", err);
            res.status(500).send({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// ================================
// Medical Records Routes
// ================================

// Fetch all medical records
app.get("/medical-records", (req, res) => {
    const sql = "SELECT * FROM Medical_Records";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching medical records:", err);
            res.status(500).send({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// ================================
// Appointments Routes
// ================================

// Fetch all appointments
app.get("/appointments", (req, res) => {
    db.query("SELECT * FROM Appointments", (err, results) => {
        if (err) {
            console.error("Error fetching appointments:", err);
            return res.status(500).send({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Add a new appointment
app.post("/appointments", (req, res) => {
    const { patient_id, appointment_date, appt_time, appointment_purpose, appt_status, appt_cost, doctor_id, room_id } = req.body;

    // Validate required fields
    if (!patient_id || !appointment_date || !appt_time || !appointment_purpose || !appt_status || !appt_cost || !doctor_id || !room_id) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const sql = `
        INSERT INTO Appointments 
        (appointment_date, appointment_purpose, appt_time, appt_status, appt_cost, patient_id, doctor_id, room_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [appointment_date, appointment_purpose, appt_time, appt_status, appt_cost, patient_id, doctor_id, room_id], (err, result) => {
        if (err) {
            console.error("Error inserting appointment:", err);
            res.status(500).send(err);
        } else {
            res.json({ message: "Appointment added successfully!", appointmentId: result.insertId });
        }
    });
});

// ================================
// Billing Routes
// ================================

// Fetch all billing records
app.get("/billing", (req, res) => {
    db.query("SELECT * FROM Billing", (err, results) => {
        if (err) {
            console.error("Error fetching billing records:", err);
            res.status(500).send({ error: "Database query failed" });
        } else {
            res.json(results);
        }
    });
});

// Update billing status
app.patch("/billing/:bill_id", (req, res) => {
    const { bill_id } = req.params;
    const { bill_status } = req.body;

    const sql = "UPDATE Billing SET bill_status = ? WHERE bill_id = ?";
    db.query(sql, [bill_status, bill_id], (err, result) => {
        if (err) {
            console.error("Error updating billing status:", err);
            res.status(500).json({ error: "Failed to update billing status" });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "Billing record not found" });
        } else {
            res.json({ message: "Billing status updated successfully!" });
        }
    });
});

// ================================
// Start Server
// ================================
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
