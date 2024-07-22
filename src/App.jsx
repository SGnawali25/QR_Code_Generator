import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";

function App() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [format, setFormat] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const qrRef = useRef();

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUrlSubmit = (event) => {
    event.preventDefault();
    if (!url) {
      return alert("Please Enter a URL!!");
    }

    if (!name) {
      return alert("Please set the name for QR Code!!");
    }

    if (!format) {
      return alert(
        "Please Enter the proper foramt for the image like jpg jpeg or png!!"
      );
    }

    setQrCodeValue(url);
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const qrCanvas = document.createElement("canvas");
    const qrCanvasContext = qrCanvas.getContext("2d");
    const padding = 50;
    const size = canvas.width + padding * 2;

    qrCanvas.width = size;
    qrCanvas.height = size;

    // Fill the background with white
    qrCanvasContext.fillStyle = "#ffffff";
    qrCanvasContext.fillRect(0, 0, size, size);

    // Draw the QR code onto the canvas
    qrCanvasContext.drawImage(canvas, padding, padding);

    // Convert canvas to a PNG URL
    const pngUrl = qrCanvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    // Create a download link
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${name}.${format}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="container">
      <h1>QR Code Generator</h1>
      <form onSubmit={handleUrlSubmit} className="form">
        <label htmlFor="url_field">Enter URL</label>
        <input
          type="text"
          id="url_field"
          placeholder="Enter URL"
          value={url}
          onChange={handleUrlChange}
          className="input"
        />
        <label htmlFor="name_field">Name for QR Code</label>
        <input
          type="text"
          id="name_field"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <label htmlFor="format_field">Format of the QR Code</label>
        <input
          type="text"
          id="format_field"
          placeholder="png jpeg jpg"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="input"
        />
        <button type="submit" className="button">
          Generate QR Code
        </button>
      </form>
      {qrCodeValue && (
        <div className="qr-code">
          <h2>QR Code:</h2>
          <div ref={qrRef}>
            <QRCode value={qrCodeValue} size={256} />
          </div>
          <button onClick={handleDownload} className="button">
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
