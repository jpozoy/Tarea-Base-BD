import React,{ useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios'
import './index.css'

function Home () {
    // Estado para los valores del formulario
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [fecha, setFecha] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    //Fecha maxima para el input de fecha
    const fechaMaxima = new Date().toISOString().split('T')[0];

    // Función para manejar el clic en el botón "Registrar"
    const handleInfo = () => {
        // Validar que todos los campos no estén vacíos
        if (!cedula || !nombre || !fecha || !direccion) {
        setError('Por favor, rellene todos los campos.');
        return;
        }
        setError('');
        // Calcular la edad
        const edad = calcularEdad(fecha);
        // Guardar los datos en la base de datos
        saveData(edad);
        // Limpiar el formulario después de registrar
        setCedula('');
        setNombre('');
        setFecha('');
        setDireccion('');
    };

    //Funcion para guardar los datos en la base de datos
    const saveData = async (edad) => { 
        try {
        const url = 'http://localhost:5139/AddPaciente';
        const data = {
            cedula,
            nombre,
            fechaNacimiento: fecha,
            edad,
            direccion
        };
        const response = await axios.post(url, data);
        } catch (error) {
        console.error(error);
        }
    }

    // Función para calcular la edad a partir de la fecha de nacimiento
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }; 

    //Funcion para manejar el clic en el boton "Ver Lista Pacientes"
    const handleBotonRegistros = () => {
        navigate('/registros');
    }

    return (
        <div>
        <h1>Registrar paciente</h1>
        <h3>Ingrese los datos del paciente</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='div-home'>
            <label htmlFor="cedula">Cedula:</label>
            <input
            type="text"
            id="cedula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            />
        </div>
        <div className='div-home'>
            <label htmlFor="nombre">Nombre:</label>
            <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
        </div>
        <div className='div-home'>
            <label htmlFor="fecha">Fecha Nacimiento:</label>
            <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            max={fechaMaxima}
            />
        </div>
        <div className='div-home'>
            <label htmlFor="direccion">Dirección:</label>
            <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            />
        </div>
        <button id='button-home-1' onClick={handleInfo}>Registrar</button>
        <br/>
        <button id='button-home-2' onClick={handleBotonRegistros}>Ver Lista Pacientes</button>
        </div>
   ) 
}

export default Home;