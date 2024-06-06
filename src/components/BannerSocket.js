import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import io from 'socket.io-client';

const socket = io('https://stellar-empty-boa.glitch.me/'); 


export const BannerSocket = ({ course }) => {
    const [dataSocket, setDataSocket] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        // Suscribirse al evento lecturas
        socket.on('lecturas', (value) => {
          setDataSocket(JSON.parse(value));
        });
        console.log("DATAAAAAAAAAA")
        console.log(dataSocket)


        // Suscribirse al evento stream_to_client
        socket.on('stream_to_client', (message) => {
            if (isCameraOn) {
                const blob = new Blob([message], { type: "image/jpeg" });
                const url = URL.createObjectURL(blob);
                setImageURL(url);
            }
        });
    
        // Limpiar las suscripciones al desmontar el componente
        return () => {
          socket.off('lecturas');
          socket.off('stream_to_client');
        };
      }, [isCameraOn]);

    const handleCameraToggle = () => {
        const newState = !isCameraOn;
        setIsCameraOn(newState);
        if (!newState) {
            setImageURL(null); // Limpiar la imagen cuando la camara esta apagada
        }
        socket.emit('camaraState', newState);
    };
      
return (
    <section className="bannerSocket">
        <Container>
            {dataSocket ? (
                <div>
                    <h2>Sobre informacion de Sensores</h2>
                    <p>Temperatura (C): {dataSocket.temp_c}</p>
                    <p>Temperatura (F): {dataSocket.temp_f}</p>
                    <p>Humedad: {dataSocket.hume}</p>
                    <p>Sensor de Tierra: {dataSocket.s_ter}</p>
                    <p>Luz (LDR): {dataSocket.ldr}</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
            <div className="button-container">
                <Button onClick={handleCameraToggle}>
                    {isCameraOn ? 'Apagar Cámara' : 'Encender Cámara'}
                </Button>
            </div>
            {imageURL && (
                <div className="image-container">
                    <h2>Stream</h2>
                    <img src={imageURL} alt="Stream" />
                </div>
            )}
        </Container>
    </section>
    );
};