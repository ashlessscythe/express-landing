import {
  initializeModalControls,
  setupSignaturePad,
  setupHomePageButton,
} from "./helpers.js";

document.addEventListener("DOMContentLoaded", function () {
  initializeModalControls();
  setupSignaturePad();
  setupHomePageButton();
});
