import { Container, Row, Col, Tab, Nav, Button } from "react-bootstrap";
import { CourseCard } from "./CourseCard"; //
import projImg1 from "../assets/img/project-img1.png";
import projImg2 from "../assets/img/project-img2.png";
import projImg3 from "../assets/img/project-img3.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import TrackVisibility from 'react-on-screen';

export const Specialties = () => {
  const courses = [
  ];

  return (
    <section className="specialties" id="specialties">
      <img className="background-image-right" src={colorSharp2} alt="background" />
    </section>
  );
};
