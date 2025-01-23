import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import useAuth from "./routes/auth.js";
import session from "express-session";
import passport from "./routes/passportConfig.js";
import cors from "cors";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import dotenv from "dotenv";

const app = express();
const PORT = 3000;

// Middleware for Logging requests
app.use(morgan("dev"));

app.use(cors());

dotenv.config();

// Connect to MongoDB
connectDB();

// Apply rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable legacy `X-RateLimit-*` headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true in production (HTTPS required)
  })
);

// Use passport
app.use(passport.initialize());
app.use(passport.session());

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

// Global Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
