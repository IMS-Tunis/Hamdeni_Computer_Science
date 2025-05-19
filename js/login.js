const apiUrl = "https://script.google.com/macros/s/AKfycbxHCC_YD_MjENTUp3qYrUw-HZpODe-jIdgWDgAhaLRrnt11WciTPoUF7nwAlseqIRCB/exec";

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
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred while logging in.");
  }
});
