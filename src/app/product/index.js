import React, {useCallback, useEffect, useState}from "react";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/page-layout";
import BasketTool from "../../components/basket-tool";
import Head from "../../components/head";
import ProductDescription from "../../components/product-description";
import Loader from "../../components/loader";
import "style.css"

const Product = () => {

    const params = useParams();
    const store = useStore();
    const [isLoading, setIsLoading] = useState(true);
  
    const select = useSelector((state) => ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      lang: state.language.lang,
      page: state.catalog.page,
      limit: state.catalog.limit,
      totalPages: state.catalog.totalPages,
      title: state.product.title,
      description: state.product.description,
      price: state.product.price,
      edition: state.product.edition,
      madeIn: state.product.madeIn,
      category: state.product.category
    }));

    const callbacks = {
      addToBasket: useCallback(
        (_id) => store.actions.basket.addToBasket(_id),
        [store]
      ),
      openModalBasket: useCallback(
        () => store.actions.modals.open("basket"),
        [store]
      ),
      changeLanguage: useCallback(() => store.actions.language.toggleLanguage(), 
      [store]),
    };

      useEffect(() => {
        const page = +localStorage.getItem('page');
        store.actions.catalog.getAllProducts(page);
    }, []);
  
    useEffect(() => {  
      setIsLoading(true);
      store.actions.product.getProduct(params.id, setIsLoading);
    }, [select.lang, params.id]);
    

    const translations = {
      ru: {
        button: 'Добавить'
      },
      en: {
        button: 'Add'
      }
    }

    return (
        <PageLayout>
            <Head title={select.title} changeLang={callbacks.changeLanguage} lang={select.lang}/>
            <BasketTool 
                onOpen={callbacks.openModalBasket}
                amount={select.amount}
                sum={select.sum} 
                lang={select.lang}
            />
            {isLoading ? 
                        <Loader />
                       : 
                        <ProductDescription addButton={<button className={'product-btn'} onClick={() => callbacks.addToBasket(params.id)}>{translations[select.lang].button}</button>}
                        price={select.price} category={select.category} madeIn={select.madeIn} 
                        description={select.description} edition={select.edition} lang={select.lang}/>
            }
            </PageLayout>
    )
        
}

export default Product;