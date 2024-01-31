import React, { useState, useEffect } from 'react'
import Header from './Header'
import Login from '../components/Login'
import Nav from './Nav'
import Main from './Main'
import Footer from './Footer'
import '../index.css'

const Layout = ()=>{
    const [idUser, setIdUser] = useState(null)
    const [rol, setRol] = useState(null)
    useEffect(() => {
        setIdUser(localStorage.getItem('user'))
    }, [idUser])
    return(
        <div className="flex flex-col min-h-screen">
            {idUser?
            <>
            <Header/>
            <Nav setIdUser={setIdUser} rol={rol}/>
            <Main/>
            <Footer/>
            </>
            :
            <Login setIdUser={setIdUser} setRol={setRol} />
            } 
        </div>
    )
}
export default Layout