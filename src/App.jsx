import { useState } from 'react'
import Header from './containers/Header'
import Nav from './containers/Nav'
import Main from './containers/Main'
import Footer from './containers/Footer'

import './App.css'

function App() {


  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Nav/>
      <Main/>
      <Footer/>
    </div>
  )
}

export default App
