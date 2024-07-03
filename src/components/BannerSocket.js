import React, { useState, useEffect } from 'react';
import { Container, Button } from "react-bootstrap";
import io from 'socket.io-client';

const socket = io('https://stellar-empty-boa.glitch.me/'); 

export const BannerSocket = ({ course, showCamera }) => {
    const [dataSocket, setDataSocket] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        socket.on('lecturas', (value) => {
            setDataSocket(JSON.parse(value));
        });

        socket.on('stream_to_client', (message) => {
            if (isCameraOn) {
                const blob = new Blob([message], { type: "image/jpeg" });
                const url = URL.createObjectURL(blob);
                setImageURL(url);
            }
        });

        return () => {
            socket.off('lecturas');
            socket.off('stream_to_client');
        };
    }, [isCameraOn]);

    const handleCameraToggle = () => {
        const newState = !isCameraOn;
        setIsCameraOn(newState);
        if (!newState) {
            setImageURL(null);
        }
        socket.emit('camaraState', newState);
    };

    return (
        <section className="bannerSocket">
            <Container>
                {dataSocket ? (
                    <div className="sensor-info">
                        <h5>Información de Sensores</h5>
                        <div className="sensor-details">
                            <div className="sensor-detail"><span>Temperatura (C):</span> {dataSocket.temp_c}</div>
                            <div className="sensor-detail"><span>Temperatura (F):</span> {dataSocket.temp_f}</div>
                            <div className="sensor-detail"><span>Humedad:</span> {dataSocket.hume}</div>
                            <div className="sensor-detail"><span>Sensor de Tierra:</span> {dataSocket.s_ter}</div>
                            <div className="sensor-detail"><span>Luz (LDR):</span> {dataSocket.ldr}</div>
                        </div>
                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
                {showCamera && (
                    <div>
                        <Button onClick={handleCameraToggle}>
                            {isCameraOn ? 'Apagar Cámara' : 'Encender Cámara'}
                        </Button>
                        {imageURL && (
                            <div className="image-container">
                                <h5>Stream</h5>
                                <img src={imageURL} alt="Stream" />
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </section>
    );
};
