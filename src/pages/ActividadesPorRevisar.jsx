import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { asignacionService } from '../services/AsignacionService';
import { useNavigate } from "react-router-dom";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
const ActividadesPorRevisar = ()=>{
    const [actividadesPorRevisar, setActividadesPorRevisar] = useState([])
    const navigate = useNavigate();
    const fetchActividades = async()=>{
        await asignacionService.getActivitesByRevisar().then(setActividadesPorRevisar);
        console.log(actividadesPorRevisar)
    }
    useEffect(()=>{
        fetchActividades();
    }, [])
    const calificar =(id,contenido)=>{
        localStorage.setItem('contenido',contenido)
        localStorage.setItem('idAsignacion',id)
        //window.parent.postMessage({ type: 'calificar', code: contenido}, '*');
        return navigate("/calificar")
    }
    return(
        <>
        <div className="container mx-auto mt-8">
            <table className="min-w-full border border-gray-300 mb-4">
                <thead>
                <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-r">Nombre Estudiante</th>
                    <th className="py-2 px-4 border-r">Nombre Actividad</th>
                    <th className="py-2 px-4 border-r">Unidad</th>
                    <th className="py-2 px-4">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {actividadesPorRevisar.map((actividad, index) => (
                    <tr key={index} className="border-b border-gray-300">
                    <td className="py-2 px-4 border-r">{actividad.Usuario.nombres}</td>
                    <td className="py-2 px-4 border-r">{actividad.Actividad.nombre}</td>
                    <td className="py-2 px-4 border-r">{actividad.Actividad.unidad}</td>
                    <td className="py-2 px-4">
                        <button onClick={()=>calificar(actividad.id, actividad.contenido)} className='bg-blue-600 p-2 rounded-md text-white hover:bg-blue-800  '>Calificar <FontAwesomeIcon icon={faPencil }/> </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    )

}

export default ActividadesPorRevisar