import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './api';
import './style/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage]  = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLoginUser = async () => {
        try {
            if (!email || !password) {
                return setErrorMessage('Preencha todos os campos');
            }
            if(email.indexOf('@') === -1) {
                return setErrorMessage('Email inválido');
            }
            if (password.length < 8) {
                return setErrorMessage('Senha deve ter no mínimo 8 caracteres');
            }
            setLoading(true)
            const response = await loginUser({ email, password });
            if (!response.data) {
                return setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
            }
            navigate('/menu')
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return setErrorMessage('Algo deu errado. Tente novamente.');
        }finally{
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
                <div className="Login">
                  <div className="title">
                    <h1>NotaOne</h1>   
                  </div>
                  
                  <div className="form-login">
                    <div className="title-container">
                      <h2 className="title-login">Login</h2>
                      <p className="subtitle-login">Olá novamente, realize o login e continue usando.</p>
                    </div>
                    <div className="inputs-container">
                      <div className="component">
                      <input type="email" placeholder="exemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required aria-label="Digite seu email"/>
                        <FontAwesomeIcon className='icone2' icon={faEnvelope} />
                      </div>
                      <div className="component">
                      <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} required aria-label="Digite sua senha"/>
                        <FontAwesomeIcon className='icone3' icon={faLock} />
                      </div> 
                      <span className='message-error'>{errorMessage}</span>
                      <button className='btn-login' onClick={handleLoginUser}>Entrar</button>
                      
                    </div>
                  </div>
                  <span className='container-botton'>Nao possui uma conta? <a href="/">Registre-se agora</a></span>
                  
                </div>
            </div>



    )
}

export default Login;