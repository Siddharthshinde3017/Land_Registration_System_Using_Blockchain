document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get form values
    const role = document.getElementById("role").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const identity = document.getElementById("identity").files.length;
    const termsChecked = document.getElementById("terms").checked;
  
    // Validation
    if (!role || !username || !email || !password || !phone || identity === 0 || !termsChecked) {
      alert("Please fill in all fields and accept the Terms & Conditions.");
      return;
    }
  
    // Store user info (mock registration for now)
    const user = { role, username, email, phone };
    localStorage.setItem("registeredUser", JSON.stringify(user));
  
    // Redirect to respective dashboard
    alert("Registration Successful! Redirecting to your dashboard...");
    switch (role) {
      case "buyer":
        window.location.href = "buyer_dashboard.html";
        break;
      case "seller":
        window.location.href = "seller_dashboard.html";
        break;
      case "inspector":
        window.location.href = "inspector_dashboard.html";
        break;
      default:
        alert("Invalid role selected.");
    }
  });
  