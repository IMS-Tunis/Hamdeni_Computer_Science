function logout() {
  localStorage.removeItem("studentID");
  localStorage.removeItem("platform");
  window.location.href = "../index.html";
}
