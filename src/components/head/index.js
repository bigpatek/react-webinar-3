import React from "react";
import {cn} from "@bem-react/classname"
import PropTypes from "prop-types";
import './style.css';

function Head({title, closeModal}) {
  const Head = cn('Head')
  return (
    <div className={closeModal ? Head({modal: true}) : Head()}>
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
