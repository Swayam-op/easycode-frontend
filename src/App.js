// import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SIgnup from './Pages/SIgnup';
import Navbar from './Components/Navbar';
import Signin from './Pages/Signin';
import Problems from './Pages/Problems';
import Editor from './Pages/Editor';
function App() {
  return (
    <div className='bg-black relative min-h-screen'>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<>welcome</>}/>
        <Route path='/problems' element={<Problems/>}/>
        <Route path='/explore' element={<Navbar/>}/>
        <Route path='/interview' element={<>interview</>}/>
        <Route path='/discuss' element={<>discuss</>}/>
        <Route path='/signup' element={<SIgnup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/editor/:pid' element={<Editor/>}/>
      </Routes>
    </div>
  );
}

export default App;
