import React from 'react';
import { useHistory } from 'react-router-dom';

import mapMarketImg from '../images/map-marker.svg';

import PrimaryButton from '../components/PrimaryButton';

import '../styles/pages/signin-failed.css';

export default function SignInFailed() {
    const history = useHistory();

    function handleHomeRedirect(){
        return history.push('/');
    }

    return (
        <div id="page-signin-failed">
            <div className="failed-content-wrapper">
                <div className="failed-logo">
                    <img src={mapMarketImg} height="126" width="110" alt="Happy"/>
                    <p className="happy-title">happy</p>
                </div>
                <div className="failed-status">
                    <strong>Você já está autenticado!</strong>
                    <PrimaryButton onClick={handleHomeRedirect}>
                        Ir para Home
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}