// Load the image
const imagePath = "aurora-bg.jpg";
const img = new Image();
img.src = imagePath;

img.onload = function () {
  const canvas = document.getElementById("background");
  const context = canvas.getContext("2d");

  // Set canvas size to match the viewport
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Scale the image to fit the canvas while maintaining aspect ratio
  const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
  const scaledWidth = img.width * scale;
  const scaledHeight = img.height * scale;
  const offsetX = (canvas.width - scaledWidth) / 2;
  const offsetY = (canvas.height - scaledHeight) / 2;

  context.drawImage(img, offsetX, offsetY, scaledWidth, scaledHeight);

  // Get the original pixel data
  const originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const originalPixels = originalImageData.data;

  // Update the image based on slider values
  function updateImage() {
    // Get slider values
    const redFactor = parseFloat(document.getElementById("redSlider").value);
    const greenFactor = parseFloat(document.getElementById("greenSlider").value);
    const blueFactor = parseFloat(document.getElementById("blueSlider").value);

    // Create a new image data array
    const newImageData = context.createImageData(originalImageData);
    const newPixels = newImageData.data;

    for (let i = 0; i < originalPixels.length; i += 4) {
      newPixels[i] = Math.min(255, originalPixels[i] * redFactor); // Red
      newPixels[i + 1] = Math.min(255, originalPixels[i + 1] * greenFactor); // Green
      newPixels[i + 2] = Math.min(255, originalPixels[i + 2] * blueFactor); // Blue
      newPixels[i + 3] = originalPixels[i + 3]; // Alpha
    }

    // Update the canvas with the new pixel data
    context.putImageData(newImageData, 0, 0);
  }

  // Attach event listeners to sliders
  d3.select("#redSlider").on("input", updateImage);
  d3.select("#greenSlider").on("input", updateImage);
  d3.select("#blueSlider").on("input", updateImage);
};