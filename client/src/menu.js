import React, { useState, useEffect } from 'react';
import { getAllFile } from './api';
import { getLLMResponse } from './openaiService';

function Menu() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [llmResponse, setLLMResponse] = useState('');

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
        {/* File upload form */}
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