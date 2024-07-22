import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [fileDataUrls, setFileDataUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const savedFileDataUrls = sessionStorage.getItem('fileDataUrls');
    if (savedFileDataUrls) {
      setFileDataUrls(JSON.parse(savedFileDataUrls));
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setUploadError(null);

    const newFileDataUrls = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        newFileDataUrls.push(dataUrl);
        if (newFileDataUrls.length === selectedFiles.length) {
          setFileDataUrls((prev) => [...prev, ...newFileDataUrls]);
          sessionStorage.setItem('fileDataUrls', JSON.stringify([...fileDataUrls, ...newFileDataUrls]));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = () => {
    if (files.length === 0) {
      setUploadError("No files selected.");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      alert("Files uploaded successfully!");
    }, 2000);
  };

  const handleDelete = (index) => {
    const updatedFileDataUrls = fileDataUrls.filter((_, i) => i !== index);
    setFileDataUrls(updatedFileDataUrls);
    sessionStorage.setItem('fileDataUrls', JSON.stringify(updatedFileDataUrls));
  };


  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <TextField
        type="file"
        onChange={handleFileChange}
        className="mb-4"
        inputProps={{ accept: 'image/jpeg,application/pdf', multiple: true }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </Button>
      {uploadError && <p className="text-red-500 mt-4">{uploadError}</p>}
      {fileDataUrls.length > 0 && (
        <div className="mt-4">
          <p className="text-green-500">Upload successful!</p>
          <div className="preview-box">
            {fileDataUrls.map((dataUrl, index) => (
              <div key={index} className="preview-item">
                <img src={dataUrl} alt={`Uploaded file preview ${index}`} className="preview-image" />
                <div className="button-group mt-2 ">
                  <a
                    href={dataUrl}
                    download={`file_${index}`}
                   className='me-3'
                    
                  >
                    <Button
                    variant='contained'
                    color='primary'
                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2">
                    Download
                    </Button>
                  </a>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
