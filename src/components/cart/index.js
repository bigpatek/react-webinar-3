import React from "react";
import { cn } from '@bem-react/classname';
import PropTypes from "prop-types";
import Head from "../head";
import List from "../list";
import "style.css";

const Cart = (props) => {
    const cart = cn('cart');
    return(
        <>
            <Head title={"Корзина"} closeModal={props.closeModal}/>
            <div className={cart('list')}>
                 <List list={props.cart} onDeleteItem={props.deleteItem} isModal={props.visible}/>
            </div>
            <div className={props.amountOfProducts ? cart('total_amount') : ''}>
                {props.amountOfProducts ? <><span>Итого</span><span>{ `${props.amountOfMoney}`}</span></> : <div className={cart('cart_empty')}><p>Корзина пуста</p></div>}
            </div>
        </>
    )
}

Cart.propTypes = {
    cart: PropTypes.array,
    deleteItem: PropTypes.func,
    visible: PropTypes.bool,
    amountOfMoney: PropTypes.string,
    amountOfProducts: PropTypes.number,
    closeModal: PropTypes.func
};

Cart.defaultProps = {
    setVisible: () => {
    },
    deleteItem:() => {
    },
};

export default Cart;