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
  console.log("api");

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
    console.log("Validation Errors:", errors);
    const errorsArray = Object.values(errors);
    return res.render("error", { errors: errorsArray });
    // return res.render("error", { errors });
  }

  // If no errors, store data temporarily
  const userData = { name, email, password };

  // Temporarily store data (for demo purposes)
  console.log("User Data:", userData);

  // Send a success message
  res.render("thankyou", { name, email });
});

// Mock data storage
let users = [
  { id: 1, name: "John Doe", email: "msf@gm.com" },
  { id: 2, name: "Jo De", email: "mvcvsf@gm.com" },
];

// Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// Get a single user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

// Create a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update an existing user
app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    user.name = name;
    user.email = email;
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
