document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const name = document.getElementById("name");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const feedback = document.getElementById("userFeedback");

  const nameError = document.getElementById("nameError");
  const usernameError = document.getElementById("usernameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    feedback.innerHTML = "";

    let isValid = true;

    // Name validation
    if (name.value.trim().length < 1) {
      nameError.textContent = "Name must be filled.";
      isValid = false;
    }

    // Username validation
    if (username.value.trim().length < 3) {
      usernameError.textContent = "Username must be at least 3 characters.";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email.";
      isValid = false;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.value.trim())) {
      passwordError.textContent =
        "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.";
      isValid = false;
    }

    // Confirm Password validation
    if (password.value.trim() !== confirmPassword.value.trim()) {
      confirmPasswordError.textContent = "Passwords do not match.";
      isValid = false;
    }

    // If valid, show feedback
    if (isValid) {
      feedback.innerHTML = `
          <div class="alert alert-success">
            Form submitted successfully! Welcome, ${username.value.trim()}.
          </div>
        `;
    }
  });
});
