import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from '../../components/pagination';

function Main() {

  const store = useStore();

  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pagesArray, setPagesArray] = useState([]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  useEffect(() => {
    store.actions.catalog.getAllProducts(page, limit, select.lang);
    store.actions.catalog.getTotalCount(setTotalPages, limit);
  }, [page, select.lang]);

  useEffect(() => {
    store.actions.catalog.getPagesArray(totalPages, setPagesArray)
  }, [totalPages])

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changePage: useCallback(p => setPage(p), [store]),
    // Смена языка
    changeLanguage: useCallback(() => store.actions.language.toggleLanguage(), [store]),
  }

  const renders = {
    item: useCallback((item) => {
      return <Item item={item} onAdd={callbacks.addToBasket} lang={select.lang}/>
    }, [callbacks.addToBasket, select.lang]),
  };

  const translations = {
    ru: {
      title: 'Магазин',
    },
    en: {
      title: 'Store',
    }
  }

  return (
    <PageLayout>
      <Head title={translations[select.lang].title} changeLang={callbacks.changeLanguage} lang={select.lang}/>
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount}
                  sum={select.sum} lang={select.lang}/>
      <List list={select.list} renderItem={renders.item}/>
      <Pagination  changePage={callbacks.changePage} activePage={page} firstPage={pagesArray[0]} lastPage={pagesArray.length}/>
    </PageLayout>

  );
}

export default memo(Main);
