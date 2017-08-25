import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './button.css';

const THEMES = [ 'primary', 'secondary', 'inverse' ];

const Button = (props) => {
  const renderClickPart = (cssClasses) => {
    if (props.link) {
      return (
        <Link className={cssClasses} to={props.link}>
          {props.children}
        </Link>
      );
    } else if (props.ahref) {
      return (
        <a href={props.ahref} className={cssClasses}>
          {props.children}
        </a>
      );
    }
    return (
      <button onClick={props.onClickCallback} className={cssClasses}>
        {props.children}
      </button>
    );
  };

  const theme = THEMES.includes(props.theme) ? props.theme : THEMES[0];
  return renderClickPart(`btn btn-${theme}`);
};

Button.propTypes = {
  onClickCallback: PropTypes.func,
  ahref: PropTypes.string,
  link: PropTypes.string,
  theme: PropTypes.string,
};

Button.defaultProps = {
  onClickCallback: () => {},
  ahref: '',
  link: '',
  theme: THEMES[0],
};

export default Button;
