import React from "react";
import "style.css"

const LoginContent = (props) => {
    return(
        <div className="Login-content">
            <h1>{props.title}</h1>
            <form onSubmit={e => props.onSubmit(e)}>
                <label>{props.username}</label>
                <input name="username" type="text" value={props.user.login} onChange={e => props.setUser({...props.user, login: e.target.value})}/>
                <label>{props.password}</label>
                <input name="password" type="password" value={props.user.password} onChange={e => props.setUser({...props.user, password: e.target.value})}/>
                {props.error ? <p className="error">{props.error}</p> : null}
                <button>{props.btnTitle}</button>
            </form>
        </div>
    )
}

export default LoginContent;