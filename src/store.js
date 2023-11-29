import {generateCode} from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление нового товара в корзину
   */
  addItem(code) {
    const productInCart = this.state.cart.find(el => el.code === code);
    const product = this.state.list.find(el => el.code === code);
    
    if(productInCart){
      this.setState({
        ...this.state,
        cart: this.state.cart.map(product => {  
          if(product.code === code){
            product.selected++
          }
          return {...product}
        })
      })
    }
    else{
      this.setState({
        ...this.state,
        cart: [...this.state.cart, {...product, selected: 1}]
      })
    }
  };

  /**
   * Удаление товара по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(product => product.code !== code)
    })
  };

  getAmountOfMoney(){
    let sum = 0
    this.state.cart.forEach(el => {
      sum += el.price * el.selected;
    });
  return sum
  }

}

export default Store;
