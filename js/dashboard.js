if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "login.html";
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}

function logout() {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
}



/* ================= HOME DASHBOARD LOGIC ================= */

document.addEventListener("DOMContentLoaded", () => {

    // Only run on home page
    if (!document.getElementById("empCount")) return;

    let employees = JSON.parse(localStorage.getItem("employees")) || [];
    let records = JSON.parse(localStorage.getItem("records")) || [];

    // Total Employees
    document.getElementById("empCount").innerText = employees.length;

    // Checked in today
    let today = new Date().toDateString();
    let todayCount = records.filter(r =>
        new Date(r.inMs).toDateString() === today
    ).length;

    document.getElementById("todayCount").innerText = todayCount;

    // Total hours this month
    let month = new Date().getMonth();
    let year = new Date().getFullYear();

    let totalMinutes = records
        .filter(r => r.total && new Date(r.inMs).getMonth() === month && new Date(r.inMs).getFullYear() === year)
        .reduce((sum, r) => sum + r.total, 0);

    document.getElementById("monthHours").innerText =
        (totalMinutes / 60).toFixed(1);
});

