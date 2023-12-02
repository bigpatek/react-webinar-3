import React from "react";
import { cn } from '@bem-react/classname';
import PropTypes from "prop-types";
import "./style.css"

const ModalWindow = ({children, visible}) => {
    
    const myModal = cn('myModal');

    return (
        <div className={visible ? myModal({active: true}) : myModal()}>
            <div className={myModal('content')}>
                {children}
            </div>
        </div>
    )
};

ModalWindow.propTypes = {
    children: PropTypes.node
};

export default ModalWindow;