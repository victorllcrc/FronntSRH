import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, FormControl } from 'react-bootstrap';
import { NavBar2 } from './NavBar2';
import { Footer } from './Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { API_URL } from '../config';
import axios from "axios";


export const MyCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [notStartedCourses, setNotStartedCourses] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(storedToken);

        const response1 = await axios.get(API_URL + `api/registrations/courses?user_id=${decodedToken.id}&status=completed`);
        setCompletedCourses(response1.data);

        const response2 = await axios.get(API_URL + `api/registrations/courses?user_id=${decodedToken.id}&status=in-progress`);
        setInProgressCourses(response2.data);

        const response3 = await axios.get(API_URL + `api/registrations/courses?user_id=${decodedToken.id}&status=not-started`);
        setNotStartedCourses(response3.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCardClick = (course_id) => {
    navigate(`/course/${course_id}`);
  };
  console.log("completedCourses")
  console.log(completedCourses)
  console.log("inProgressCourses")
  console.log(inProgressCourses)
  console.log("notStartedCourses")
  console.log(notStartedCourses)

  return (
    <section className="mycourses">
      <NavBar2 />
      <Container>
        <h2>Mis Reservas</h2>
        {/* <FormControl
          type="text"
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '10px', width: '50%' }}
        /> */}

        <h3>Reservas Recientes</h3>
        <Row>
          {notStartedCourses.map((course) => (
            <Col key={course.course_id._id} xs={12} md={6} lg={4}>
              <Card
                // onClick={() => handleCardClick(course.course_id._id)}
                style={{
                  margin: '10px',
                  cursor: 'pointer',
                  borderColor: 'lightgray',
                }}
              >
                <Card.Body>
                  <Card.Title>{course.course_id.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        
        <h3>Reservas Finalizadas</h3>
        <Row>
          {completedCourses.map((course) => (
            <Col key={course.course_id._id} xs={12} md={6} lg={4}>
              <Card
                // onClick={() => handleCardClick(course.course_id._id)}
                style={{
                  margin: '10px',
                  cursor: 'pointer',
                  borderColor: 'lightgray',
                }}
              >
                <Card.Body>
                  <Card.Title>{course.course_id.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </section>
  );
};

export default MyCourses;
