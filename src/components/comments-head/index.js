import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from "prop-types";

function CommentsHead(props) {
  const cn = bem('CommentsHead')
  return (<div className={cn()}>
    <p className={cn('title')}>{props.title}</p>
    {props.children}
  </div>)
}

CommentsHead.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
}

export default CommentsHead