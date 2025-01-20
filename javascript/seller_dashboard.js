// Mock Data for Buyers and Lands
const mockData = {
    buyers: 20,
    lands: [
      { id: 201, owner: "Vaighav", location: "Boston", size: 1200, status: "Available" },
      { id: 202, owner: "Mark Hood", location: "Pune", size: 1500, status: "Sold" },
      { id: 203, owner: "Steve Smith", location: "Pune", size: 1800, status: "Available" },
    ]
  };
  
  // Function to Display Data on Dashboard
  document.addEventListener("DOMContentLoaded", () => {
    // Update Total Buyers
    document.getElementById("total-buyers").innerText = mockData.buyers;
  
    // Update Total Lands
    document.getElementById("total-lands").innerText = mockData.lands.length;
  
    // Populate Land Information Table
    const landDataContainer = document.getElementById("land-data");
    mockData.lands.forEach((land) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${land.id}</td>
        <td>${land.owner}</td>
        <td>${land.location}</td>
        <td>${land.size}</td>
        <td>${land.status}</td>
      `;
      landDataContainer.appendChild(row);
    });
  
    // Handle Land Registration Form Submission
    const form = document.getElementById("register-land-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      // Get Form Data
      const owner = document.getElementById("land-owner").value;
      const location = document.getElementById("land-location").value;
      const size = document.getElementById("land-size").value;
  
      // Add New Land to Mock Data
      const newLand = {
        id: mockData.lands.length + 1 + 200,
        owner,
        location,
        size: parseInt(size),
        status: "Available"
      };
      mockData.lands.push(newLand);
  
      // Update UI
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${newLand.id}</td>
        <td>${newLand.owner}</td>
        <td>${newLand.location}</td>
        <td>${newLand.size}</td>
        <td>${newLand.status}</td>
      `;
      landDataContainer.appendChild(row);
  
      // Update Total Lands
      document.getElementById("total-lands").innerText = mockData.lands.length;
  
      // Reset Form
      form.reset();
      alert("Land Registered Successfully!");
    });
  });
  