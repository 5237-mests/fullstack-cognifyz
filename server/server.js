import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import useAuth from "./routes/auth.js";

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON data
app.use(express.json());

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

// User routes
app.use("/api/users", userRoutes);

// User login
app.use("/api/auth", useAuth);

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
