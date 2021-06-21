import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

import mapMarketImg from '../images/map-marker.svg';
import LargeSidebar from '../components/LargeSidebar';

import '../styles/pages/signin.css';

export default function SignIn() {
    const { signed } = useAuth();

    if (signed)
        return <Redirect to={'/failed'} />;

    return (
        <div id="page-signin">
            <div className="signin-content-wrapper">
                <div className="signin-logo">
                    <img src={mapMarketImg} height="126" width="110" alt="Happy"/>
                    <p className="happy-title">happy</p>
                </div>
                <div className="location">
                    <strong>São Paulo</strong>
                    <span>São Paulo</span>
                </div>
            </div>
            <LargeSidebar />
        </div>
    )
}