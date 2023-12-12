import React, { useEffect, useState} from "react";
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
        error: state.profile.error,
        login: state.profile.username,
        isAuth: state.profile.isAuth
      }));

    const {t} = useTranslate();

    const logOut = () => {
        store.actions.profile.logout();
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        store.actions.profile.login(user);
        setUser({...user, login: "", password: ""})
        console.log(select.login)
    } 

    return (
        <PageLayout>
            <Head title={t('title')} logOut={logOut} exit={t('exit')} enter={t('enter')} user={select.login} isAuth={select.isAuth}>
                <LocaleSelect/>
            </Head>
            <Navigation />
            <LoginContent error={select.error} user={user} setUser={setUser} title={t('enter')} username={t('login.login')} password={t('login.password')} btnTitle={t('login')} onSubmit={onSubmit}/>

        </PageLayout>      
    )
}

export default Login;