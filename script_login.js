const apiUrl = "https://script.google.com/macros/s/AKfycbzCDdfddkcE1WA_e8UT19c7BaStxhcA2POmbIHU4rCkhm9Ehoaosibs6S7ACPI16Z4u/exec";
const platform = new URLSearchParams(window.location.search).get("platform");

function login() {
  const u = document.getElementById("username").value.trim().toLowerCase();
  const p = document.getElementById("password").value.trim();

  fetch(apiUrl + "?sheet=Login")
    .then(res => res.json())
    .then(data => {
      const student = data.find(row =>
        String(row["Username"] || "").toLowerCase().trim() === u &&
        String(row["Password"] || "").trim() === p &&
        String(row["Platform"] || "").toLowerCase().trim() === platform
      );

      if (!student) {
        alert("Invalid credentials");
        return;
      }

      localStorage.setItem("studentID", student["ID"]);
      localStorage.setItem("platform", platform);
      window.location.href = platform + "/dashboard.html";
    })
    .catch(error => {
      alert("Unable to load login data. Check your internet or script URL.");
      console.error("Error fetching login data:", error);
    });
}
