// dashboard.js
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (token) {
    localStorage.setItem("token", token); // Store token in localStorage
    console.log("Token stored:", token);
    // You can also remove the token from the URL to clean it up
    window.history.replaceState({}, document.title, "/dashboard.html");
  } else {
    window.location.href = "/login.html";
  }
};
