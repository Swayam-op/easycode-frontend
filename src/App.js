// import logo from './logo.svg';
import './App.css';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import SIgnup from './Pages/SIgnup';
import Signin from './Pages/Signin';
import Problems from './Pages/Problems';
import Editor from './Pages/Editor';
import { useDispatch, useSelector } from 'react-redux';
import NotAuthenticated from './Hooks/NotAuthenticated';
import Loading from './Pages/Loading';
import { ToastContainer } from 'react-toastify';
import HomeLayout from './Pages/HomeLayout';
import Authenticated from './Hooks/Authenticated';
import { isUserAuthenticatedThunk, SelectIsAuthenticated } from './Redux/Reducers/AuthReducer';
import Profile from './Pages/Profile';
import WriteSolution from './Pages/WriteSolution';
import ShowSolution from './Components/Modal/ShowSolution';
import { useEffect } from 'react';
import Discussion from './Pages/Discussion';
import DiscussionChat from './Pages/DiscussionChat';
import { Home } from './Pages/Home';
import Interview from './Pages/Interview';
import Error from './Pages/Error';


function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(SelectIsAuthenticated);

  useEffect(()=>{
    if(isAuthenticated === null){
      //console.log("what is going on");
      dispatch(isUserAuthenticatedThunk());
    }
    // 
  }, [isAuthenticated, dispatch])
    



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
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/problems' element={<Problems />} />
          <Route exact path='/explore' element={<Home/>} />
          <Route exact path='/interview' element={<Interview/>} />
          <Route exact path='/discuss' element={<Discussion/>} />
          
        </Route>

        <Route path='/' element={<Authenticated />}>
        <Route path='/' element={<HomeLayout />}>
        <Route path='/profile' element={<Profile/>} />
        </Route>
        <Route path='/problems/:id' element={<Editor />} />
        <Route path='/problems/:id/write-solution' element={<WriteSolution/>} />
          <Route path='/problems/:id/solution/:solutionId' element={<ShowSolution/>} />
        <Route exact path='/discuss/chat/:roomId' element={<DiscussionChat/>} />
        </Route>
        
        <Route path='*' element={<Error/>} />
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
