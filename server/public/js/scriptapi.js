document.addEventListener("DOMContentLoaded", () => {
  const loadUsersButton = document.getElementById("load-users");
  const userList = document.getElementById("user-list");
  const createUserForm = document.getElementById("create-user-form");
  const updateUserForm = document.getElementById("update-user-form");
  const deleteUserForm = document.getElementById("delete-user-form");

  // Function to display an error message
  const showError = (form, message) => {
    const errorDiv = form.querySelector(".form-error");
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    } else {
      const newErrorDiv = document.createElement("div");
      newErrorDiv.className = "form-error text-danger mt-2";
      newErrorDiv.textContent = message;
      form.appendChild(newErrorDiv);
    }
  };

  // Function to clear error messages
  const clearError = (form) => {
    const errorDiv = form.querySelector(".form-error");
    if (errorDiv) errorDiv.style.display = "none";
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to fetch and display users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      userList.innerHTML = ""; // Clear previous content
      users.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "card mb-3 p-3";
        userDiv.innerHTML = `<h5>${user.name}</h5><p>${user.email}</p><p>ID: ${user.id}</p>`;
        userList.appendChild(userDiv);
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to create a new user
  createUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("create-name").value.trim();
    const email = document.getElementById("create-email").value.trim();

    clearError(createUserForm);

    if (!name) {
      showError(createUserForm, "Name is required.");
      return;
    }

    if (!isValidEmail(email)) {
      showError(createUserForm, "Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        alert("User created successfully!");
        createUserForm.reset();
        fetchUsers();
      } else {
        alert("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  // Function to update an existing user
  updateUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("update-id").value.trim();
    const name = document.getElementById("update-name").value.trim();
    const email = document.getElementById("update-email").value.trim();

    clearError(updateUserForm);

    if (!id || isNaN(id)) {
      showError(updateUserForm, "Valid User ID is required.");
      return;
    }

    if (!name) {
      showError(updateUserForm, "Name is required.");
      return;
    }

    if (!isValidEmail(email)) {
      showError(updateUserForm, "Enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        alert("User updated successfully!");
        updateUserForm.reset();
        fetchUsers();
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  });

  // Function to delete a user
  deleteUserForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("delete-id").value.trim();

    clearError(deleteUserForm);

    if (!id || isNaN(id)) {
      showError(deleteUserForm, "Valid User ID is required.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("User deleted successfully!");
        deleteUserForm.reset();
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  });

  // Attach event listener to button
  loadUsersButton.addEventListener("click", fetchUsers);
});
