import {memo, useCallback, useEffect, useState} from 'react';
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import MainMenu from '../../components/main-menu';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/loader';

function Main() {

  const store = useStore();
  const location = useLocation();
  const [pagesArray, setPagesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const select = useSelector(state => ({
    list: state.catalog.list,
    page: state.catalog.page,
    limit: state.catalog.limit,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.language.lang
  }));

  useEffect(() => {
    store.actions.catalog.getAllProducts();
    store.actions.catalog.getTotalCount();
    setIsLoading(false)
  }, [select.page, select.lang]);

  useEffect(() => {
    store.actions.catalog.getPagesArray(setPagesArray)
  }, [select.totalPages])

  useEffect(() => {
      localStorage.setItem('page', select.page);
  },[select.list]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Смена страницы
    changePage: useCallback(p => store.actions.catalog.changePage(p), [store]),
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
      {isLoading 
        ? 
          <Loader /> 
        : 
          <MainMenu title={translations[select.lang].title} changeLang={callbacks.changeLanguage} lang={select.lang} 
      onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} list={select.list} renderItem={renders.item}
      changePage={callbacks.changePage} activePage={select.page} firstPage={pagesArray[0]} lastPage={pagesArray.length} />
      }
    </PageLayout>

  );
}

export default memo(Main);
