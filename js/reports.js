if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "login.html";
}

let records = JSON.parse(localStorage.getItem("records")) || [];
let table = document.getElementById("reportTable");
let monthInput = document.getElementById("monthPicker");

let now = new Date();
monthInput.value = now.toISOString().slice(0, 7);

loadTable();

function loadTable() {
    table.innerHTML = "";

    let selectedMonth = monthInput.value;

    let filtered = records.filter(r =>
        r.date && r.date.startsWith(selectedMonth)
    );

    if (filtered.length === 0) {
        table.innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">No records found</td>
        </tr>`;
        return;
    }

    filtered.forEach((r, i) => {
        table.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${r.emp}</td>
            <td>${r.date}</td>
            <td>${r.in}</td>
            <td>${r.out || "-"}</td>
            <td>${r.total || "-"}</td>
        </tr>`;
    });
}

function exportCSV() {
    let selectedMonth = monthInput.value;

    let filtered = records.filter(r =>
        r.date && r.date.startsWith(selectedMonth)
    );

    if (filtered.length === 0) {
        alert("No data to export");
        return;
    }

    let csv = "Employee,Date,Clock In,Clock Out,Total Time\n";

    filtered.forEach(r => {
        csv += `${r.emp},${r.date},${r.in},${r.out || ""},${r.total || ""}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = `employee_report_${selectedMonth}.csv`;
    a.click();

    URL.revokeObjectURL(url);
}

