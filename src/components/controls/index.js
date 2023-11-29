import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpen}) {
  return (
    <div className='Controls'>
      <button onClick={() => onOpen()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: PropTypes.func
};

Controls.defaultProps = {
  onOpen: () => {}
}

export default React.memo(Controls);
