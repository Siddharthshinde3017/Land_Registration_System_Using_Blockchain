// Initialize Google Maps
function initMap() {
    const defaultLocation = { lat: 37.7749, lng: -122.4194 };
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      center: defaultLocation,
    });
  
    const marker = new google.maps.Marker({
      position: defaultLocation,
      map: map,
      draggable: true,
    });
  
    marker.addListener("dragend", function () {
      const position = marker.getPosition();
      document.getElementById("latitude").value = position.lat();
      document.getElementById("longitude").value = position.lng();
    });
  }
  
  // Preview function
  function previewLand() {
    alert("Preview Mode: Check entered details before submission.");
  }
  
  // Submit form
  document.getElementById("add-land-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Land Registered Successfully!");
    this.reset();
  });
  