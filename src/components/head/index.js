import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import Spinner from "../spinner";

function Head({isAuth, logOut, title, exit , enter, url, children, user, isWaiting}) {
  return (
    <>
    <Spinner active={isWaiting}> 
      <div className="Login">
          {user || isWaiting ? <Link to={"/profile"}>{user}</Link> : null}
          {!isAuth && !isWaiting 
                  ?
                  <button><Link to={url}>{enter}</Link></button>
                  :
                  <button onClick={logOut}>{exit}</button>
          }
      </div>
    </Spinner>
    <div className='Head'>
      <div className='Head-place'>
        <h1>{title}</h1>
      </div>
      <div className='Head-place'>{children}</div>
    </div>
    </>
  )
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func,
  exit: PropTypes.string,
  enter: PropTypes.string,
  url: PropTypes.string,
  user: PropTypes.string,
};

Head.defaultProps = {
  isAuth: false,
  logOut: () => {}
}

export default memo(Head);
