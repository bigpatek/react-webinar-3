import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({title, changeLang, lang}) {

  const translations = {
    ru: {
      button: 'Switch to English',
    },
    en: {
      button: 'Переключить на Русский',
    }
  }

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button onClick={() => changeLang()}>{translations[lang].button}</button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  lang: PropTypes.string,
  changeLang: PropTypes.func
};

Head.defaultProps = {
  lang: 'ru',
  changeLang: () => {},
}

export default memo(Head);
