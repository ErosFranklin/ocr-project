import React, { useState, useEffect } from 'react';
import { createUser, getAllUsers } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getAllUsers().then(response => {
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        console.error('API response is not an array:', response.data);
      }
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }, []);

  const handleCreateUser = async () => {
    try {
      if (!name || !email || !password) {
        return alert('Preencha todos os campos');
      }
      if (password.length < 8) {
        return alert('Senha deve ter no mínimo 8 caracteres');
      }
      if (email.indexOf('@') === -1) {
        return alert('Email inválido');
      }

      const response = await createUser({ name, email, password });

      if (!response.data) {
        return alert('Erro ao criar usuário');
      }
      setUsers(prevUsers => [...prevUsers, response.data]);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  return (
    <div className="Create">
      <h1>NotaOne</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <div>
        <h2 className="title-create">Cadastro</h2>
        <input type="text" placeholder="Nome Completo" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <button onClick={handleCreateUser}>Cadastrar-se</button>
      </div>
      {/* 
        <div>
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLoginUser}>Login</button>
      </div> */}
    </div>
  );
}

export default App;