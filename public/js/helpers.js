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

export function setupSignaturePad() {
  const signaturePad = new SignaturePad(
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
      const dataURL = signaturePad.toDataURL();
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
