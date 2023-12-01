import React, {useCallback, useMemo, useState} from 'react';
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import ModalWindow from './components/modal-window';
import CartPreview from './components/cart-preview';

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

    openModal: useCallback(() => {
      setIsModal(!isModal)
    }, [isModal])
  }

  const amountOfMoney = useMemo(() => {
      const sum = new Intl.NumberFormat("ru", {style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(store.getAmountOfMoney());
      return sum;
  }, [cart])


  return (
    <PageLayout>
      <Head title='Магазин'/>
      <CartPreview setModal = {callbacks.openModal}  amountOfProducts={cart.length} amountOfMoney={amountOfMoney}/>
      <ModalWindow visible={isModal} setVisible={setIsModal} cart={cart} deleteItem={callbacks.onDeleteItem} amountOfMoney={amountOfMoney} amountOfProducts={cart.length}>
        Привет
      </ModalWindow>
      <List list={list} isModal={isModal}
            onSelectItem={callbacks.onSelectItem}
            />
    </PageLayout>
  );
}

export default App;
