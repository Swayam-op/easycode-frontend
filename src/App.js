// import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SIgnup from './Pages/SIgnup';
import Navbar from './Components/Navbar';
import Signin from './Pages/Signin';
import Problems from './Pages/Problems';
import Editor from './Pages/Editor';
import { useDispatch } from 'react-redux';
import { setLogin, setLogout } from './Redux/Reducers/UserReducer';
import { getAccessToken } from './Services/storage';
import NotAuthenticated from './Hooks/NotAuthenticated';

function App() {
  const dispatch = useDispatch();
  const accesstoken = getAccessToken();

  if (accesstoken) {
    dispatch(setLogin());
  }
  else {
    dispatch(setLogout());
  }

  return (
    <div className='bg-black relative min-h-screen'>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<>welcome</>} />
        <Route exact path='/problems' element={<Problems />} />
        <Route exact path='/explore' element={<>explore</>} />
        <Route exact path='/interview' element={<>interview</>} />
        <Route exact path='/discuss' element={<>discuss</>} />
        
        <Route exact path='/editor/:pid' element={<Editor />} />
        <Route path='*' element={<div className='text-white'>Error</div>} />
        <Route path='/' element={<NotAuthenticated/>}>
        <Route  path='signup' element={<SIgnup />} />
        <Route  path='signin' element={<Signin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
