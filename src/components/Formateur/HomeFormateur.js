import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeFormateur = ({ userId }) => {
  const [formateurs, setFormateurs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Votre logique d'authentification ici
    const fakeAuthenticationCheck = async () => {
      try {
        // Remplacez cela par votre logique d'authentification réelle
        const response = await axios.get(`http://localhost:3000/authenticate/${userId}`);
        const isAuthenticated = response.data.isAuthenticated;

        // Mettez à jour l'état d'authentification en conséquence
        setIsAuthenticated(isAuthenticated);

        // Si l'utilisateur est authentifié, récupérez les formateurs
        if (isAuthenticated) {
          fetchFormateursForParticipant();
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification :", error);
      }
    };

    // Appelez la fonction pour vérifier l'authentification
    fakeAuthenticationCheck();
  }, [userId]);

  const fetchFormateursForParticipant = async () => {
    try {
      // Récupérer le participant par son ID
      const participantResponse = await axios.get(`http://localhost:3000/utilisateurs/${userId}`);
      const participant = participantResponse.data;
  
      // Récupérer les formateurs associés aux formations du participant
      const formateursIds = participant.formations_inscrites.reduce(
        (ids, formationId) => ids.concat(formationId.formateurs_enseignants),
        []
      );
  
      // Éliminer les doublons des identifiants de formateurs
      const uniqueFormateursIds = [...new Set(formateursIds)];
  
      // Récupérer les détails des formateurs par leurs identifiants
      const formateursDetails = await Promise.all(
        uniqueFormateursIds.map(async (formateurId) => {
          const formateurResponse = await axios.get(`http://localhost:3000/utilisateur/${formateurId}`);
          return formateurResponse.data;
        })
      );
  
      setFormateurs(formateursDetails);
    } catch (error) {
      console.error("Erreur lors du chargement des formateurs :", error);
    }
  };
  

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1 className="text-center">Liste des Formateurs pour le Participant</h1>
          <ul>
            {formateurs.map((formateur) => (
              <li key={formateur.id}>
                <h3>{formateur.nom}</h3>
                <p>Spécialité: {formateur.specialite}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Veuillez vous connecter pour accéder à la liste des formateurs.</p>
      )}
    </div>
  );
};

export default HomeFormateur;
