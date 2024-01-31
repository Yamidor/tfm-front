import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {userService} from "../services/UserService"
import { asignacionService} from '../services/AsignacionService'
import { actividadService} from '../services/ActividadService'
import Swal from 'sweetalert2'
import {
  faEdit,
  faTrash,
  faTasks,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [actividades, setActividades] = useState([]);
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

  const getStudents = async ()=>{
    await asignacionService.getAll().then(setAsignaciones);
    await userService.getStudents().then(setEstudiantes);
  }
  useEffect(() => {
    getStudents()
  }, [])
  const saveStudent = async (data)=>{
    await userService.postStudent(data)
  }
  const createAsignacion = async (usuarioId, actividadId)=>{
    const data ={
      "usuarioId": usuarioId,
      "actividadId": actividadId
    }
    const reponse = await asignacionService.create(data)
    if(reponse){
      await Toast.fire({
        icon: "success",
        title: "actividades asignadas",
      });
    }else{
      await Toast.fire({
        icon: "error",
        title: "No se puedo asisgnar las actividades",
      });
    }
    
  }
  const asignar = async (id)=>{
    await actividadService.getAll().then(setActividades)
    actividades.map(async(actividad)=>{
      await createAsignacion(id, actividad.id)
    })
    getStudents()
  }
  const formEstudiante = () => {
    Swal.fire({
      title: "Registrar Estudiante",
      html: `<div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
                <div class="mb-4">
                    <label
                    for="nombres"
                    class="block text-gray-600 text-sm font-medium mb-2"
                    >
                    Nombres
                    </label>
                    <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    placeholder="Digita primer nombre primer apellido"
                    class="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label
                    for="dni"
                    class="block text-gray-600 text-sm font-medium mb-2"
                    >
                    Documento
                    </label>
                    <input
                    type="text"
                    id="dni"
                    name="dni"
                    placeholder="Digita documento"
                    class="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div class="mb-4">
                    <label
                    for="usuario"
                    class="block text-gray-600 text-sm font-medium mb-2"
                    >
                    Usuario
                    </label>
                    <input
                    type="text"
                    id="user"
                    name="user"
                    placeholder="Digita primer nombre"
                    class="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>`,
      confirmButtonText: "Registrar",
      allowOutsideClick: false,
      preConfirm: () => {
        const nombres = Swal.getPopup().querySelector("#nombres").value;
        const dni = Swal.getPopup().querySelector("#dni").value;
        const user = Swal.getPopup().querySelector("#user").value;
        return {
            nombres,
            dni,
            user
        };
      },
    }).then(async (e) => {
      if (e.isConfirmed) {
        if (e.value.nombres && e.value.dni && e.value.user) {
          try {
            await saveStudent(e.value)
            await getStudents()
            Toast.fire({
              icon: "success",
              title: "Estudiante registrado.",
            });
          } catch (error) {
            Toast.fire({
              icon: "error",
              title: "No se Resgitar estudiante",
            });
          }
        } else {
          await Toast.fire({
            icon: "error",
            title: "Debes ingresar todos los campos",
          });
          // Mantener el modal abierto
          formEstudiante();
        }
      }
    });
  };
  return (
    <>
      <div className="container mx-auto mt-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-4" onClick={()=>formEstudiante()}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Estudiante
        </button>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border bg-gray-200 px-4 py-2">Nombres</th>
              <th className="border bg-gray-200 px-4 py-2">Documento</th>
              <th className="border bg-gray-200 px-4 py-2">Usuario</th>
              <th className="border bg-gray-200 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td className="border px-4 py-2">{estudiante.nombres}</td>
                <td className="border px-4 py-2">{estudiante.dni}</td>
                <td className="border px-4 py-2">{estudiante.user}</td>
                <td className="border px-4 py-2">
                  <button className="mr-2 text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="mr-2 text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  {!asignaciones.some((asignacion) => asignacion.usuarioId === estudiante.id) && (
                    <button className="text-green-500 hover:text-green-700" onClick={()=>asignar(estudiante.id)}>
                      <FontAwesomeIcon icon={faTasks} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Estudiantes;
