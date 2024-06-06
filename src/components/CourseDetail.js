import { useState } from "react";
import { BannerInfo } from "./BannerInfo"; // Importa el componente modificado

const CourseDetails = ({ course }) => {
    console.log("course:", course); // Verifica si `course` tiene datos
    return (
      <BannerInfo course={course} onPurchase={() => alert("Reserva realizada")} />
    );
  };
  

export default CourseDetails;
