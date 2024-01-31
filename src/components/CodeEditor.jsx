import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { asignacionService } from '../services/AsignacionService';
import Swal from 'sweetalert2'


const CodeEditor = ({setData}) => {
  const navigate = useNavigate();
  const updateFeedback = async(id, feedback)=>{
    await asignacionService.updateFeedbackById(id,feedback)
  }
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
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'sendCode') {
        const data = {
          estado: true,
          contenido: event.data.code,
        };
        setData(data)
      } else if (event.data && event.data.type === 'error') {
        Toast.fire({
          icon: 'error',
          title: 'Debes digitar algo en el editor',
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  useEffect(() => {
    const handleCalificar = async (event) => {
      if (event.data && event.data.type === 'calificarCode') {
        formCalificar()
      } 
    };

    window.addEventListener('message', handleCalificar);
    return () => {
      window.removeEventListener('message', handleCalificar);
    };
  }, []);

  const formCalificar = ()=>{
    Swal.fire({
      title: "Registrar calificación",
      html: `<div class="max-w-2xl mx-auto">
              <textarea id="feedback" name="feedback" rows="4" class="w-full border rounded-md p-2 mt-1"></textarea>
            </div>`,
      confirmButtonText: 'Guardar',
      allowOutsideClick: false,
      preConfirm:() => {
        const feedback = Swal.getPopup().querySelector('#feedback').value;
        return feedback
      }
    }).then(async(e)=>{
      if (e.isConfirmed) {
        if (e.value) {
          try {
            const idAsisgnacion = localStorage.getItem("idAsignacion")
            updateFeedback(idAsisgnacion, e.value)
            Toast.fire({
              icon: 'success',
              title: 'La calificación ha sido enviada...'
            });
            localStorage.removeItem("idAsisgnacion");
            localStorage.removeItem("contenido");
            return navigate("/ActividadesPorRevisar")
          } catch (error) {
            Toast.fire({
              icon: 'error',
              title: 'No se pudo enviar'
            });
          }
        } else {
          await Toast.fire({
            icon: 'error',
            title: 'Debes agregar una calificación'
          });
          // Mantener el modal abierto
          formCalificar();
        }
      }
    })
  }
  return (
    <>
      <iframe
        className='w-full'
        src="tutorial-intro-ace/index.html"
        title="Tu Proyecto HTML"
        width="600"
        height="400"
      />
    </>
  )
};

export default CodeEditor;
