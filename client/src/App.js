import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getAllUsers } from './api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './style/App.css';


function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage]  = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const handleCreateUser = async () => {
    try {
      if (!name || !email || !password) {
        return setErrorMessage('Preencha todos os campos');
      }
      if (password.length < 8) {
        return setErrorMessage('Senha deve ter no mínimo 8 caracteres');
      }
      if (email.indexOf('@') === -1) {
        return setErrorMessage('Email inválido');
      }
      setLoading(true)
      const response = await createUser({ name, email, password });

      if (!response.data) {
        return setErrorMessage('Erro ao tentar se cadastrar. Verifique suas credenciais.');
      }
      setUsers(prevUsers => [...prevUsers, response.data]);
      navigate('/login')
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return setErrorMessage('Algo deu errado. Tente novamente.');
      
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className='body'>
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
        <div className="Create">
          <div className="title">
            <h1>NotaOne</h1>   
          </div>
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name} - {user.email}</li>
            ))}
          </ul>
          
          <div className="form-create">
            <div className="title-container">
              <h2 className="title-create">Cadastro</h2>
              <p className="subtitle-create">Olá seja bem-vindo, crie uma conta e comece agora.</p>
            </div>
            <div className="inputs-container">
              <div className="component">
                <input type="text" placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} required/>
                <FontAwesomeIcon className='icone' icon={faUser}/>
              </div>
              <div className="component">
                <input type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <FontAwesomeIcon className='icone2' icon={faEnvelope} />
              </div>
              <div className="component">
                <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <FontAwesomeIcon className='icone3' icon={faLock} />
              </div> 
              <span className='message-error'>{errorMessage}</span>
              <button className='btn-create' onClick={handleCreateUser}>Cadastrar-se</button>
              
            </div>
          </div>
          <span className='container-botton'>Já possui uma conta? <a href="/login">Faça login</a></span>
          
        </div>
    </div>
  );
}


export default App;