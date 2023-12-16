import React, { memo, useEffect, useState} from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginContent from "../../components/login-content";

const Login = () => {

    const store = useStore();

    const [user, setUser] = useState({login: "", password: ""})

    const select = useSelector(state => ({
        error: state.session.error,
        login: state.session.username,
        isAuth: state.profile.isAuth,
        isWaiting: state.session.isWaiting
      }));

    const {t} = useTranslate();

    const logOut = () => {
        store.actions.session.logout();
    }

    useEffect(() => {
        store.actions.session.deleteError();
    }, [])

    const onSubmit = (e) =>{
        e.preventDefault();
        store.actions.session.login(user);
        setUser({...user, login: "", password: ""})
    } 

    return (
        <PageLayout>
            <Head isWaiting={select.isWaiting} title={t('title')} logOut={logOut} exit={t('exit')} enter={t('enter')} user={select.login} isAuth={select.isAuth}>
                <LocaleSelect/>
            </Head>
            <Navigation />
            <LoginContent error={select.error} user={user} setUser={setUser} title={t('enter')} username={t('login.login')} password={t('login.password')} btnTitle={t('login')} onSubmit={onSubmit}/>
        </PageLayout>      
    )
}

export default memo(Login);