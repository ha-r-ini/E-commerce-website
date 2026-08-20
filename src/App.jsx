import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import Allroutes from './routes/AllRoutes'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <main>
        <Allroutes />
      </main>
      <Footer />
    </>
  )
}

export default App
