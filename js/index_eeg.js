const eeg = document.getElementById("eeg");
const canvas = document.getElementById("canvas");
const dropContainer = document.getElementById("container");
const warning = document.getElementById("warning");
const fileInput = document.getElementById("fileUploader");

const id2class = {
  1: "Hello",
  2: "Help me",
  3: "Stop",
  4: "Thank you",
  5: "Yes",
};
let model;

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function windowResized() {
  let windowW = window.innerWidth;
  if (windowW < 480 && windowW >= 200) {
    dropContainer.style.display = "block";
  } else if (windowW < 200) {
    dropContainer.style.display = "none";
  } else {
    dropContainer.style.display = "block";
  }
}

["dragenter", "dragover"].forEach((eventName) => {
  dropContainer.addEventListener(
    eventName,
    (e) => dropContainer.classList.add("highlight"),
    false
  );
});

["dragleave", "drop"].forEach((eventName) => {
  dropContainer.addEventListener(
    eventName,
    (e) => dropContainer.classList.remove("highlight"),
    false
  );
});

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropContainer.addEventListener(eventName, preventDefaults, false);
});

dropContainer.addEventListener("drop", gotEEG, false);

function gotEEG(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  if (files.length > 1) {
    console.error("upload only one file");
  }
  const file = files[0];
  const eegType = /eeg.*/;
  if (file.type.match(eegType)) {
    warning.innerHTML = "";
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      eeg.src = reader.result;
      setTimeout(detectEEG, 100);
    };
  } else {
    eeg.src = "eeg/...";
    setTimeout(detectEEG, 100);
    warning.innerHTML = "Please drop an EEG file.";
  }
}

function handleFiles() {
  const curFiles = fileInput.files;
  if (curFiles.length === 0) {
    eeg.src = "eeg/demo.jpg";
    setTimeout(detectEEG, 100);
    warning.innerHTML = "No EEG file selected for upload";
  } else {
    eeg.src = window.URL.createObjectURL(curFiles[0]);
    warning.innerHTML = "";
    setTimeout(detectEEG, 100);
  }
}

function clickUploader() {
  fileInput.click();
}

// detect EEG data
function detectEEG() {
  // implement me!
}

// initialization
async function setup() {
  await loadModel();
  // Make a detection with the default EEG file
  detectEEG();
}

setup();
