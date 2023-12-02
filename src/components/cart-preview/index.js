import React from "react";
import PropTypes from "prop-types";
import Controls from "../controls";
import { plural } from "../../utils";
import "style.css";

const CartPreview = ({amountOfMoney, amountOfProducts, setModal}) => {
    return (
        <div className='CartPreview'>
            <div className="CartPreview-text">В корзине: {!amountOfProducts ? <b>{' пусто'}</b> :  <b>{` ${amountOfProducts} ${plural(amountOfProducts, {one: 'товар', few: 'товара', many: 'товаров'})} / ${amountOfMoney}`}</b>}</div>
            <Controls onOpen={() => setModal(true)} />
        </div>
    )
}

CartPreview.propTypes = {
    setModal: PropTypes.func,
    amountOfMoney: PropTypes.string,
    amountOfProducts: PropTypes.number
}

CartPreview.defaultProps = {
    setModal: () => {
    },
  }

export default CartPreview;