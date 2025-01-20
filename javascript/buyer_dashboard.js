// Mock Data for Sellers and Lands
const mockData = {
    sellers: 10,
    lands: [
      { id: 101, owner: "John Don", location: "Nere", size: 1500, status: "Available" },
      { id: 102, owner: "Smith mane", location: "Pur", size: 2000, status: "Sold" },
      { id: 103, owner: "Sam Wilson", location: "Tara", size: 1750, status: "Available" },
      { id: 104, owner: "Chris Gyale", location: "Florida", size: 1200, status: "Available" },
      { id: 105, owner: "Tony Stark", location: "Noida", size: 2500, status: "Sold" }
    ]
  };
  
  // Function to Display Data on Dashboard
  document.addEventListener("DOMContentLoaded", () => {
    // Update Total Sellers
    document.getElementById("total-sellers").innerText = mockData.sellers;
  
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
  });
  