import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      page: 1,
      limit: 10,
      totalPages: 0
    }
  }

  async getAllProducts(page = this.store.getState().catalog.page) {
    const response = await fetch(`/api/v1/articles?limit=${this.store.getState().catalog.limit}&skip=${(page-1)*10}&lang=${this.store.getState().language.lang}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getTotalCount(){
    const response = await fetch(`/api/v1/articles?fields=items(_id, title, price),count`);
    const json = await response.json();
    const totalCount = Math.ceil(json.result.count / this.store.getState().catalog.limit);
    this.setState({
      ...this.getState(),
      totalPages: totalCount
    })
  }

  getPagesArray(setPagesArray){
    const pagesArray = [];
    for(let i = 0; i < this.store.getState().catalog.totalPages; i++){
      pagesArray.push(i+1);
    }
    setPagesArray(pagesArray);
  }

  changePage(page){
    this.setState({
      ...this.getState(),
      page: page
    })
  }

}

export default Catalog;
