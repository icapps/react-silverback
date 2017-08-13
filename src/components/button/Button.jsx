import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './button.css';

const THEMES = ['primary', 'secondary', 'inverse'];

const Button = (props) => {
  const renderClickPart = () => {
    if (props.link) {
      return <Link className='btn-label' to={props.link}>{props.children}</Link>;
    } else if (props.ahref) {
      return <a href={props.ahref} className='btn-label'>{props.children}</a>;
    }
    return <button onClick={props.onClickCallback} className='btn-label'>{props.children}</button>;
  };

  const theme = THEMES.includes(props.theme) ? props.theme : THEMES[0];
  return (
    <span className={`btn btn-${theme}`}>
      {renderClickPart()}
      <span className='btn-corners top'></span>
      <span className='btn-corners bottom'></span>
    </span>
  );
};

Button.propTypes = {
  onClickCallback: PropTypes.func,
  ahref: PropTypes.string,
  link: PropTypes.string,
  theme: PropTypes.string
};

Button.defaultProps = {
  onClickCallback: () => {},
  ahref: '',
  link: '',
  theme: THEMES[0]
};

export default Button;
