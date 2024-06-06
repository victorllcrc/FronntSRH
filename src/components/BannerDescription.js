import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";

export const BannerDescription = ({ course, onPurchase }) => {
    const [isPurchased, setIsPurchased] = useState(false);

    const handlePurchase = () => {
    setIsPurchased(true);
  };
      
return (
    <section className="bannerdescription">
        <Container>
            <div>
            <h2>Sobre el Hospedaje</h2>
            <p>{course.about}</p>
            </div>
        </Container>
    </section>
    );
};