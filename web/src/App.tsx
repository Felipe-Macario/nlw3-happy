import React from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css'

import { AuthProvider } from './contexts/authContext';
import Routes from './routes/routes';

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}