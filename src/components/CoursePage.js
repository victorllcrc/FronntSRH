import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Accordion, Card } from 'react-bootstrap';

const mockCourseData = {
  id: 1,
  title: 'Data Cience',
  description: 'Antes de empezar Introducción y objetivos del curso',
  videoUrl: 'https://storagedadapi.blob.core.windows.net/container-dadapi/visual.mp4',
  modules: [
    {
      id: 1,
      title: 'Módulo 1: Introducción',
      videos: [
        { title: 'Clase 1', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/front.mp4' },
        { title: 'Clase 2', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/back.mp4' },
      ],
    },
    {
      id: 2,
      title: 'Módulo 2: Contenido',
      videos: [
        { title: 'Clase 1', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/doc.mp4' },
        { title: 'Clase 2', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/front.mp4' },
        { title: 'Clase 3', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/back.mp4' },
      ],
    },
    {
      id: 3,
      title: 'Módulo 3: Conclusiones',
      videos: [
        { title: 'Clase 1', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/back.mp4' },
        { title: 'Clase 2', url: 'https://storagedadapi.blob.core.windows.net/container-dadapi/doc.mp4' },
      ],
    },
  ],
};

export const CoursePage = () => {
  const { id } = useParams();
  const course = mockCourseData; // Aquí puedes obtener datos reales de una API
  const [currentVideo, setCurrentVideo] = useState(course.videoUrl); // Estado para controlar el video actual

  const handleVideoSelect = (videoUrl) => {
    setCurrentVideo(videoUrl); // Cambia el estado del video actual
  };

  return (
    <Container fluid className="course-page">
      <Row>
        <Col md={3} className="sidebar">
          <Button variant="primary" className="back-button">
            &larr; Regresar al panel
          </Button>
          <h4 className="course-title">{course.title}</h4>
          <p className="course-description">{course.description}</p>
          <Accordion defaultActiveKey="0" className="modules-list">
            {course.modules.map((module, moduleIndex) => (
              <Card key={module.id}>
                <Accordion.Item eventKey={`${moduleIndex}`}>
                  <Accordion.Header>{module.title}</Accordion.Header>
                  <Accordion.Body>
                    {module.videos.map((video, videoIndex) => (
                      <p key={videoIndex} onClick={() => handleVideoSelect(video.url)} style={{ cursor: 'pointer' }}>
                        {video.title}
                      </p>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Card>
            ))}
          </Accordion>
        </Col>
        <Col md={9}>
          <div className="video-container">
            <video controls src={currentVideo} width="100%" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursePage;
