// Load disputes from localStorage
function loadDisputes() {
    const disputes = JSON.parse(localStorage.getItem("disputes")) || [];
    const table = document.getElementById("dispute-table");
    table.innerHTML = "";
  
    disputes.forEach((dispute, index) => {
      const row = `<tr>
        <td>${dispute.landId}</td>
        <td>${dispute.issueType}</td>
        <td>${dispute.description}</td>
        <td><a href="#">${dispute.documentFile}</a></td>
        <td>${dispute.status}</td>
        <td>
          <button class="approve" onclick="resolveDispute(${index}, 'Approved')">Approve</button>
          <button class="reject" onclick="resolveDispute(${index}, 'Rejected')">Reject</button>
        </td>
      </tr>`;
      table.innerHTML += row;
    });
  }
  
  // Approve or Reject Dispute
  function resolveDispute(index, decision) {
    let disputes = JSON.parse(localStorage.getItem("disputes")) || [];
    disputes[index].status = decision;
    localStorage.setItem("disputes", JSON.stringify(disputes));
    alert(`Dispute marked as ${decision}`);
    loadDisputes();
  }
  
  // Load disputes when page is opened
  document.addEventListener("DOMContentLoaded", loadDisputes);
  