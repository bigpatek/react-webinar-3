import React from "react";
import style from "./style.module.css"
import Head from "../head";
import List from "../list";

const ModalWindow = ({cart, deleteItem, visible, setVisible, amountOfMoney, amountOfProducts}) => {
    
    const rootStyle = [style.myModal];

    if(visible){
        rootStyle.push(style.active)
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <div className={rootStyle.join(" ")} >
            <div className={style.myModalContent} >
                <Head title={"Корзина"} closeModal={closeModal}/>
                <List list={cart} onDeleteItem={deleteItem} isModal={visible}/>
                <div className={amountOfProducts ? style.totalAmount : ''}>
                    {amountOfProducts ? <><span>Итого</span><span>{ `${amountOfMoney} ₽`}</span></> : <div className={style.emptyCart}><p>Корзина пуста</p></div>}
                </div>
            </div>
        </div>
    )
}

export default ModalWindow;