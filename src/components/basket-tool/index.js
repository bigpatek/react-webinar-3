import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural} from "../../utils";
import './style.css';
import { Link } from "react-router-dom";

function BasketTool({sum, amount, onOpen, lang}) {

  const translations = {
    ru: {
      link: 'Главная',
      cart: 'В корзине:',
      button: 'Перейти',
      one: 'товар',
      few: 'товара',
      many: 'товаров',
      empty: 'пусто'
    },
    en: {
      link: 'Home',
      cart: 'In cart:',
      button: 'Go to cart',
      one: 'item',
      few: 'items',
      many: 'items',
      empty: 'empty'
    }
  }

  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <Link to={'/'}>{translations[lang].link}</Link>
      <div>
        <span className={cn('label')}>{translations[lang].cart}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {one: translations[lang].one, few: translations[lang].few, many: translations[lang].many })} / ${numberFormat(sum)} ₽`
            :  translations[lang].empty
          }
        </span>
        <button onClick={onOpen} className={cn('btn')}>{translations[lang].button}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  lang: PropTypes.string
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0,
  lang: 'ru',
}

export default memo(BasketTool);
