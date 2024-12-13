import React, { useState, useEffect } from 'react';
import { createUser, loginUser, getAllUsers } from './api';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getAllUsers().then(response => {
      setUsers(response.data);
    });
  }, []);

  const handleCreateUser = async () => {
    try {
      await createUser({ name, email, password });
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao criar usuario:', error);
    }
  };

  /*const handleLoginUser = async () => {
    try {
      const response = await loginUser({ email, password });
      console.log('Login feito com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao tentar login:', error);
    }
  };*/

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <div>
        <h2>Create User</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
      {/*
      <div>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLoginUser}>Login</button>
      </div>*/}
    </div>

  );
}

export default App;
