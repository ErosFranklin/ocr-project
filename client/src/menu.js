import React, { useState, useEffect } from 'react';
import { getAllFile } from './api'; // Certifique-se de que esse arquivo existe e contém a função getAllFile
import axios from 'axios';
import './style/menu.css';

function Menu() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [llmResponse, setLLMResponse] = useState('');
  const [uploadFile, setUploadFile] = useState(null);

  // Carregar arquivos ao inicializar
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

  // Seleção do arquivo e chamada para obter resposta do LLM
  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    try {
      const response = await axios.post('/api/files/extract-llm-response', { 
        extractedText: file.extractedText 
      });
      setLLMResponse(response.data.llmResponse);
    } catch (error) {
      console.error('Error getting LLM response:', error);
    }
  };

  // Função de download do arquivo
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

  // Seleção de arquivo para upload
  const handleFileChange = (event) => {
    setUploadFile(event.target.files[0]);
  };

  // Envio de arquivo para o backend
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
    <div className='body'>
      <div className="Menu">
      <div className="title">
        <h1>NotaOne</h1>   
      </div>

      <div className="AddFile">
        <input className='btn-change' type="file" onChange={handleFileChange} />
        <button className='btn-upload' onClick={handleFileUpload}>Upload do Arquivo</button>
        
      <div className="Files">

      {selectedFile && (
        <div className="FileDetails">
          <h2>{selectedFile.name}</h2>
          <p>{selectedFile.extractedText}</p>
          <h3>LLM Resposta:</h3>
          <p>{llmResponse}</p>
          <button onClick={handleDownload}>Download do Arquivo</button>
        </div>
      )}
        </div>
        <div className='allFile'>
            <ul>
        {files.map(file => (
          <li key={file.id} onClick={() => handleFileSelect(file)}>
            {file.name} - {file.description}
          </li>
        ))}
      </ul>
        </div>
       </div>
      </div>
    </div>
   
  );
}

export default Menu;
