import { memo, useId, useState } from "react";
import PropTypes from 'prop-types';
import './style.css';

function CommentForm(props) {

  const inputId = useId();

  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(inputValue);
  }

  return (
    <form className="CommentForm" onReset={props.onReset} onSubmit={e => handleSubmit(e)}>
      <label htmlFor={inputId}>
        <strong>{props.label}</strong>
      </label>
      <textarea name="CommentForm-input"
                id={inputId}
                rows={4}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder={props.placeholder}
      />
      <div>
        <button type="CommentForm-submit">{props.labelSend}</button>
        {props.labelCancel && <button type="CommentForm-reset">{props.labelCancel}</button>}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  label: PropTypes.string,
  labelSend: PropTypes.string,
  labelCancel: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
}

CommentForm.defaultProps = {
  label: 'Новый комментарий',
  labelSend: 'Отправить',
  labelCancel: '',
  placeholder: 'Текст',
  onSubmit: () => {},
  onReset: () => {},
}

export default memo(CommentForm);