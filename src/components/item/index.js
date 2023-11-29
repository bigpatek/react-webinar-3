import React, {useState} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item(props) {

  const callbacks = {

    onSelect: (e) => {
      e.stopPropagation();
      props.onSelect(props.item.code);
    },

    onDelete: (e) => {
      e.stopPropagation();
      props.onDelete(props.item.code);

    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className="Item-description">
        <div className="Item-price">
          {`${props.item.price} ₽`}
        </div>
        {props.item.selected 
        ? <div className='Item-selected'>
          {`${props.item.selected} шт`}
        </div>
        : ''
        }
      <div className='Item-actions'>
        {props.isModal ? <button onClick={e => callbacks.onDelete(e)}>
          Удалить
        </button> : <button onClick={e => callbacks.onSelect(e)}>
          Добавить
        </button>}
      </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.number
  }).isRequired,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  isModal: PropTypes.bool
};

Item.defaultProps = {
  onSelect: () => {
  },
  onDelete: () => {
  },
}

export default React.memo(Item);
