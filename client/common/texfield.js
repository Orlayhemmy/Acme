import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ field, id, type, placeholder, value, onChange, error}) => {
  return  (
    <div className={classnames('form-group', { 'has-error': error })}>
      <input 
      id={id}
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}/>
      {error && <span className="help-block">{error}</span>}
    </div>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, 
  error: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;