document.addEventListener("DOMContentLoaded", () => {
    // =====================
    // LOGIN FUNCTIONALITY
    // =====================
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            console.log("Entered Username:", username);
            console.log("Entered Password:", password);

            if (username === "admin" && password === "password") {
                alert("Login successful! Redirecting to dashboard...");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials. Please try again.");
                console.log("Login failed: Invalid credentials");
            }
        });
    }

    // ========================
    // NAVIGATION FUNCTIONALITY
    // ========================
    const dashboardLinks = document.querySelectorAll("nav a");
    if (dashboardLinks) {
        dashboardLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetPage = e.target.getAttribute("href");
                window.location.href = targetPage;
            });
        });
    }

    // =====================
    // PATIENT MANAGEMENT
    // =====================
    const patientTable = document.getElementById("patientTable")?.querySelector("tbody");
    const patientForm = document.getElementById("patientForm");

    if (patientTable) {
        // Fetch and display patient records
        fetch("http://localhost:3000/patients")
            .then((response) => response.json())
            .then((patients) => {
                patients.forEach((patient) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${patient.patient_id}</td>
                        <td>${patient.patient_fname} ${patient.patient_lname}</td>
                        <td>${patient.patient_dob}</td>
                        <td>${patient.patient_gender}</td>
                        <td>${patient.patient_phone}</td>
                        <td>${patient.patient_address}</td>
                        <td>${patient.patient_height}</td>
                    `;
                    patientTable.appendChild(row);
                });
            })
            .catch((error) => console.error("Error fetching patients:", error));
    }

    if (patientForm) {
        patientForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const patientData = {
                patient_fname: document.getElementById("patient_fname").value,
                patient_lname: document.getElementById("patient_lname").value,
                patient_dob: document.getElementById("patient_dob").value,
                patient_gender: document.getElementById("patient_gender").value,
                patient_phone: document.getElementById("patient_phone").value,
                patient_address: document.getElementById("patient_address").value,
                patient_height: document.getElementById("patient_height").value
            };

            fetch("http://localhost:3000/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientData)
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    location.reload();
                })
                .catch((error) => {
                    console.error("Error adding patient:", error);
                });
        });
    }

    // ========================
    // APPOINTMENT MANAGEMENT
    // ========================
    const appointmentTable = document.getElementById("appointmentTable")?.querySelector("tbody");
    const appointmentForm = document.getElementById("appointmentForm");

    if (appointmentTable) {
        // Fetch and display appointments
        fetch("http://localhost:3000/appointments")
            .then((response) => response.json())
            .then((appointments) => {
                appointments.forEach((appointment) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${appointment.appointment_number}</td>
                        <td>${appointment.patient_id}</td>
                        <td>${appointment.appointment_date}</td>
                        <td>${appointment.appt_time}</td>
                        <td>${appointment.appointment_purpose}</td>
                    `;
                    appointmentTable.appendChild(row);
                });
            })
            .catch((error) => console.error("Error fetching appointments:", error));
    }

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const appointmentData = {
                patient_id: document.getElementById("patient_id").value,
                appointment_date: document.getElementById("appointment_date").value,
                appt_time: document.getElementById("appt_time").value,
                appointment_purpose: document.getElementById("appointment_purpose").value,
                appt_status: "Scheduled", // Default value
                appt_cost: 50, // Example cost
                doctor_id: 1, // Example doctor ID
                room_id: 101 // Example room ID
            };

            fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(appointmentData),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    location.reload();
                })
                .catch((error) => console.error("Error scheduling appointment:", error));
        });
    }

    // ====================
    // BILLING MANAGEMENT
    // ====================
    const billingTable = document.getElementById("billingTable")?.querySelector("tbody");
    const billingForm = document.getElementById("billingForm");

    if (billingTable) {
        fetch("http://localhost:3000/billing")
            .then((response) => response.json())
            .then((billingRecords) => {
                billingRecords.forEach((record) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${record.bill_id}</td>
                        <td>${record.patient_id}</td>
                        <td>${record.bill_cost}</td>
                        <td>${record.bill_date}</td>
                        <td>${record.bill_status}</td>
                    `;
                    billingTable.appendChild(row);
                });
            })
            .catch((error) => console.error("Error fetching billing records:", error));
    }

    if (billingForm) {
        billingForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const bill_id = document.getElementById("bill_id").value;
            const bill_status = document.getElementById("bill_status").value;

            fetch(`http://localhost:3000/billing/${bill_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bill_status }),
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);
                    location.reload();
                })
                .catch((error) => console.error("Error updating billing status:", error));
        });
    }

    // =====================
    // INVENTORY MANAGEMENT
    // =====================
    const inventoryTable = document.getElementById("inventoryTable")?.querySelector("tbody");

    if (inventoryTable) {
        fetch("http://localhost:3000/inventory")
            .then((response) => response.json())
            .then((inventoryItems) => {
                inventoryItems.forEach((item) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.inventory_id}</td>
                        <td>${item.inventory_item_name}</td>
                        <td>${item.inventory_count}</td>
                        <td>${item.inventory_stock_date}</td>
                        <td>${item.inventory_location}</td>
                    `;
                    inventoryTable.appendChild(row);
                });
            })
            .catch((error) => console.error("Error fetching inventory:", error));
    }

    // ========================
    // MEDICAL RECORDS MANAGEMENT
    // ========================
    const recordsTable = document.getElementById("recordsTable")?.querySelector("tbody");

    if (recordsTable) {
        fetch("http://localhost:3000/medical-records")
            .then((response) => response.json())
            .then((records) => {
                records.forEach((record) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${record.record_id}</td>
                        <td>${record.patient_id}</td>
                        <td>${record.doctor_id}</td>
                        <td>${record.treatment_details}</td>
                        <td>${record.appt_date}</td>
                    `;
                    recordsTable.appendChild(row);
                });
            })
            .catch((error) => console.error("Error fetching medical records:", error));
    }
});
