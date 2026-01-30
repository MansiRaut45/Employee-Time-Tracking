let employees = JSON.parse(localStorage.getItem("employees")) || [];
let records = JSON.parse(localStorage.getItem("records")) || [];

let select = document.getElementById("empSelect");
let table = document.getElementById("recordTable");
let todaySpan = document.getElementById("today");

let today = new Date().toISOString().split("T")[0];
todaySpan.innerText = "Date: " + today;

/* LOAD DROPDOWN */
select.innerHTML = `<option value="">Select Employee</option>`;
employees.forEach(e => {
    select.innerHTML += `<option value="${e.name}">${e.name}</option>`;
});

display();

/* CHECK IN */
function checkIn() {
    let emp = select.value;
    if (!emp) return alert("Select employee");

    let active = records.find(r =>
        r.emp === emp && r.date === today && !r.out
    );
    if (active) return alert(emp + " already checked in today");

    let now = new Date();

    records.push({
        emp,
        date: today,
        in: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        inMs: now.getTime(),
        out: "",
        total: ""
    });

    save();
}

/* CHECK OUT */
function checkOut() {
    let emp = select.value;
    if (!emp) return alert("Select employee");

    let active = records.find(r =>
        r.emp === emp && r.date === today && !r.out
    );
    if (!active) return alert(emp + " not checked in");

    let out = new Date();
    active.out = out.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let diff = out.getTime() - active.inMs;
    let hours = Math.floor(diff / 3600000);
    let minutes = Math.floor((diff % 3600000) / 60000);

    active.total = `${hours}h ${minutes}m`;

    save();
}

/* SAVE */
function save() {
    localStorage.setItem("records", JSON.stringify(records));
    display();
}

/* DISPLAY */
function display() {
    table.innerHTML = "";

    records
        .filter(r => r.date === today)
        .forEach((r, i) => {
            table.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${r.emp}</td>
                <td>${r.in}</td>
                <td>${r.out || "-"}</td>
                <td>${r.total || "-"}</td>
            </tr>`;
        });
}
