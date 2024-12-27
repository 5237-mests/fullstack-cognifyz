const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static("public"));

// Route for the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to handle form submissions
app.post("/submit", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Server-side validation
  let errors = {};

  if (!name) errors.name = "Name is required.";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!email || !emailPattern.test(email))
    errors.email = "Enter a valid email address.";
  if (password.length < 6)
    errors.password = "Password must be at least 6 characters.";
  if (password !== confirmPassword)
    errors.confirmPassword = "Passwords do not match.";

  if (Object.keys(errors).length > 0) {
    return res.render("error", { errors });
  }

  // If no errors, store data temporarily
  const userData = { name, email, password };

  // Temporarily store data (for demo purposes)
  console.log("User Data:", userData);

  // Send a success message
  res.render("thankyou", { name, email });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
