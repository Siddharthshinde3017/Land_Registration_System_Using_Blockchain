// Mock Data for Lands
const lands = [
    {
      id: 101,
      image: "https://via.placeholder.com/300x200",
      location: "California, USA",
      size: "1500 sq.ft.",
      owner: "John Doe",
      status: "Available"
    },
    {
      id: 102,
      image: "https://via.placeholder.com/300x200",
      location: "Texas, USA",
      size: "2000 sq.ft.",
      owner: "Jane Smith",
      status: "Sold"
    },
    {
      id: 103,
      image: "https://via.placeholder.com/300x200",
      location: "New York, USA",
      size: "1800 sq.ft.",
      owner: "Alice Brown",
      status: "Available"
    },
    {
      id: 104,
      image: "https://via.placeholder.com/300x200",
      location: "Florida, USA",
      size: "2200 sq.ft.",
      owner: "Chris Evans",
      status: "Available"
    }
  ];
  
  // Populate the Land Gallery
  document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
  
    lands.forEach((land) => {
      const card = document.createElement("div");
      card.className = "land-card";
  
      card.innerHTML = `
        <img src="${land.image}" alt="Land Image">
        <div class="land-card-content">
          <h3>${land.location}</h3>
          <p>Size: ${land.size}</p>
          <p>Owner: ${land.owner}</p>
          <p>Status: ${land.status}</p>
          <button onclick="viewDetails(${land.id})">View Details</button>
        </div>
      `;
  
      gallery.appendChild(card);
    });
  });
  
  // Function to Handle "View Details" Click
  function viewDetails(landId) {
    //alert(`Redirecting to details of land ID: ${landId}`);
   // Redirect to the View Details Page with the land ID in the query string
   //Redirecting to details of land ID: 101
   window.location.href = `View_Details.html?landId=${landId}`;  }
    //window.location.href = 'C:\Users\siddh\OneDrive\Desktop\project1\View_Details.html';}

  