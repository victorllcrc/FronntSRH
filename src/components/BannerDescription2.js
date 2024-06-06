import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";

export const BannerDescription2 = ({ course, onPurchase }) => {
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
    setIsPurchased(true);
  };
      
return (
    <section className="bannerdescription2">
        <Container>
            <div>
            <h2>Público Objetivo</h2>
            <p>{course.description_target_audience}</p>
            <h2>Costo por Noche</h2>
            <p>S/. {course.cost}. 00</p>
            <h2>Sobre la Habitación</h2>
            <p>{course.syllabus}</p>
            </div>
        </Container>
    </section>
    );
};