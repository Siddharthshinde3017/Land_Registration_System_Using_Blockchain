// Simulated User Data (Fetch from Backend in Production)
const userProfile = {
    username: "john_doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    joinedDate: "2023-01-15",
  };
  
  // Purchased Lands (Fetch from Backend)
  const purchasedLands = [
    { landId: 101, location: "California, USA", size: "1500 sq.ft.", status: "Approved" },
    { landId: 102, location: "New York, USA", size: "2000 sq.ft.", status: "Pending" },
  ];
  
  // Load Profile Data
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("username").innerText = userProfile.username;
    document.getElementById("email").innerText = userProfile.email;
    document.getElementById("phone").innerText = userProfile.phone;
    document.getElementById("joined-date").innerText = userProfile.joinedDate;
  
    const landTable = document.getElementById("land-data");
    purchasedLands.forEach((land) => {
      const row = `<tr>
        <td>${land.landId}</td>
        <td>${land.location}</td>
        <td>${land.size}</td>
        <td>${land.status}</td>
      </tr>`;
      landTable.innerHTML += row;
    });
  });
  
  // Update Profile Function (Future Backend Integration)
  function updateProfile() {
    alert("Update Profile feature coming soon...");
  }
  
  // Change Password Function (Future Backend Integration)
  function changePassword() {
    alert("Change Password feature coming soon...");
  }
  
  // Delete Account Function (Future Backend Integration)
  function deleteAccount() {
    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      alert("Account deleted successfully!");
    }
  }

  //authentication after connecting database 
 /* // Load Buyer Profile from Backend
async function loadProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Not authenticated!");
        window.location.href = "index.html";
        return;
    }

    const response = await fetch("http://127.0.0.1:5000/buyer/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    if (response.status === 200) {
        document.getElementById("username").innerText = data.username;
        document.getElementById("email").innerText = data.email;
        document.getElementById("phone").innerText = data.phone;
        document.getElementById("joined-date").innerText = data.joined_date;
    } else {
        alert("Failed to load profile");
    }
}

// Update Buyer Profile
async function updateProfile() {
    const email = prompt("Enter new email:");
    const phone = prompt("Enter new phone number:");

    const response = await fetch("http://127.0.0.1:5000/buyer/update", {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone })
    });

    const data = await response.json();
    alert(data.message);
    loadProfile();  // Refresh profile
}

// Change Password
async function changePassword() {
    const oldPassword = prompt("Enter old password:");
    const newPassword = prompt("Enter new password:");

    const response = await fetch("http://127.0.0.1:5000/buyer/change-password", {
        method: "POST",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json" },
        body: JSON.stringify({ old_password: oldPassword, new_password: newPassword })
    });

    const data = await response.json();
    alert(data.message);
}

// Delete Account
async function deleteAccount() {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone!")) return;

    const response = await fetch("http://127.0.0.1:5000/buyer/delete-account", {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });

    const data = await response.json();
    alert(data.message);
    localStorage.removeItem("token");  // Logout user
    window.location.href = "index.html";  // Redirect to home
}

document.addEventListener("DOMContentLoaded", loadProfile);*/
