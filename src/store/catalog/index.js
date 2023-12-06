import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: []
    }
  }

  async getAllProducts(page, limit, lang) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${(page-1)*10}&lang=${lang}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items
    }, 'Загружены товары из АПИ');
  }

  async getTotalCount(setTotalPages, limit){
    const response = await fetch(`/api/v1/articles?fields=items(_id, title, price),count`);
    const json = await response.json();
    const totalCount = Math.ceil(json.result.count / limit);
    setTotalPages(totalCount);
  }

  getPagesArray(totalPages, setPagesArray){
    const pagesArray = [];
    for(let i = 0; i< totalPages; i++){
      pagesArray.push(i+1);
    }
    setPagesArray(pagesArray);
  }
}

export default Catalog;
