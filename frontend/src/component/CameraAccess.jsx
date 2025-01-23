import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const CameraAccess = forwardRef((props, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useImperativeHandle(ref, () => ({
    capturePhoto: captureImage
  }));

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    getCameraStream();
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
      stopStream();
    }
  };

  const stopStream = () => {
    if (videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  return (
    <div className="camera-container text-center">
      {capturedImage ? (
        <img
          src={capturedImage}
          alt="Captured"
          className="rounded shadow-lg border border-gray-300 mx-auto"
          style={{ width: "100%", maxWidth: "600px" }}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded shadow-lg border border-gray-300 mx-auto"
          style={{ width: "100%", maxWidth: "600px" }}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
});

export default CameraAccess;
