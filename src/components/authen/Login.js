import axios from "axios"
import { useState } from "react"
import { Form,Button } from "react-bootstrap"
import './Login.css'
export default function Ajouter() {
  const [titre,setTitre]=useState('')
  const [description, setDescription] = useState('')
  const [domaine, setDomaine] = useState('')
  const [niveau, setNiveau] = useState('')
  const [disponible, setDisponible] = useState(false)


  const handleAjouter=(e)=>{
    e.preventDefault()
    if(disponible==="true"){
      setDisponible(true)
    }
    axios.post('http://localhost:3000/formations',{
      titre:titre,
      domaine:domaine,
      niveau:niveau,
      description:description,
      disponible:disponible
    }).then(()=>{
      alert('good job')
    })
  }
  return (
    <>
    <h1 className="text-center">Ajouter Formation</h1>
    <Form className="container">
      <Form.Group className="mb-3">
        <Form.Label>titre</Form.Label>
        <Form.Control type="text" placeholder="Enter titre" onChange={e=>setTitre(e.target.value)}/>
      </Form.Group>
      <div>
        <span>Choisissez un domaine</span>
        <Form.Select name="domaine " id="domaine" style={{ marginBottom: '20px',marginTop: '20px'}} onChange={e=>setDomaine(e.target.value)}>
          <option value="" disabled selected>select domain</option>
            <option value="Informatique">Informatique</option>
            <option value="Management">Management</option>
            <option value="Design">Design</option>
        </Form.Select>
      </div>
      <div>
        <span>Choisissez un niveau</span>
        <Form.Select name="niveau " id="niveau" style={{ marginBottom: '20px',marginTop: '20px'}} onChange={e=>setNiveau(e.target.value)}>
          <option value="" disabled selected>Choose a niveau...</option>
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avance">Avance</option>
        </Form.Select>
      </div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>description</Form.Label>
        <Form.Control type="text" placeholder="Enter description" onChange={e=>setDescription(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Disponible" value={true} onChange={e=>setDisponible(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleAjouter}>
        Submit
      </Button>
    </Form>
    </>
  )
}