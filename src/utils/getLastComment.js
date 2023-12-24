export const getLastComment = (comment) => {
    if (comment.children && comment.children.length > 0) {
      const lastComment = comment.children[comment.children.length - 1];
      return lastComment;
    }
    else{
        return comment;
    }
  };