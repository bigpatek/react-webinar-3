import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { numberFormat } from "../../utils";

function ProductDescription(props) {

  const cn = bem("ProductDescription");

  const translations = {
    ru: {
      madeIn: 'Страна производитель',
      category: 'Категория',
      edition: 'Год выпуска',
      price: 'Цена',
      button: 'Добавить'
    },
    en: {
      madeIn: 'Made In',
      category: 'Category',
      edition: 'Year Edition',
      price: 'Price',
      button: 'Add'
    }
  }

  const formattedVals = {
    price: numberFormat(props.price, "RU", {
      style: "currency",
      currency: "RUB",
    }),
  };

  return (
    <div className={cn()}>
      <div className={cn("content")}>
        <p className={cn("about")}>{props.description}</p>
        <div className={cn("list")}>
          <div className={cn("descrItem")}>
          {translations[props.lang].madeIn}:{" "}
            <span className={cn("descrValue")}>{props.madeIn}</span>
          </div>
          <div className={cn("descrItem")}>
          {translations[props.lang].category}:{" "}
            <span className={cn("descrValue")}>{props.category}</span>
          </div>
          <div className={cn("descrItem")}>
            {translations[props.lang].edition}:{" "} <span className={cn("descrValue")}>{props.edition}</span>
          </div>
        </div>
        <div className={cn("result")}>
          <span className={cn("price")}>{translations[props.lang].price}: {formattedVals.price}</span>
          <div>{props.addButton}</div>
        </div>
      </div>
    </div>
  );
}

ProductDescription.propTypes = {
  description: PropTypes.string,
  price: PropTypes.number,
  edition: PropTypes.number,
  madeIn: PropTypes.string,
  category: PropTypes.string,
  lang: PropTypes.string,
  addButton: PropTypes.object,
};

ProductDescription.defaultProps = {
  lang: 'ru',
}

export default ProductDescription;