// Mock data for statistics
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("total-users").innerText = "50";
    document.getElementById("total-lands").innerText = "120";
    document.getElementById("pending-approvals").innerText = "8";
    document.getElementById("disputes").innerText = "3";
  
    loadUsers();
    loadPendingLands();
    loadTransactions();
  });
  
  // Mock Users Data
  function loadUsers() {
    const users = [
      { username: "john_doe", role: "Buyer", email: "john@example.com" },
      { username: "jane_seller", role: "Seller", email: "jane@example.com" },
      { username: "inspector_x", role: "Inspector", email: "inspector@example.com" }
    ];
  
    const table = document.getElementById("user-table");
    users.forEach(user => {
      const row = `<tr>
        <td>${user.username}</td>
        <td>${user.role}</td>
        <td>${user.email}</td>
        <td><button class="reject">Ban</button></td>
      </tr>`;
      table.innerHTML += row;
    });
  }
  
  // More functions to load pending lands, transactions, disputes...
  // Load Disputes
function loadDisputes() {
  const disputes = JSON.parse(localStorage.getItem("disputes")) || [];
  const table = document.getElementById("dispute-table");
  table.innerHTML = "";

  disputes.forEach((dispute, index) => {
    const row = `<tr>
      <td>${dispute.landId}</td>
      <td>${dispute.issueType}</td>
      <td>${dispute.description}</td>
      <td>${dispute.documentFile}</td>
      <td>${dispute.status}</td>
      <td>
        <button class="approve" onclick="resolveDispute(${index}, 'Approved')">Approve</button>
        <button class="reject" onclick="resolveDispute(${index}, 'Rejected')">Reject</button>
      </td>
    </tr>`;
    table.innerHTML += row;
  });
}

// Resolve Dispute
function resolveDispute(index, decision) {
  let disputes = JSON.parse(localStorage.getItem("disputes")) || [];
  disputes[index].status = decision;
  localStorage.setItem("disputes", JSON.stringify(disputes));
  alert(`Dispute marked as ${decision}`);
  loadDisputes();
}

// Load disputes on page load
document.addEventListener("DOMContentLoaded", loadDisputes);
  