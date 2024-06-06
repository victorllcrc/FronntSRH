import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import colorSharp2 from "../assets/img/color-sharp2.png";
import TrackVisibility from 'react-on-screen';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { API_URL } from '../config';

export const Projects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + '/api/courses');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Hospedajes Destacados</h2>
                  <p>Nuestros hospedajes están diseñados para brindarte una experiencia única y confortable, con todas las comodidades esenciales y servicios personalizados para que disfrutes de una estancia placentera y memorable.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Habitaciones Estándar</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Suites Ejecutivas</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Villas de Lujo</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {loading ? (
                            <p>Cargando hospedajes...</p>
                          ) : (
                            data.map((course, index) => (
                              <ProjectCard
                                key={index}
                                title={course.name}
                                description={course.duration}
                                imgUrl={course.image_url}
                              />
                            ))
                          )}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {loading ? (
                            <p>Cargando hospedajes...</p>
                          ) : (
                            data.map((course, index) => (
                              <ProjectCard
                                key={index}
                                title={course.name}
                                description={course.duration}
                                imgUrl={course.image_url}
                              />
                            ))
                          )}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {loading ? (
                            <p>Cargando hospedajes...</p>
                          ) : (
                            data.map((course, index) => (
                              <ProjectCard
                                key={index}
                                title={course.name}
                                description={course.duration}
                                imgUrl={course.image_url}
                              />
                            ))
                          )}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              }
            </TrackVisibility>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Button className="button-transparent" variant="outline-light">
            <span>Ver todos los hospedajes</span>
          </Button>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="" />
    </section>
  )
}

export const getCoursesData = async () => {
  try {
    const response = await axios.get(API_URL + 'api/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
