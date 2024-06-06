// Sidebar.js
import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

const Sidebar = ({ modules, isVisible, toggleVisibility }) => {
  return (
    <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0" onClick={toggleVisibility}>
            Módulos del Hospedaje
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul>
                {modules.map((module, index) => (
                  <li key={index}>{module.title}</li>
                ))}
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default Sidebar;
