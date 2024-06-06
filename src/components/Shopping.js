import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { NavBar2 } from './NavBar2';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { API_URL } from '../config';
import { jwtDecode } from "jwt-decode";

export const Shopping = () => {
  const [showModal, setShowModal] = useState(false);
  const { state } = useLocation();
  const [data, setData] = useState(false);
  console.log(state)

  const shopping = state 

  const totalPrice = shopping.reduce(
    (acc, course) => acc + (course?.cost ?? 0),
    0
  );

  const handleRemovePurchase = (course) => {
    console.log(`Eliminar curso con id: ${course.id}`); // Simular la eliminación
    // Aquí agregarías la lógica para eliminar del carrito
  };

  const handleConfirmPurchase = () => {
    console.log("Compra confirmada"); // Simular la confirmación
    setShowModal(false); // Cierra el modal
    // Aquí agregarías la lógica para confirmar la compra
  };

  const registration = async () => {
    for (const course of shopping) {
      const storedToken = localStorage.getItem('token');
      const decodedToken = jwtDecode(storedToken);
      console.log(decodedToken)
  
      const data = {
        user_id: decodedToken.id,
        course_id: course._id,
      };
  
      try {
        const response = await axios.post(API_URL + 'api/registrations', data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <section className="shopping">
      <NavBar2 />
      <Container>
        <h2>Información de Reserva</h2>
        <Row>
          {shopping.map((course, index) => (
            <Col key={index} xs={12} md={8}>
              <Card style={{ marginBottom: '10px' }}>
                <Card.Body>
                  <Card.Title>{course.name}</Card.Title> {/* Nombre estático */}
                  <Card.Text>Precio: ${course.cost.toFixed(2)}</Card.Text> {/* Precio estático */}
                  <Button variant="danger" onClick={() => handleRemovePurchase(course)}> {/* Botón para eliminar */}
                    <FaTimes />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col xs={12} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total: ${totalPrice.toFixed(2)}</Card.Title> {/* Precio total */}
                <Button onClick={() => setShowModal(true)}>Pagar</Button> {/* Abrir modal */}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal para confirmar la compra */}
        <Modal className="modal" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <h2>Confirmar Pago</h2>
      </Modal.Header>
      <Modal.Body>
        ¿Quieres proceder con el pago? Esta acción es irreversible.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button> {/* Cerrar modal */}
        <Link to="/mycourses" state={shopping}> 
          <Button variant="success" onClick={() => registration()}>Confirmar</Button> {/* Botón dentro de `Link` */}
        </Link>
      </Modal.Footer>
    </Modal>
      </Container>
    </section>
  );
};
