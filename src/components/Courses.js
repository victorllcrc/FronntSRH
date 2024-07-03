import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { NavBar2 } from './NavBar2';
import { getCoursesData } from './Projects';
import { Link } from 'react-router-dom';
import { BannerSocket } from './BannerSocket';

export const Courses = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const coursesData = await getCoursesData();
                setData(coursesData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching courses data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="course">
            <NavBar2 />
            <Container>
                <h2>Listado de Hospedajes</h2>
                <Row xs={1} sm={2} md={2} lg={3} xl={3} className="g-3">
                    {loading ? (
                        <p>Cargando hospedajes...</p>
                    ) : (
                        data.map((course, index) => (
                            <Col key={index}>
                                <Card className="h-100" style={{ backgroundImage: `url(${course.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%' }}>
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{course.name}</Card.Title>
                                        <Card.Text>{`Ubicación: ${course.duration}`}</Card.Text>
                                        <BannerSocket course={course} showCamera={false} /> {/* No mostrar cámara en Courses */}
                                        <Link to={`/info/${course._id}`}>
                                            <Button className="mt-auto">Más información</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </section>
    );
};
