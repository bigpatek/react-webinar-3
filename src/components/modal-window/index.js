import React from "react";
import { cn } from '@bem-react/classname';
import PropTypes from "prop-types";
import "./style.css"
import Head from "../head";
import List from "../list";

const ModalWindow = ({cart, deleteItem, visible, setVisible, amountOfMoney, amountOfProducts}) => {
    
    const myModal = cn('myModal');

    const closeModal = () => {
        setVisible(false);
    };

    return (
        <div className={visible ? myModal({active: true}) : myModal()}>
            <div className={myModal('content')}>
                <Head title={"Корзина"} closeModal={closeModal}/>
                <div className={myModal('list')}>
                    <List list={cart} onDeleteItem={deleteItem} isModal={visible}/>
                </div>
                <div className={amountOfProducts ? myModal('total_amount') : ''}>
                    {amountOfProducts ? <><span>Итого</span><span>{ `${amountOfMoney} ₽`}</span></> : <div className={myModal('cart_empty')}><p>Корзина пуста</p></div>}
                </div>
            </div>
        </div>
    )
};

ModalWindow.propTypes = {
    cart: PropTypes.array,
    deleteItem: PropTypes.func,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    amountOfMoney: PropTypes.number,
    amountOfProducts: PropTypes.number
};

ModalWindow.defaultProps = {
    setVisible: () => {
    },
    deleteItem:() => {
    },
};

export default ModalWindow;