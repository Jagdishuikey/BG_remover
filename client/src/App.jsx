import React from 'react'
import { Routes,Route } from 'react-router-dom'
import BuyCredit from './pages/BuyCredit.jsx'
import Result from './pages/Result.jsx'
import Home from './pages/Home.jsx'
import Navbar from './componenets/Navbar.jsx'
import Footer from './componenets/Footer.jsx'


const App = () => {
  return (
    <>
    <div className='min-h-screen bg-slate-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/credit' element={<BuyCredit/>}/>
      </Routes>
      <Footer/>
      
    </div>
    </>
  )
}

export default App
