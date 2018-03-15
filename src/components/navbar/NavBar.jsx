import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = props => (
  <aside className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
    <ul className="nav nav-pills flex-column">
      {props.links.map(link => <li className="nav-item"><Link to={link.path} class="nav-link">{link.name}</Link></li>)}
    </ul>
  </aside>
);

export default Navbar;
