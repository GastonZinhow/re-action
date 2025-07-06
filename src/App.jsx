import { useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar/>
      <MainPage/>
      <Footer/>
    </>
  )
}

export default App
