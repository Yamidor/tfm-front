
import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { authService } from '../services/AuthService';

const Login = (proms) => {
  const{setIdUser, setRol} = proms
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
  const [datosLogin, setDatosLogin] = useState({
    user: "",
    password: ""
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosLogin((prevState) => {
    return {
      ...prevState,
      [name]: value,
    };
    });
  }
  const handleLogin = async() => {
    try {
        Toast.fire({
          icon: 'success',
          title: 'Bienvenido'
        });
        const response = await authService.postLogin(datosLogin.user, datosLogin.password)
        localStorage.setItem('user', response.id);
        localStorage.setItem('rol', response.rol)
        setRol(response.rol)
        setIdUser(localStorage.setItem('user', response.id))
        localStorage.setItem('userName', response.nombres);
        
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: 'El usuario no existe'
        });
        
      }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Iniciar sesión</h2>
        <form>
          <div className="mb-4">
            <label  className="block text-gray-700 text-sm font-bold mb-2">
              Usuario
            </label>
            <input
              type="text"
              name='user'
              id="user"
              className="w-full p-2 border rounded"
              placeholder="Tu usuario"
              onChange={handleChange} 
            />
          </div>
          <div className="mb-4">
            <label  className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name='password'
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Tu contraseña"
              onChange={handleChange} 
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;