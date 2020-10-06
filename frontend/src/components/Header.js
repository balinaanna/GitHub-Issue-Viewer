import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_SESSION } from '../actions/types';

class Header extends React.PureComponent {
  signOut = () => {
    window.localStorage.removeItem('token');
    this.props.dispatch({ type: DELETE_SESSION });
  }

  render() {
    return (
      <div className='ui top fixed inverted menu'>
        <div className='ui container'>
          <div className='left menu'>
            <Link to='/' className='header item'>
              <i className='github large icon'></i>
              <span>Github Issue Viewer</span>
            </Link>
          </div>

          <div className='right menu'>
            <a className='header item' href='/' onClick={ this.signOut }>
              Sign out
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(
  (state) => { return { session: state.session } },
)(Header);
