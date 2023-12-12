import React from "react";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import PageLayout from "../../components/page-layout";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import ProfileContent from "../../components/profile-content";

const Profile = () => {
    const store = useStore();

    const select = useSelector(state => ({
        login: state.profile.username,
        isAuth: state.profile.isAuth,
        name: state.profile.username,
        phone: state.profile.phone,
        email: state.profile.email
      }));

    const {t} = useTranslate();

    const logOut = () => {
        store.actions.profile.logout();
    }

    return(
        <PageLayout>
            <Head title={t('title')} logOut={logOut} exit={t('exit')} enter={t('enter')} user={select.login} isAuth={select.isAuth}>
                <LocaleSelect/>
            </Head>
            <Navigation />
            <ProfileContent name={select.name} phone={select.phone} email={select.email} nameTitle={t('name')} phoneTitle={t('number')} title={t('profile')}/>
        </PageLayout>
    )
}

export default Profile;