const apiUrl = "https://script.google.com/macros/s/AKfycbzCDdfddkcE1WA_e8UT19c7BaStxhcA2POmbIHU4rCkhm9Ehoaosibs6S7ACPI16Z4u/exec";
const urlParams = new URLSearchParams(window.location.search);
const platform = urlParams.get("platform");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("Attempting login...");
  console.log("Entered username:", username);
  console.log("Entered password:", password);
  console.log("Target platform:", platform);

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("Fetched data:", data);

    const user = data.find(u =>
      u.Username === username &&
      u.Password.toString() === password &&
      u.Platform === platform
    );

    if (user) {
      alert("✅ Login successful!");
      console.log("Matched user:", user);
      localStorage.setItem("studentId", user.ID);
      localStorage.setItem("platform", platform);
      window.location.href = `/Hamdeni_Computer_Science/${platform}/dashboard.html`;
    } else {
      alert("❌ Invalid credentials");
      console.warn("No match found in user list.");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred while logging in.");
  }
});
