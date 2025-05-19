const apiUrl = "https://script.google.com/macros/s/AKfycbzCDdfddkcE1WA_e8UT19c7BaStxhcA2POmbIHU4rCkhm9Ehoaosibs6S7ACPI16Z4u/exec";
const studentId = localStorage.getItem("studentId");
const container = document.getElementById("progressContainer");

if (!studentId) {
  alert("Please log in again.");
  window.location.href = "../login.html";
} else {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const student = data.progress.find(s => s.id === studentId);
      if (!student) return container.innerHTML = "No progress data found.";

      container.innerHTML = "<ul>" + student.points.map(p => 
        `<li>${p.pointName}: ${p.status}</li>`).join("") + "</ul>";
    });
}

function logout() {
  localStorage.clear();
  window.location.href = "../login.html";
}