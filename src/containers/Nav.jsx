import React from 'react';
import Swal from 'sweetalert2'
import { NavLink, Outlet} from "react-router-dom";

const Nav = (proms) => {
  const{setIdUser, rol} = proms
  const userName = localStorage.getItem('userName')
  const estado = localStorage.getItem('rol')
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
  const close = ()=>{
    window.location.href = "/";
    localStorage.removeItem('user');
    localStorage.removeItem('userName');
    localStorage.removeItem('Data');
    localStorage.removeItem('contenido');
    setIdUser(null)
    Toast.fire({
        icon: 'success',
        title: 'Cerrando sistema'
    });
    
  }

  return (
    <nav className="bg-blue-400 p-4">
      <ul className="flex justify-center space-x-4">
      {estado === 'ESTUDIANTE' ?(
        <>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/">Inicio</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/unidadI">Unidad I</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/unidadII">Unidad II</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/unidadIII">Unidad III</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/unidadIV">Unidad IV</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/calificaciones">Calificaciones</NavLink></li>
        </>
        ):(
        <>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/">Inicio</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/ActividadesPorRevisar">Actividades por revisar</NavLink></li>
        <li><NavLink className="bg-blue-400 p-2 inline-block hover:bg-blue-600 hover:border border border-blue-400 rounded-md transform hover:scale-105 transition-transform duration-300 hover:text-white" to="/estudiantes">Estudiantes</NavLink></li>
        </>
        )
        }
        <div className="flex items-center">
            <span className="text-white mr-4">{userName}</span>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={()=>close()}
            >
              Cerrar sesión
            </button>
        </div>
      </ul>
      
    </nav>
  );
};

export default Nav;
