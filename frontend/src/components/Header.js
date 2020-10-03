import React from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from '../utils/api';

const Header = () => {
  return (
    <div className='ui top fixed inverted menu'>
      <div className='ui container'>
        <div className='left menu'>
          <Link to='/' className='header item'>
            <i className="github large icon"></i>
            <span>Github Issue Viewer</span>
          </Link>
        </div>

        <div className='right menu'>
          <Link to={ `${baseURL}/auth/github` } className='header item'>
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
