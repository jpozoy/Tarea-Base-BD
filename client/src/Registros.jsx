import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Registros.css'; // Asegúrate de agregar los estilos en este archivo

function Registros() {
    // Estado para almacenar los datos de los pacientes
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Obtener los datos de los pacientes
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5139/GetPacientes');
                setPatients(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <h1>Registros de Pacientes</h1>
            <div className="grid-container">
                <div className="grid-header">Cédula</div>
                <div className="grid-header">Nombre</div>
                <div className="grid-header">Fecha de Nacimiento</div>
                <div className="grid-header">Edad</div>
                <div className="grid-header">Dirección</div>
                {patients.map((patient, index) => (
                    <>
                        <div className="grid-item" key={`cedula-${index}`}>{patient.cedula}</div>
                        <div className="grid-item" key={`nombre-${index}`}>{patient.nombre}</div>
                        <div className="grid-item" key={`fecha-${index}`}>{patient.fechaNacimiento}</div>
                        <div className="grid-item" key={`edad-${index}`}>{patient.edad}</div>
                        <div className="grid-item" key={`direccion-${index}`}>{patient.direccion}</div>
                    </>
                ))}
            </div>
        </div>
    );
}

export default Registros;
