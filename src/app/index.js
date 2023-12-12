import {useCallback, useContext, useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
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
    isAuth: state.profile.isAuth
  }));

  const activeModal = useSelector(state => state.modals.name);

  useEffect(() => {
    store.actions.profile.getProfile();
}, [])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main/>}/>
        <Route path={'/articles/:id'} element={<Article/>}/>
        {select.isAuth 
              ? 
              <>
                <Route path={'/profile'} element={<Profile/>} />
                <Route path={'/login'} element={<Profile/>} />
              </>
              :
              <Route path={'/profile'} element={<Login/>} />}
              <Route path={'/login'} element={<Login/>} />
      </Routes>

      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
