import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from './data/logo.svg';
import { links, social } from './data/navbarData';
import './css/navbar.css';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <NavLink to='/'>
            <img src={logo} alt='logo' className='logo' />
          </NavLink>
          <button className='nav-toggle'>
            <FaBars />
          </button>
        </div>
        <div className='links-container'>
          <ui className='nav-links'>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <NavLink to={url} className='nav-link'>
                    {text}
                  </NavLink>
                </li>
              );
            })}
          </ui>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id} className='social-icon'>
                <a href={url}>{icon}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
