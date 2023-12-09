import {useCallback, useContext, useEffect, useState} from 'react';
import Main from "./main";
import Product from './product';
import Basket from "./basket";
import useSelector from "../store/use-selector";
import { Route, Routes, useLocation } from 'react-router-dom';
import useStore from '../store/use-store';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const store = useStore();

  const activeModal = useSelector(state => state.modals.name);

  const location = useLocation();
  
  useEffect(() => {
     store.actions.modals.close();
  }, [location.pathname]); 

  return (
    <>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/product/:id?' element={<Product />} /> 
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
