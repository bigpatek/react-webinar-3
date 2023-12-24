import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import 'style.css'
import { getLastComment } from "../../utils/getLastComment";

const Comment = (props) => {
        
    const cn = bem('Comment');

    let date = new Date(Date.parse(props.dateCreate));
    let day = String(date.getDate()).padStart(2, '0');
    let month = date.toLocaleString('default', { month: 'long' });
    let year = date.getFullYear();
    let time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    let fullDate = `${day} ${month} ${year} в ${time}`;

    const clickHandle = () => {
        const lastComment = getLastComment(props.comment);
        props.setFormPosition((prev) => ({
			...prev,
			id: lastComment._id,
            level: lastComment.offset
		}));
        props.postComment(props._id);
        console.log(props.comment.offset)
    }
    return (<div className={cn()} style={{paddingInlineStart: `${props.offset * 30}px`}}>
      <div className={cn('title')}>
          <strong className={props.author.profile.name === props.user ? cn('currentUser') : "user"}>{props.author.profile.name}</strong>
          <span className={cn('date')}>{fullDate}</span>
      </div>
      <div className={cn('text')}>{props.text}</div>
      <div>
          <span className={cn('answer')} onClick={clickHandle}>{props.answerLabel}</span>
      </div>
    </div>)
}

Comment.propTypes = {
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        profile: PropTypes.shape({
          name: PropTypes.string,
        })
    }),
    parent: PropTypes.shape({
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        _type: PropTypes.string,
    }),
    isDeleted: PropTypes.bool,
    offset: PropTypes.number,
    postComment: PropTypes.func,
    answerLabel: PropTypes.string,
}

Comment.defaultProps = {
    postComment: () => {},
    answerLabel: 'Ответить'
}

export default Comment;