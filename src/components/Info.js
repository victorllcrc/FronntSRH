import { NavBar2 } from './NavBar2';
import { Footer } from './Footer';
import { useState, useEffect } from 'react';
import { usePurchases } from '../ShoppingContext';
import { BannerInfo } from './BannerInfo';
import { BannerDescription } from './BannerDescription';
import { BannerDescription2 } from './BannerDescription2';
import { BannerSocket } from './BannerSocket';
import axios from "axios";
import { API_URL } from '../config';
import { useParams } from 'react-router-dom';

export const Info = ({ course }) => {
  const { addPurchase } = usePurchases();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [DataCourse, setDataCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL + 'api/courses/'+id);
        setDataCourse(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = () => {
    setSelectedCourse(DataCourse);
    setShowModal(true); // Mostrar el modal de compra
  };

  const handleConfirmPurchase = () => {
    addPurchase(selectedCourse); // Agregar el artículo a las compras
    setShowModal(false); // Cerrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
  };

  return (
    <section> 
      <NavBar2 />
      <BannerInfo course={DataCourse} onPurchase={handlePurchase} />
      <BannerDescription course={DataCourse} />
      <BannerDescription2 course={DataCourse} />
      <BannerSocket course={DataCourse} />
      <Footer />
    </section>
  );
};
