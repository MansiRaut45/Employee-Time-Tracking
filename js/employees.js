let employees = JSON.parse(localStorage.getItem("employees")) || [];
let list = document.getElementById("empList");

display(employees);

/* ADD */
function addEmployee() {
    let name = empName.value.trim();
    if (!name) return alert("Enter name");

    employees.push({
        id: Date.now(),
        name
    });

    empName.value = "";
    save();
}

/* DELETE */
function deleteEmp(id) {
    if (confirm("Delete employee?")) {
        employees = employees.filter(e => e.id !== id);
        save();
    }
}

/* EDIT */
function editEmp(id) {
    let emp = employees.find(e => e.id === id);
    let newName = prompt("Edit Name:", emp.name);

    if (newName) {
        emp.name = newName.trim();
        save();
    }
}

/* SEARCH */
function searchEmployee() {
    let keyword = search.value.toLowerCase();
    let filtered = employees.filter(e =>
        e.name.toLowerCase().includes(keyword)
    );
    display(filtered);
}

/* SAVE */
function save() {
    localStorage.setItem("employees", JSON.stringify(employees));
    display(employees);
}

/* DISPLAY */
function display(data) {
    list.innerHTML = "";
    data.forEach((e, i) => {
        list.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${e.name}</td>
            <td>
                <button onclick="editEmp(${e.id})">✏</button>
                <button onclick="deleteEmp(${e.id})">🗑</button>
            </td>
        </tr>`;
    });
}
