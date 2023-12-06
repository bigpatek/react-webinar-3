import StoreModule from "../module";

class Language extends StoreModule{
  initState() {
    return {
      lang: 'ru'
    }
  }

  toggleLanguage() {
    this.setState({
      lang: this.getState().lang === 'ru' ? 'en' : 'ru',
    })
  }
}

export default Language;