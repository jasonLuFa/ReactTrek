import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from './data/logo.svg';
import { links, social } from './data/navbarData';
import './css/navbar.css';

const Navbar = () => {
  const [isShowLinks, setIsShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const navLinksRef = useRef(null);
  const socialIconsContainerRef = useRef(null);
  const socialIconsRef = useRef(null);

  const toggleLinks = () => {
    setIsShowLinks(!isShowLinks);
  };

  useEffect(() => {
    const navLinksHeight = navLinksRef.current.getBoundingClientRect().height;
    console.log(navLinksHeight);
    const socialIconsHeight =
      socialIconsRef.current.getBoundingClientRect().height;
    console.log(socialIconsHeight);
    if (isShowLinks) {
      linksContainerRef.current.style.height = `${navLinksHeight}px`;
      socialIconsContainerRef.current.style.height = `${socialIconsHeight}px`;

      return;
    }
    linksContainerRef.current.style.height = '0px';
    socialIconsContainerRef.current.style.height = '0px';
  }, [isShowLinks]);

  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <div className='nav-header'>
          <NavLink to='/'>
            <img src={logo} alt='logo' className='logo' />
          </NavLink>
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='nav-links-container' ref={linksContainerRef}>
          <ul className='nav-links' ref={navLinksRef}>
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
          </ul>
        </div>
        <div className='social-icons-container' ref={socialIconsContainerRef}>
          <ul className='social-icons' ref={socialIconsRef}>
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
      </div>
    </nav>
  );
};

export default Navbar;
