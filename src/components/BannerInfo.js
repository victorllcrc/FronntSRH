import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const BannerInfo = ({ course, handlePurchase }) => {
  // Verificamos si el curso está definido antes de acceder a sus propiedades
  const duration = course ? course.duration : "";
  const name = course ? course.name : "";

  return (
    <section className="bannerinfo">
      <Container>
        <div>
          <p>Ubicación: {duration}</p>
          <h2>{name}</h2> 
          <Link to="/shopping" state={[course]}>
            <Button onClick={handlePurchase}>Reserva Ahora</Button> {/* Llamar a la función de compra */}
          </Link>
        </div>
      </Container>
    </section>
  );
};
