import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

import mapMarketImg from '../images/map-marker.svg';

import DangerButton from '../components/DangerButton';
import PrimaryButton from '../components/PrimaryButton';

import '../styles/pages/signin-success.css';

export default function SignInSuccess() {
    const history = useHistory();

    const { signOut } = useAuth();

    function handleSignOut(){
        signOut();

        return <Redirect to={'/'} />;
    }

    function handleHomeRedirect(){
        return history.push('/');
    }

    return (
        <div id="page-signin-success">
            <div className="success-content-wrapper">
                <div className="success-logo">
                    <img src={mapMarketImg} height="126" width="110" alt="Happy"/>
                    <p className="happy-title">happy</p>
                </div>
                <div className="success-status">
                    <strong>Você está autenticado!</strong>
                    <DangerButton onClick={handleSignOut}>
                        Sign out
                    </DangerButton>
                    <PrimaryButton onClick={handleHomeRedirect}>
                        Ir para Home
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}