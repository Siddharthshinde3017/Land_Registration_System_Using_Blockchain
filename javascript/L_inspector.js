// Mock Data for Buyers, Sellers, Lands, and Pending Requests
const mockData = {
    buyers: 15,
    sellers: 8,
    lands: [
      { id: 301, owner: "John Don", location: "Nagar", size: 2000, status: "Approved" },
      { id: 302, owner: "Sanket Jaggu", location: "Retkavli", size: 2500, status: "Approved" },
      { id: 303, owner: "Raghav Pie", location: "Satara", size: 1800, status: "Pending" }
    ]
  };
  
  // Function to Display Summary Data
  document.addEventListener("DOMContentLoaded", () => {
    // Update Summary Data
    document.getElementById("total-buyers").innerText = mockData.buyers;
    document.getElementById("total-sellers").innerText = mockData.sellers;
    document.getElementById("total-lands").innerText = mockData.lands.length;
  
    // Populate Pending Land Requests
    const pendingLandData = document.getElementById("pending-land-data");
    mockData.lands
      .filter((land) => land.status === "Pending")
      .forEach((land) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${land.id}</td>
          <td>${land.owner}</td>
          <td>${land.location}</td>
          <td>${land.size}</td>
          <td>
            <button class="approve" onclick="approveLand(${land.id})">Approve</button>
            <button class="reject" onclick="rejectLand(${land.id})">Reject</button>
          </td>
        `;
        pendingLandData.appendChild(row);
      });
  
    // Populate Land Information Table
    const landInfoData = document.getElementById("land-info-data");
    mockData.lands.forEach((land) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${land.id}</td>
        <td>${land.owner}</td>
        <td>${land.location}</td>
        <td>${land.size}</td>
        <td>${land.status}</td>
      `;
      landInfoData.appendChild(row);
    });
  });
  
  // Functions to Approve or Reject Land
  function approveLand(landId) {
    const land = mockData.lands.find((l) => l.id === landId);
    if (land) {
      land.status = "Approved";
      alert(`Land ID ${landId} has been Approved`);
      location.reload();
    }
  }
  
  function rejectLand(landId) {
    const land = mockData.lands.find((l) => l.id === landId);
    if (land) {
      land.status = "Rejected";
      alert(`Land ID ${landId} has been Rejected`);
      location.reload();
    }
  }
  