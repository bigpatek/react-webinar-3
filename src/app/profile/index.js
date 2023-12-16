import React, { useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import ProfileContent from "../../components/profile-content";
import Spinner from "../../components/spinner";

const Profile = () => {
    const store = useStore();

    const select = useSelector(state => ({
        login: state.session.username,
        isAuth: state.session.isAuth,
        name: state.profile.username,
        phone: state.profile.phone,
        email: state.profile.email,
        isWaiting: state.session.isWaiting
      }));

    const {t} = useTranslate();


    const callbacks = {
    //Выход из аккаунта
    logOut: useCallback(() => store.actions.session.logout(), [store]),
  }

    return(
        <PageLayout>
            <Head isWaiting={select.isWaiting} title={t('title')} logOut={callbacks.logOut} exit={t('exit')} enter={t('enter')} user={select.login} isAuth={select.isAuth}>
                <LocaleSelect/>
            </Head>
            <Navigation />
            <Spinner active={select.isWaiting}>
                <ProfileContent name={select.name} phone={select.phone} email={select.email} nameTitle={t('name')} phoneTitle={t('number')} title={t('profile')}/>
            </Spinner>
        </PageLayout>
    )
}

export default Profile;