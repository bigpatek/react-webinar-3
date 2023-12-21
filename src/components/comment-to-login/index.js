import { memo } from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';


function CommentLogIn(props) {
  const cn = bem("CommentLogIn");
  return (<p className={cn()}>
    <span className={cn("signIn")}
          onClick={props.signInAction}>{props.loginLabel}</span>{props.text}{!!props.reset &&
    <span className={cn("reset")}
          onClick={props.resetAction}>{props.reset}</span>}
  </p>);
}

CommentLogIn.propTypes = {
  loginLabel: PropTypes.string,
  text: PropTypes.string,
  reset: PropTypes.string,
  resetAction: PropTypes.func,
  signInAction: PropTypes.func,
};

CommentLogIn.defaultProps = {
  loginLabel: "Войдите",
  text: ", чтобы иметь возможность комментировать. ",
  reset: "",
  resetAction: () => {
  },
  signInAction: () => {
  },
};

export default memo(CommentLogIn);