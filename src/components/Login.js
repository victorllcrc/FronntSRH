import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TrackVisibility from 'react-on-screen';
import { API_URL } from '../config';
import { useAuth } from '../AuthContext'; // Para obtener la función de login
import { jwtDecode } from "jwt-decode";

export const Login = () => {
  const { login } = useAuth(); // Para llamar a la función login
  const navigate = useNavigate(); // Para redirigir después de iniciar sesión
  
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
  });

  const [buttonText, setButtonText] = useState('Iniciar Sesión');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonText('Iniciando...');
    const response = await fetch(API_URL+"api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: formDetails.email,
        password: formDetails.password,
      }),
    });
    

    setButtonText('Iniciar Sesión');
    const result = await response.json();

    const token = result.token

    if (token) {
      setStatus({ success: true, message: 'Inicio de sesión exitoso' });
      const decodedToken = jwtDecode(token);
      localStorage.setItem('token', token);
      const userData = {
        email: decodedToken.email,
        name: decodedToken.name
      };
      login(userData); // Actualizar el contexto de autenticación
      navigate('/'); // Redirigir a la página principal
    } else {
      setStatus({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  };

  return (
    <section className="login">
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col size={12} md={6} className="text-center">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <h2>Iniciar Sesión</h2>
                  <form onSubmit={handleSubmit}>
                    <Row className="justify-content-center">
                      <Col size={12} md={8} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Correo Electrónico"
                          onChange={(e) => onFormUpdate('email', e.target.value)}
                        />
                      </Col>
                      <Col size={12} md={8} className="px-1">
                        <input
                          type="password"
                          value={formDetails.password}
                          placeholder="Contraseña"
                          onChange={(e) => onFormUpdate('password', e.target.value)}
                        />
                      </Col>
                      <Col size={12} md={8} className="px-1">
                        <button type="submit">
                          <span>{buttonText}</span>
                        </button>
                      </Col>
                      {status.message && (
                        <Col className={status.success === false ? 'text-danger' : 'text-success'}>
                          <p>{status.message}</p>
                        </Col>
                      )}
                      <Col size={12} md={8}>
                        <div>¿Olvidaste tu contraseña?</div>
                        <Link to="/forgot-password">
                          Cambiar Contraseña
                        </Link>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
