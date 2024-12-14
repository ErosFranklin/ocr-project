import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginUser = async () => {
        try {
            if (!email || !password) {
                return alert('Preencha todos os campos');
            }
            if (password.length < 8) {
                return alert('Senha deve ter no mínimo 8 caracteres');
            }
            const response = await loginUser({ email, password });
            if (!response.data) {
                return alert('Erro ao fazer login');
            }
            navigate('/menu')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="Login">
            <h2 className="title-login">Login</h2>
            <input type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLoginUser}>Entrar</button>
        </div>
    )
}

export default Login;