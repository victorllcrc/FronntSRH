import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { NavBar2 } from './NavBar2';
import { Footer } from './Footer';
import { BannerInfo } from './BannerInfo';
import { BannerDescription } from './BannerDescription';
import { BannerDescription2 } from './BannerDescription2';
import { BannerSocket } from './BannerSocket'; // Mantén el uso de BannerSocket aquí
import axios from "axios";
import { API_URL } from '../config';
import { useParams } from 'react-router-dom';
import { usePurchases } from '../ShoppingContext';

export const Info = () => {
    const { addPurchase } = usePurchases();
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [DataCourse, setDataCourse] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}api/courses/${id}`);
                setDataCourse(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handlePurchase = () => {
        setSelectedCourse(DataCourse);
        setShowModal(true);
    };

    const handleConfirmPurchase = () => {
        addPurchase(selectedCourse);
        setShowModal(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div id="root">
            <NavBar2 />
            <section>
                <div className="grid-container">
                    <div className="grid-item">
                        <BannerInfo course={DataCourse} onPurchase={handlePurchase} />
                    </div>
                    <div className="grid-item">
                        <BannerDescription course={DataCourse} />
                    </div>
                    <div className="grid-item">
                        <BannerDescription2 course={DataCourse} />
                    </div>
                    <div className="grid-item">
                        <BannerSocket course={DataCourse} showCamera={true} /> {/* Mostrar lógica de cámara en Info */}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};
