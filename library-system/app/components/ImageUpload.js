"use client";
import { useState, useRef } from "react";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import config from "../../lib/config";

const authenticator = async () => {
  const response = await fetch("/api/imagekit-auth");
  const data = await response.json();
  return data;
};

export default function ImageUpload({ onUploadSuccess, filename }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ikUploadRef = useRef(null);

  const handleSuccess = (response) => {
    setUploading(false);
    // extract filename for auto-conpleted filename
    const fileName = response.name.split("_")[0];
    onUploadSuccess(fileName);
  };

  const handleError = (error) => {
    setUploading(false);
    console.error("Upload failed:", error);
  };

  const validateFile = (file) => {
    if (file.size > 20 * 1024 * 1024) {
      alert("File size must be less than 20MB");
      return false;
    }
    return true;
  };

  return (
    <div className="form-tabs">
      <ImageKitProvider
        publicKey={config.env.imagekit.publicKey}
        urlEndpoint={config.env.imagekit.urlEndpoint}
        authenticator={authenticator}
      >
        <IKUpload
          ref={ikUploadRef}
          fileName={filename}
          onSuccess={handleSuccess}
          onError={handleError}
          onChange={() => setUploading(true)}
          validateFile={validateFile}
          onUploadProgress={({ loaded, total }) => {
            const percent = Math.round((loaded / total) * 100);
            setProgress(percent);
          }}
          useUniqueFileName={false}
        />
      </ImageKitProvider>
      {uploading && <p>Uploading... {progress}%</p>}
    </div>
  );
}
