import './App.css'
import LandingPage  from './components/LandingPage/index'
import {Route, Routes} from "react-router-dom";
import Navbar from './components/LandingPage/Navbar';

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
    </Routes>
    </>
  )
}

export default App;