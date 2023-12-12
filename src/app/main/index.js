import {memo} from 'react';
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {

  const store = useStore();

  const select = useSelector(state => ({
    login: state.profile.username,
    isAuth: state.profile.isAuth
  }));

  useInit(() => {
    store.actions.catalog.initParams();
  }, [], true);

  const {t} = useTranslate();

  const logOut = () => {
    store.actions.profile.logout();
}

  return (
    <PageLayout>
      <Head title={t('title')} exit={t('exit')} enter={t('enter')} url={"/login"} logOut={logOut} user={select.login} isAuth={select.isAuth}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <CatalogFilter/>
      <CatalogList/>
    </PageLayout>
  );
}

export default memo(Main);
