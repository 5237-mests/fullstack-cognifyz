// document
//   .getElementById("registerForm")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault(); // Prevent form submission refresh

//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }

//       alert("Registration successful! Redirecting to login...");
//       window.location.href = "/login.html";
//     } catch (error) {
//       document.getElementById("errorMessage").textContent = error.message;
//     }
//   });

document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      alert("Registration successful! Redirecting to login...");
      window.location.href = "/login.html";
    } catch (error) {
      document.getElementById("errorMessage").textContent = error.message;
    }
  });
