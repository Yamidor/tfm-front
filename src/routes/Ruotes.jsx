import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
  } from "react-router-dom";
import Layout from "../containers/Layout";
import Home from "../pages/Home"
import UnidadI from "../pages/UnidadI";
import UnidadII from "../pages/UnidadII";
import UnidadIII from "../pages/UnidadIII";
import UnidadIV from "../pages/UnidadIV";
import ActividadesPorRevisar from "../pages/ActividadesPorRevisar";
import Calificar from "../pages/Calificar";
import Calificaciones from "../pages/Calificaciones";
import Estudiantes from "../pages/Estudiantes";

  
  const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='unidadI' element={<UnidadI/>}/>
            <Route path='unidadII' element={<UnidadII/>}/>
            <Route path='unidadIII' element={<UnidadIII/>}/>
            <Route path='unidadIV' element={<UnidadIV/>}/>
            <Route path='ActividadesPorRevisar' element={<ActividadesPorRevisar/>}/>
            <Route path='calificar' element={<Calificar/>}/>
            <Route path='calificaciones' element={<Calificaciones/>}/>
            <Route path='estudiantes' element={<Estudiantes/>}/>
        </Route>
    )
  )

export default Router