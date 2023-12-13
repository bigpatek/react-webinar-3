import StoreModule from "../module";

class CategoriesState extends StoreModule{
  /**
   * Начальное состояние
   * @returns {{categories: Map<any, any>}}
   */
  initState() {
    return {
      categories: new Map(),
      waiting: false,
    };
  }

  async getCategories() {
    this.setState({
      ...this.initState(),
      waiting: true,
    })
    await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*')
    .then(res => res.json())
    .then(json => {
    const categories = new Map()
    if(json.result){
        json.result.items.forEach(item => {
            if(categories.has(item.parent?._id || null)){
                categories.set(item.parent?._id || null, [...categories.get(item.parent?._id || null), item])
            }
            else{ 
                categories.set(item.parent?._id || null, [item])
            }
        })
        this.setState({
            ...this.getState(),
            categories,
            waiting: false,
          }, 'Загружен список категорий из АПИ');
        }
    })
    }
}


export default CategoriesState;