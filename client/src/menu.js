import React, { useState, useEffect } from 'react';
import { getAllFile } from './api';
import { getLLMResponse } from './openaiService';
import axios from 'axios';

function Menu() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [llmResponse, setLLMResponse] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    getAllFile().then(response => {
      if (Array.isArray(response.data)) {
        setFiles(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    }).catch(error => {
      console.error('Error fetching documents:', error);
    });
  }, []);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    const response = await getLLMResponse(`Explain the following text: ${file.extractedText}`);
    setLLMResponse(response);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const fileContent = `
      Document: ${selectedFile.name}
      Extracted Text: ${selectedFile.extractedText}
      LLM Response: ${llmResponse}
    `;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedFile.name}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      return alert('Please select a file to upload');
    }

    const formData = new FormData();
    formData.append('file', uploadFile);

    try {
      const response = await axios.post('https://ocr-project-v2gi.onrender.com/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFiles([...files, response.data]);
      setUploadFile(null);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className="Menu">
      <h1>NotaOne</h1>
      <ul>
        {files.map(file => (
          <li key={file.id} onClick={() => handleFileSelect(file)}>
            {file.name} - {file.description}
          </li>
        ))}
      </ul>
      <div className="AddFile">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
      {selectedFile && (
        <div className="FileDetails">
          <h2>{selectedFile.name}</h2>
          <p>{selectedFile.extractedText}</p>
          <h3>LLM Response:</h3>
          <p>{llmResponse}</p>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
}

export default Menu;