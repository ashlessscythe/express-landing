import { isConstructorDeclaration } from "typescript";
import { signaturePad } from "signature_pad";

export function initializeModalControls() {
  const modal = document.getElementById("modal");
  const btn = document.getElementById("open-modal");
  const span = document.getElementById("close-modal");

  btn.onclick = function () {
    modal.style.display = "block";
  };

  span.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Sample function to add a new checked-in user to the table
export function addCheckedInUser(userData) {
  // Find the table body where users will be added
  const tableBody = document.getElementById("checked-in-users");

  // Create a new row and cells for the user's name and check-in time
  userData.forEach((user) => {
    const row = tableBody.insertRow(); // Inserts a new row in the table body
    const nameCell = row.insertCell(0); // Inserts a cell for the name
    const timeCell = row.insertCell(1); // Inserts a cell for the checked-in time

    // Fill the cells with data
    nameCell.textContent = user.name;
    timeCell.textContent = user.checkedInAt;
  });
}

// Example usage:
// This could be triggered after fetching data or handling form submission
document.addEventListener("DOMContentLoaded", () => {
  fetch("/signatures")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((users) => {
      addCheckedInUser(users);
    })
    .catch((error) => {
      console.error("Error fetching user signatures:", error);
      alert("Failed to load user signatures.");
    });
});

export function setupSignaturePad() {
  const signaturePad = new signaturePad(
    document.getElementById("signature-pad"),
    {
      backgroundColor: "rgba(255, 255, 255, 0)", // transparent background
      penColor: "rgb(0, 0, 0)", // black pen color
    }
  );

  // Clear button functionality
  document.getElementById("clear-signature").addEventListener("click", () => {
    signaturePad.clear();
  });

  // Save button functionality
  document.getElementById("save-signature").addEventListener("click", () => {
    if (signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
    } else {
      // process sig
      const dataURL = signaturePad.toDataURL("image/png");
      const name = document.getElementById("name").value;
      const data = {
        name: name,
        signature: dataURL,
      };

      // Send the data to the server
      fetch("/save-signature", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      console.log("Signature saved:", dataURL);
      // Clear the signature pad
      signaturePad.clear();
      // Reset any related input fields
      document.getElementById("name").value = "";

      // Close the modal if it's open
      const modal = document.getElementById("modal");
      if (modal.style.display === "block") {
        modal.style.display = "none";
      }

      // Optionally, clear other fields or reset states as needed
      // For example, if there are other form elements related to the signature
      // document.getElementById("other-field-id").value = "";
    }
    // load index.ejs
    window.location.href = "/index";
  });
}

export function setupHomePageButton() {
  const home = document.getElementsByName("btn-home");
  // when any of the buttons are clicked
  home.forEach((button) => {
    button.addEventListener("click", () => {
      // go to the home page
      window.location.href = "/";
    });
  });
}
