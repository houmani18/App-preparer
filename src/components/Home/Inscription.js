import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
import axios from 'axios';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/utilisateurs/${id}`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });

    if(data.role!=='Participant'){
        navigate('/')
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:3000/utilisateurs/' + idU, {
        nom: data.nom,
        role: data.role,
        email: data.email,
        password: data.password,
        formations_inscrites: [...data.formations_inscrites, id]
    }).then(()=>{
        navigate('/users/home')
    })
}
    

//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

    // Perform your axios request here after validation

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="validationCustom01">
          <Form.Label>nom</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="nom"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>role</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="role"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>email</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="email"
            defaultValue=""
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );


export default FormExample;
