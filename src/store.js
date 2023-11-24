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
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, {code: this.getItemCode(), title: 'Новая запись'}]
    })
  };

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code)
    })
  };
  
  getItemCode = () => {
    let itemCode = Math.max(...this.state.list.map(item => item.code), 0) + 1;
    return itemCode;
    
  }

  getNumEnding = (count, endings) => {
    count = count.toString().slice(-2);
    if(Number(count) > 11 && Number(count) < 15){
      return endings[0]
    }
    else{
      count = count.toString().slice(-1);
      if (Number(count) >= 2 && Number(count) <= 4) {
        return endings[1];
      }
      else return endings[0];
    }
  }
  
  getItemTitle(item){
    return (
      item.title +
      (item.selectedCounter
        ? ' | Выделяли ' + item.selectedCounter + ' ' + this.getNumEnding(item.selectedCounter, ["раз", "раза"])
        : '')
    );
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;
        }
        else{
          item.selected = false;
        } 
        if(!item.selectedCounter) {
          const initialCount = 0;
          item.selectedCounter = initialCount;
        }
        if (item.selected) {
          item.selectedCounter += 1;
        } 
        return item;
      })
    })
  }
}

export default Store;
