import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({children, onOpen}) {
  return (
    <div className='Controls'>
      <button onClick={() => onOpen()}>{children}</button>
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
