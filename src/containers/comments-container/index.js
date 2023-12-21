import {useDispatch, useSelector as useReduxSelector} from "react-redux";
import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";
import Spinner from "../../components/spinner";
import CommentsHead from "../../components/comments-head";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import {useCallback, useMemo, useState} from "react";
import Comment from "../../components/comment";
import commentsActions from "../../store-redux/comments/actions";
import {useNavigate} from "react-router-dom";
import Offset from "../../components/comment-offset";
import useTranslate from "../../hooks/use-translate";
import CommentToLogin from "../../components/comment-to-login";
import CommentForm from "../../components/comment-form"


function CommentsContainer({idArticle}) {

  const {lang, setLang, t} = useTranslate();
  
  const [parent, setParent] = useState({
    _id: idArticle,
    _type: "article",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const reduxSelect = useReduxSelector(state => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
  }));

  const comments = {
    items: useMemo(() => (treeToList(listToTree(reduxSelect.comments), (item, level) => ({
      _id: item._id,
      text: item.text,
      dateCreate: item.dateCreate,
      author: item.author,
      parent: item.parent,
      isDeleted: item.isDeleted,
      offset: level - 1,
    })).slice(1)), [reduxSelect.comments])
  };

  const callbacks = {
    resetParent: useCallback(() => {
      setParent({
        _id: idArticle,
        _type: "article",
      });
    }, [idArticle]),
    setParent: useCallback((_id) => {
      setParent({
        _id,
        _type: "comment",
      });
    }, [setParent]),
    postComment: useCallback((text) => {
      dispatch(commentsActions.postComment({text, parent, id: idArticle}));
      callbacks.resetParent();
    }, [parent]),
    onSignIn: useCallback(() => {
      navigate("/login", {state: {back: location.pathname}});
    }, [location.pathname]),
  };

  return (
  <Spinner active={reduxSelect.waiting}>
    <CommentsHead title={`${t("articleComments.title")} (${reduxSelect.count})`}>
      {reduxSelect.count > 0 && comments.items.map(comment => (
        <Offset key={comment._id}
                offset={comment.offset}>
          <Comment {...comment}
                    postComment={callbacks.setParent}
                    answerLabel={t("comment.answer")}
          />
          {parent._id === comment._id && (select.exists
                                                      ? 
                                                      (
                                                      <CommentForm label={t("comment.CommentForm.label")}
                                                        labelSend={t("comment.CommentForm.labelSend")}
                                                        labelCancel={t("comment.CommentForm.labelCancel")}
                                                        onReset={callbacks.resetParent}
                                                        onSubmit={callbacks.postComment}
                                                        placeholder={t("CommentForm.placeholder")}/>) 
                                                      : 
                                                      (
                                                      <CommentToLogin loginLabel={t("comment.CommentToLogin.loginLabel")}
                                                        text={t("comment.CommentToLogin.text")}
                                                        reset={t("comment.CommentToLogin.reset")}
                                                        signInAction={callbacks.onSignIn}
                                                        resetAction={callbacks.resetParent}/>)
                                          )}                        
        </Offset>
      ))}
      {parent._id === idArticle && (select.exists 
                                                ? 
                                                (
                                                <CommentForm label={t("CommentForm.label")}
                                                              labelSend={t("CommentForm.labelSend")}
                                                              onSubmit={callbacks.postComment}
                                                              placeholder={t("CommentForm.placeholder")}/>) 
                                                : 
                                                (
                                                <CommentToLogin loginLabel={t("CommentToLogin.loginLabel")}
                                                                text={t("CommentToLogin.text")}
                                                                signInAction={callbacks.onSignIn} /> )
                                    )}
    </CommentsHead>
  </Spinner>
  );
}

CommentsContainer.propTypes = {
  idArticle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentsContainer;

/**
 *  
 */
