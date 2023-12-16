import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import useSelector from "../hooks/use-selector";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from './login';
import Profile from './profile';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: state.session.isAuth,
    isWaiting: state.session.isWaiting,
    token: state.session.x_token
  }));

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    store.actions.session.getProfile();
  }, [])

  useEffect(() => {
    store.actions.profile.getProfile();
  },[select.token]) 


  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        {select.isAuth 
              ? 
              <>
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/login'} element={<Navigate to='/profile' element={<Profile />} />} />
              </>
              :
              <>
                <Route path={'/profile'} element={select.isWaiting ? <Profile/> : <Navigate to='/login' element={<Login />} />} />
                <Route path={'/login'} element={<Login/>} />
              </>
        } 
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
