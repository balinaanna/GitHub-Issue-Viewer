import React from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../utils/api';

const Header = () => {
  return (
    <div className='ui top fixed inverted menu'>
      <div className='ui container'>
        <div className='right menu'>
          <Link to={ `${baseURL}/auth/github` } className='header item'>
            Sign in with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
