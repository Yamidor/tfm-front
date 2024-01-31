import React, { useState, useEffect } from 'react'
import CodeEditor from '../components/CodeEditor';
import { asignacionService } from '../services/AsignacionService';
import Swal from 'sweetalert2'

const UnidadII = ()=>{
    const [asignaciones, setAsignaciones] = useState([])
    const [data, setData] = useState({})
    const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
    const [madeStates, setMadeStates] = useState({});
    const [asignacionId, setAsignacionId] = useState('');
    const id_user = localStorage.getItem('user')
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    const fetchAssignments = async()=>{
        await asignacionService.getActivitesByUserId(id_user).then(setAsignaciones);
    }
    useEffect(()=>{
        fetchAssignments();
    }, [])

    const updateAsignacion = ()=>{
        const currentActivity = asignaciones[currentActivityIndex];
        if (currentActivity) {
            setAsignacionId(currentActivity.id);
        }
    }
    const saveAsignacion = async ()=>{
        if(data.contenido){
            await asignacionService.updateAsignacionById(
                asignacionId,
                data.estado,
                data.contenido
            )
            Toast.fire({
                icon: 'success',
                title: 'Actividad enviada',
            });

            await fetchAssignments()
            location.reload();
            
        }

    }
    useEffect(async()=>{
        await saveAsignacion()
        fetchAssignments()
    }, [data])

    useEffect(() => {
        updateAsignacion()
    }, [currentActivityIndex, asignaciones]);

    const handleNavigateToActivity = (index) => {
        setCurrentActivityIndex(index);
    };
    const handleToggleTask = (actividadId, taskId) => {
        // Obtén el estado actual de 'made'
        const currentMadeState = madeStates[taskId] || false;
    
        // Actualiza el estado local 'made' con el valor contrario
        setMadeStates(prevStates => ({
            ...prevStates,
            [taskId]: !currentMadeState,
        }));
    };

    
    return(
        <>
        <div className="flex">
            <div className='w-1/3 bg-gray-300 p-4'>
            {asignaciones.map((asignacion,index) => (
                    asignacion.Actividad.unidad === "UNIDADII" &&
                    <div key={asignacion.Actividad.id} className={`${index === currentActivityIndex ? 'block' : 'hidden'}`}>
                        <h1 className='text-2xl font-bold mb-4 text-gray-800'>{asignacion.Actividad.nombre}</h1>
                        <h2 className='text-xl font-semibold mb-3 text-gray-700 text-left'>Problema</h2>
                        <p className='text-left text-xs'>
                            {asignacion.Actividad.problema}
                        </p>
                        <h2 className='text-xl font-semibold mb-3 text-gray-700 text-left'>Tareas</h2>
                        <ol className="text-xs list-decimal text-left pl-4">
                            {asignacion.Actividad.Tareas.map(tack =>{ 
                                const made = madeStates[tack.id] || false;
                                return(
                                    <li className={made ? 'bg-green-500 rounded-lg p-2 mb-2' : 'bg-white rounded-lg p-2 mb-2'} key={tack.id} onClick={() => handleToggleTask(asignacion.Actividad.id, tack.id)}>
                                        {made ? '✔' : '❌'} {tack.nombre}
                                    </li>
                                )
                            }
                            )}
                        </ol>
                    
                    </div>
                    
            ))}
            </div>
            <div className="w-2/3 bg-gray-500 p-4">
                <div className="mb-4">
                    {asignaciones.map((asignacion, index) => (
                    asignacion.Actividad.unidad === "UNIDADII" && (
                    <button
                        key={index}
                        className={`rounded-full h-8 w-8 bg-blue-400 text-white mx-1 ${index === currentActivityIndex ? 'bg-blue-700 font-bold' : ''}`}
                        onClick={() => handleNavigateToActivity(index)}
                    >
                        {asignacion.Actividad.orden}
                    </button>
                    )
                    ))}
                </div>
                
                <div>
                    <h2 className='text-xl'>Manos a la obra</h2>
                    <CodeEditor  setData={setData} /> 
                </div>
               
            </div>
        </div>
        
        </>
        
    )
}
export default UnidadII