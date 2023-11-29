import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, closeModal}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {closeModal ? <button className="Head-button" onClick={() => closeModal()}>Закрыть</button> : null}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  closeModal: PropTypes.func,
};

export default React.memo(Head);
