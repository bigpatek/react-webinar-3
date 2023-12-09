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

    const [info, setInfo] = useState({
      title: "",
      description: "",
      madeIn: "",
      price: "",
      edition: "",
      category: "",
    });
  
    const select = useSelector((state) => ({
      list: state.catalog.list,
      amount: state.basket.amount,
      sum: state.basket.sum,
      lang: state.language.lang,
      page: state.catalog.page,
      limit: state.catalog.limit,
      totalPages: state.catalog.totalPages
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
      const getProductEffect = async () => {
        const responce =  await fetch(`/api/v1/articles/${params.id}?fields=*,madeIn(title,code),category(title)&lang=${select.lang}`);
        const json = await responce.json();
        const {
            result: { title, description, price, edition, madeIn, category },
          } = json;
        setInfo((prev) => ({
          ...prev,
          title,
          description,
          price,
          edition,
          madeIn: madeIn.title,
          category: category.title,
        }));
        setIsLoading(false);
        
      };
  
      setIsLoading(true);
      getProductEffect();
      
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
            <Head title={info.title} changeLang={callbacks.changeLanguage} lang={select.lang}/>
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
                        price={info.price} category={info.category} madeIn={info.madeIn} 
                        description={info.description} edition={info.edition} lang={select.lang}/>
            }
            </PageLayout>
    )
        
}

export default Product;