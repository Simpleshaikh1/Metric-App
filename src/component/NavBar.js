import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <header>
    <nav className="container d-flex-space-be">
      <div className="logo">
        <NavLink to="/" className="about"> Sharecoin </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/about" className="about"> About </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
