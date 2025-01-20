// Open Dispute Form Modal
function openDisputeForm(landId) {
    document.getElementById("dispute-modal").style.display = "block";
    document.getElementById("dispute-land-id").value = landId;
  }
  
  // Close Dispute Form Modal
  function closeDisputeForm() {
    document.getElementById("dispute-modal").style.display = "none";
  }
  
  // Handle Dispute Submission
  document.getElementById("dispute-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const landId = document.getElementById("dispute-land-id").value;
    const issueType = document.getElementById("dispute-issue").value;
    const description = document.getElementById("dispute-description").value;
    const documentFile = document.getElementById("dispute-document").files[0];
  
    if (!landId || !issueType || !description) {
      alert("Please fill in all required fields.");
      return;
    }
  
    const disputeData = {
      landId,
      issueType,
      description,
      documentFile: documentFile ? documentFile.name : "No file uploaded",
      status: "Pending"
    };
  
    // Save dispute to localStorage (Mock Backend)
    let disputes = JSON.parse(localStorage.getItem("disputes")) || [];
    disputes.push(disputeData);
    localStorage.setItem("disputes", JSON.stringify(disputes));
  
    alert("Dispute submitted successfully!");
    closeDisputeForm();
  });
  