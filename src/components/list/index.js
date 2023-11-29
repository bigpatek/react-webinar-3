import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, onDeleteItem, onSelectItem, isModal}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onSelect={onSelectItem} onDelete={onDeleteItem} isModal={isModal}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
  isModal: PropTypes.bool
};

List.defaultProps = {
  onSelectItem: () => {
  },
  onDeleteItem: () => {
  }
}

export default React.memo(List);
