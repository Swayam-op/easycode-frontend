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
      <Navbar/>
      <Routes>
      
        <Route exact path='/' element={<>welcome</>}/>
        <Route exact path='/problems' element={<Problems/>}/>
        <Route exact path='/explore' element={<Navbar/>}/>
        <Route exact path='/interview' element={<>interview</>}/>
        <Route exact path='/discuss' element={<>discuss</>}/>
        <Route exact path='/signup' element={<SIgnup/>}/>
        <Route  path='/signin' element={<Signin/>}/>
        <Route  path='/signin/team' element={<Signin/>}/>
    

        <Route exact path='/editor/:pid' element={<Editor/>}/>
        <Route path='*' element={<div className='text-white'>Error</div>}/>
      </Routes>
    </div>
  );
}

export default App;
