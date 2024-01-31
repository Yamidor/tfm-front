import React, { useState, useEffect } from "react";
import { asignacionService } from "../services/AsignacionService";
const Calificaciones = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const id_user = localStorage.getItem('user')

  const fetchAssignments = async () => {
    await asignacionService.getCalificacionesByUser(id_user).then(setAsignaciones);
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex flex-wrap">
          {asignaciones.map((asignacion) => (
            <div key={asignacion.id} className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-4">
              <div className="bg-blue-600 text-white rounded-t-md px-4 py-2 mb-2 w-full">
               #{asignacion.Actividad.orden} {asignacion.Actividad.nombre}
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-700 text-base">
                  {asignacion.Actividad.problema}
                </p>
                <p className="text-gray-700 text-base">
                  Unidad: {asignacion.Actividad.unidad}
                </p>
                <p className="text-gray-700 text-base mt-2">Calificación: {asignacion.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Calificaciones;
