import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Inicio</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Nosotros</Nav.Link>
              <Dropdown onSelect={(key) => onUpdateActiveLink(key)}>
                <Dropdown.Toggle variant="link" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'}>Hospedajes</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Nav.Link} href="#projects" className={activeLink === 'projects' ? 'active navbar-link2' : 'navbar-link2'} onClick={() => onUpdateActiveLink('projects')}>Hospedajes Destacados</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/specialties' className={activeLink === 'specialties' ? 'active navbar-link2' : 'navbar-link2'} onClick={() => onUpdateActiveLink('specialties')}>Hospedajes Favoritos</Dropdown.Item>
                  <Dropdown.Item eventKey="design">Todos los Hospedajes</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link href="#connect" className={activeLink === 'connect' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('connect')}>Contáctanos</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="#"><img src={navIcon1} alt="" /></a>
                <a href="#"><img src={navIcon2} alt="" /></a>
                <a href="#"><img src={navIcon3} alt="" /></a>
              </div>
              <Link to='/login'>
                <button className="vdd"><span>Iniciar Sesión</span></button>
              </Link>
              <Link to='/signup'>
                <button className="vvd"><span>Regístrate</span></button>
              </Link>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}