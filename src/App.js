// import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SIgnup from './Pages/SIgnup';
import Signin from './Pages/Signin';
import Problems from './Pages/Problems';
import Editor from './Pages/Editor';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setLogout } from './Redux/Reducers/UserReducer';
import { getAccessToken } from './Services/storage';
import NotAuthenticated from './Hooks/NotAuthenticated';
import Loading from './Pages/Loading';
import { ToastContainer } from 'react-toastify';
import ToastHandler from './Components/ToastHandler';
import HomeLayout from './Pages/HomeLayout';
import Authenticated from './Hooks/Authenticated';
import { isUserAuthenticatedThunk, getIsAuthenticated } from './Redux/Reducers/UserReducer';
import { useEffect, useState } from 'react';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
    if(isAuthenticated === null){
      console.log("what is going on")
      dispatch(isUserAuthenticatedThunk());
    }
    // 



  return (<>
    <div className='bg-black relative min-h-screen'>

      <Loading />
      {/* <ToastHandler/> */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route exact path='/' element={<>welcome</>} />
          <Route exact path='/problems' element={<Problems />} />
          <Route exact path='/explore' element={<>explore</>} />
          <Route exact path='/interview' element={<>interview</>} />
          <Route exact path='/discuss' element={<>discuss</>} />
        </Route>
        <Route path='/' element={<Authenticated />}>
        <Route path='/editor/:questionId' element={<Editor />} />
        </Route>
        
        <Route path='*' element={<div className='text-white'>Error</div>} />
        <Route path='/' element={<NotAuthenticated />}>
          <Route path='signup' element={<SIgnup />} />
          <Route path='signin' element={<Signin />} />
        </Route>
      </Routes>
    </div>
  </>
  );
}

export default App;
