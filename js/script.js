document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // LOGIN FUNCTIONALITY
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            console.log("Entered Username:", username); // Debugging
            console.log("Entered Password:", password); // Debugging

            if (username === "admin" && password === "password") {
                alert("Login successful! Redirecting to dashboard...");
                window.location.href = "dashboard.html"; // Redirect to the dashboard
            } else {
                alert("Invalid credentials. Please try again.");
                console.log("Login failed: Invalid credentials");
            }
        });
    }

    // NAVIGATION
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

    // PATIENT MANAGEMENT
    const patientForm = document.getElementById("patientForm");
    const patientTable = document.getElementById("patientTable")?.querySelector("tbody");
    let patientId = 1; // Counter for patient IDs

    if (patientForm) {
        patientForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const fname = document.getElementById("fname").value;
            const lname = document.getElementById("lname").value;
            const dob = document.getElementById("dob").value;
            const gender = document.getElementById("gender").value;
            const phone = document.getElementById("phone").value;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${patientId++}</td>
                <td>${fname} ${lname}</td>
                <td>${dob}</td>
                <td>${gender}</td>
                <td>${phone}</td>
            `;
            patientTable.appendChild(row);
            patientForm.reset();
        });
    }

    // APPOINTMENT MANAGEMENT
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentTable = document.getElementById("appointmentTable")?.querySelector("tbody");
    let appointmentId = 1;

    if (appointmentForm) {
        appointmentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const patientId = document.getElementById("patientId").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const purpose = document.getElementById("purpose").value;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${appointmentId++}</td>
                <td>${patientId}</td>
                <td>${date}</td>
                <td>${time}</td>
                <td>${purpose}</td>
            `;
            appointmentTable.appendChild(row);
            appointmentForm.reset();
        });
    }

    // BILLING MANAGEMENT
    const billingForm = document.getElementById("billingForm");
    const billingTable = document.getElementById("billingTable")?.querySelector("tbody");

    if (billingForm) {
        billingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const billId = document.getElementById("billId").value;
            const status = document.getElementById("status").value;

            alert(`Billing status for Bill ID ${billId} updated to ${status}`);
        });
    }

    // INVENTORY MANAGEMENT
    const inventoryTable = document.getElementById("inventoryTable")?.querySelector("tbody");

    if (inventoryTable) {
        const inventoryItems = [
            { id: 1, name: "Syringes", count: 100, stockDate: "2024-12-01", location: "Storage A" },
            { id: 2, name: "Bandages", count: 50, stockDate: "2024-12-01", location: "Storage B" }
        ];
        inventoryItems.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>${item.stockDate}</td>
                <td>${item.location}</td>
            `;
            inventoryTable.appendChild(row);
        });
    }

    // MEDICAL RECORDS MANAGEMENT
    const recordsTable = document.getElementById("recordsTable")?.querySelector("tbody");

    if (recordsTable) {
        const records = [
            { id: 1, patientId: 1, doctorId: 2, details: "Routine check-up", date: "2024-12-01" },
            { id: 2, patientId: 2, doctorId: 3, details: "Surgery follow-up", date: "2024-12-01" }
        ];
        records.forEach((record) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${record.id}</td>
                <td>${record.patientId}</td>
                <td>${record.doctorId}</td>
                <td>${record.details}</td>
                <td>${record.date}</td>
            `;
            recordsTable.appendChild(row);
        });
    }
});
