import React, { FormEvent, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';

import * as authService from '../services/auth/authService';
import { useAuth } from '../contexts/authContext';

import Checkbox from '../components/Checkbox';
import PrimaryButton from '../components/PrimaryButton';

import '../styles/components/large-sidebar.css';

interface IStateType {
    from: { pathname: string }
}

export default function LargeSidebar(){
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const { state } = useLocation<IStateType>()

    const { signIn } = useAuth();

    function handleSubmit(event: FormEvent){
        event.preventDefault();

        const loginData = {email: email, password: password};

        if (!loginData.email || !loginData.password) {
            setLoginError(true);
            return;
        }

        authService.signIn(loginData).then(response => {
            signIn(response, rememberMe);

            return history.push(state?.from || '/success');
        }).catch(error => {
            setLoginError(true);
        });
    }

    function handleDismiss(){
        setLoginError(false);
    }

    return (
        <aside className="aside-large-sidebar">
            <button className="back-button" type="button" onClick={history.goBack}>
                <FiArrowLeft size={24} color="#15C3D6" />
            </button>
            <main>
                <form className="sidebar-login-form" onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Fazer Login</legend>
                        { loginError &&
                            <div className="login-error">
                                <p>O campo de email ou senha está inválido.</p>
                                <button type="button" className="dismiss-btn" onClick={handleDismiss}>
                                    X
                                </button>
                            </div>
                        }
                        <div className="input-block">
                            <label htmlFor="email">Email:</label>
                            <input 
                                id="email" 
                                name="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)} 
                            />
                        </div>
                        <div className="input-block">
                            <label htmlFor="senha">Senha:</label>
                            <input 
                                id="senha" 
                                type="password" 
                                name="senha"
                                value={password}
                                onChange={event => setPassword(event.target.value)} 
                            />
                        </div>

                        <Checkbox label="Lembrar-me" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)}/>

                        <PrimaryButton type="submit">Sign In</PrimaryButton>
                    </fieldset>
                </form>
            </main>
        </aside>
    );
}