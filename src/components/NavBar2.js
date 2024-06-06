import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useAuth } from '../AuthContext'; 
import logo from '../assets/img/logo.svg';
import { Link } from 'react-router-dom';

export const NavBar2 = () => {
  const { user, logout } = useAuth(); // Obtener el usuario y la función logout

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link} to="/"
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('home')}>Inicio</Nav.Link>
            <Nav.Link
              as={Link} to="/courses"
              className={activeLink === 'courses' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('courses')}>Hospedajes</Nav.Link>
            <Nav.Link
              as={Link} to="/shopping"
              className={activeLink === 'shopping' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('shopping')}>Mis Reservas
            </Nav.Link>

            <Dropdown onSelect={(key) => onUpdateActiveLink(key)}>
              <Dropdown.Toggle
                variant="link"
                className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}>{user ? user.name : 'Usuario'} 
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {user ? (
                  <>
                    <Dropdown.Item as={Link} to="/mycourses">Mis Reservas</Dropdown.Item> {/* Opciones para el usuario */}
                    <Dropdown.Item as={Link} to="/account">Cuenta</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>Cerrar Sesión</Dropdown.Item> {/* Cerrar sesión */}
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/courses">Todos los Hospedajes</Dropdown.Item> {/* Opción por defecto */}
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
