import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Ajouter() {
  const [formations, setFormations] = useState([]);
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [domaine, setDomaine] = useState("");
  const [niveau, setNiveau] = useState("");
  const [disponible, setDisponible] = useState(false);

  useEffect(() => {
    fetchFormations();
  }, []);

  const fetchFormations = async () => {
    try {
      const response = await axios.get("http://localhost:3000/formations");
      setFormations(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des formations :", error);
    }
  };

  const handleAjouter = async (e) => {
    e.preventDefault();
    const nouvelleFormation = {
      titre: titre,
      domaine: domaine,
      niveau: niveau,
      description: description,
      disponible: disponible,
    };

    try {
      const response = await axios.post("http://localhost:3000/formations", nouvelleFormation);
      alert("Formation ajoutée avec succès !");
      fetchFormations(); // Rafraîchir la liste des formations après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la formation :", error);
    }
  };

  return (
    <>
      <h1 className="text-center">Ajouter Formation</h1>
      <Form className="container">
        <Form.Group className="mb-3" controlId="formBasicTitre">
          <Form.Label>Titre</Form.Label>
          <Form.Control type="text" placeholder="Enter titre" onChange={(e) => setTitre(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDomaine">
          <Form.Label>Domaine</Form.Label>
          <Form.Control type="text" placeholder="Enter domaine" onChange={(e) => setDomaine(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNiveau">
          <Form.Label>Niveau</Form.Label>
          <Form.Control type="text" placeholder="Enter niveau" onChange={(e) => setNiveau(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Disponible"
            checked={disponible}
            onChange={() => setDisponible(!disponible)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleAjouter}>
          Ajouter
        </Button>
      </Form>
    </>
  );
}
