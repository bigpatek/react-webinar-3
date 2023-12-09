import React from "react";
import PropTypes from 'prop-types';
import BasketTool from "../basket-tool";
import List from "../list";
import Pagination from "../pagination";


const MainMenu = (props) => {
    return (
        <>
        <BasketTool onOpen={props.onOpen} amount={props.amount}
                  sum={props.sum} lang={props.lang}/>
        <List list={props.list} renderItem={props.renderItem}/>
        <Pagination  changePage={props.changePage} activePage={props.activePage} firstPage={props.firstPage} lastPage={props.lastPage}/>
        </>
    )
}

MainMenu.propTypes = {
    onOpen: PropTypes.func.isRequired,
    amount: PropTypes.number,
    sum: PropTypes.number,
    lang: PropTypes.string,
    list: PropTypes.array,
    renderItem: PropTypes.func,
    changePage: PropTypes.func,
    activePage: PropTypes.number,
    firstPage: PropTypes.number,
    lastPage: PropTypes.number,
}

MainMenu.defaultProps = {
    onOpen: () => {},
    changePage: () => {},
    renderItem: () => {},
    lang: 'ru',
    page: 1,
    list: []
}

export default MainMenu;