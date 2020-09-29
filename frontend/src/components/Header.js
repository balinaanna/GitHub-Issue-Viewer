import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='ui top fixed inverted menu'>
      <div className='ui container'>
        <div className='right menu'>
          <Link to='/' className='header item'>
            Log in with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
