import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/authContext';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.svg';

function Landing() {
  const { signed, signOut } = useAuth();

  function handleSignOut(){
    signOut();
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy"/>
        <div className="location">
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </div>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        {
          signed ?
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        :
          <Link to="/signin" className="signin-button">
            Acesso Restrito
          </Link>
        }
        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;