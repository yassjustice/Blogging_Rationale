// import html2canvas from 'html2canvas';


// html2canvas(document.querySelector("#capture")).then(canvas => {
//     document.body.appendChild(canvas)
// });
// html2canvas(document.body).then(function(canvas) {
//     document.body.appendChild(canvas);
// });
document.addEventListener("DOMContentLoaded", function() {
    const captureButton = document.getElementById("capture-button");
    

    
    captureButton.addEventListener("click", function() {
      // Capture the entire document body
      html2canvas(document.body).then(function(canvas) {
        // Convert the canvas to a data URL (PNG format)
        const dataURL = canvas.toDataURL("image/png");
        
        // Create a download link
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "screenshot.png"; // Specify the filename
        link.click();
      });
    });
  });
  