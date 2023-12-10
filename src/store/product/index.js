import StoreModule from "../module";

class Product extends StoreModule {

    initState() {
        return {
          title: "",
          description: "",
          price: 0,
          edition: 0,
          madeIn: "",
          category: ""
        }
      }

      async getProduct(_id, setIsLoading){
        const responce =  await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)&lang=${this.store.getState().language.lang}`);
            const json = await responce.json();
            this.setState(({
              ...this.getState,
              title : json.result.title,
              description: json.result.description,
              price: json.result.price,
              edition: json.result.edition,
              madeIn: json.result.madeIn.title,
              category: json.result.category.title,
            }));
            setIsLoading(false);
      }
}

export default Product;