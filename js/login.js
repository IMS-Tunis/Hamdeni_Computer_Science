const apiUrl = "https://script.google.com/macros/s/AKfycbzCDdfddkcE1WA_e8UT19c7BaStxhcA2POmbIHU4rCkhm9Ehoaosibs6S7ACPI16Z4u/exec";
const urlParams = new URLSearchParams(window.location.search);
const platform = urlParams.get("platform");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch(apiUrl);
  const data = await res.json();
  const user = data.users.find(u => u.username === username && u.password === password && u.platform === platform);

  if (user) {
    localStorage.setItem("studentId", user.id);
    localStorage.setItem("platform", platform);
    window.location.href = `/Hamdeni_Computer_Science/${platform}/dashboard.html`;
  } else {
    alert("Invalid credentials");
  }
});
