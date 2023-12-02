import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalWindow from './components/modal-window';
import CartPreview from './components/cart-preview';
import Cart from './components/cart';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({store}) {

  const [isModal, setIsModal] = useState(false);

  const list = store.getState().list;
  const cart = store.getState().cart;

  const callbacks = {
    onSelectItem: useCallback((code) => {
      store.addItem(code);
    }, [store]),

    onDeleteItem: useCallback((code) => {
      store.deleteItem(code);
    }, [store]),

    openOrCloseModal: useCallback(() => {
      setIsModal(!isModal)
    }, [isModal]),
  }

  let amountOfMoney = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(store.amountOfMoney);
  let amountOfProducts = store.amountOfProducts;

  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartPreview setModal = {callbacks.openOrCloseModal}  amountOfProducts={cart.length} amountOfMoney={amountOfMoney}/>
      <ModalWindow visible={isModal}>
        <Cart cart={cart} deleteItem={callbacks.onDeleteItem}  visible={isModal} amountOfMoney={amountOfMoney} amountOfProducts={amountOfProducts} closeModal={callbacks.openOrCloseModal}/>
      </ModalWindow>
      <List list={list} isModal={isModal}
            onSelectItem={callbacks.onSelectItem}
            />
    </PageLayout>
  );
}

export default App;
