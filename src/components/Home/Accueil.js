// Acceuil.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Acceuil.css'; // Assurez-vous de spécifier le bon nom de fichier CSS

const Acceuil = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('token') ? true : false;
    setIsLoggedIn(userIsLoggedIn);
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="acceuil-container">
      <h1>Accueil</h1>
      {isLoggedIn ? (
        <div>
          <p>Bienvenue, utilisateur connecté !</p>
          <button onClick={handleLogout}>Déconnexion</button>
        </div>
      ) : (
        <div>
          <p>Vous n'êtes pas connecté.</p>
          <Link to="/login">Connexion</Link>
        </div>
      )}
    </div>
  );
};

export default Acceuil;
