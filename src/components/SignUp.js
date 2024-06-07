import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import TrackVisibility from 'react-on-screen';
import { API_URL } from '../config';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../AuthContext';

export const SignUp = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const formInitialDetails = {
    user: '',
    email: '',
    password: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Regístrate');
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Registrando...");
    let response = await fetch(API_URL+"singUp/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: formDetails.user,
        email: formDetails.email,
        password: formDetails.password,
      }),
    });

    setButtonText("Regístrate");
    let result = await response.json();

    const token = result.token

    if (token) {
      setStatus({ success: true, message: 'Registro exitoso' });
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
    <section className="signup" id="signup">
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}> 
          <Col size={12} md={6} className="text-center">  
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Regístrate</h2>
                  <form onSubmit={handleSubmit}>
                    <Row className="justify-content-center"> 
                      <Col size={12} md={8} className="px-1">  
                        <input
                          type="user"
                          value={formDetails.user}
                          placeholder="Nombre de usuario"
                          onChange={(e) => onFormUpdate('user', e.target.value)}
                        />
                      </Col> 
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
                        <Col className={status.success === false ? "text-danger" : "text-success"}>
                          <p>{status.message}</p>
                        </Col>
                      )}
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
