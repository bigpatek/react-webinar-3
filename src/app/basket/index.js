import {memo, useCallback} from 'react';
import ItemBasket from "../../components/item-basket";
import List from "../../components/list";
import ModalLayout from "../../components/modal-layout";
import BasketTotal from "../../components/basket-total";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";

function Basket() {

  const store = useStore();

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  const translations = {
    ru: {
      cart: 'Корзина',
    },
    en: {
      cart: 'Cart',
    }
  }

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  }

  const renders = {
    itemBasket: useCallback((item) => {
      return <ItemBasket item={item} onRemove={callbacks.removeFromBasket} lang={select.lang}/>
    }, [callbacks.removeFromBasket, select.lang]),
  };

  return (
    <ModalLayout title={translations[select.lang].cart} onClose={callbacks.closeModal} lang={select.lang}>
      <List list={select.list} renderItem={renders.itemBasket}/>
      <BasketTotal sum={select.sum} lang={select.lang}/>
    </ModalLayout>
  );
}

export default memo(Basket);
