function togglePassword() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("adminLoggedIn", true);
        window.location.href = "home.html";
    } else {
        alert("Invalid Login");
    }
}
