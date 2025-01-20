document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get the selected role, username, and password
    const role = document.getElementById("role-select").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Validate form input
    if (!role) {
      alert("Please select a role.");
      return;
    }
  
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    // Simulate successful login and redirect to respective dashboards
    alert(`Welcome, ${username}! Redirecting to your ${role.charAt(0).toUpperCase() + role.slice(1)} dashboard...`);
  
    // Redirect to respective dashboard
    switch (role) {
      case "buyer":
        window.location.href = "buyer_dashboard.html";
        break;
      case "seller":
        window.location.href = "seller_dashboard.html";
        break;
      case "inspector":
        window.location.href = "L_inspector.html";
        break;
      case "admin":
        window.location.href = "admin_dashboard.html";
        break;
      default:
        alert("Invalid Role Selected");
    }
  });
  // Redirect to the Sign-Up Page
function redirectToSignup() {
    window.location.href = "signup.html"; // Replace with the actual Sign-Up page URL
  }