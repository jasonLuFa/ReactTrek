import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const links = [
  {
    id: 1,
    url: '/',
    text: 'home',
  },
  {
    id: 2,
    url: '/about',
    text: 'about',
  },
];

const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 4,
    url: 'https://www.instagram.com/',
    icon: <FaInstagram />,
  },
];

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <NavLink to='/'>
            <img src={logo} alt='logo' className='logo' />
          </NavLink>
          <button className='nav-toggle'></button>
        </div>
        <div className='links-container'>
          <ui className='nav-links'>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <NavLink to={url}>{text}</NavLink>
                </li>
              );
            })}
          </ui>
        </div>
        <ul className='social-icons'>
          {social.map((socialIcon) => {
            const { id, url, icon } = socialIcon;
            return (
              <li key={id}>
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
