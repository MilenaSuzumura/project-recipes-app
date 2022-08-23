import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: false,
    };
  }

  handleClickSearch = ({ target }) => {
    const value = target.value === 'true';
    this.setState({
      search: !value,
    });
  }

  render() {
    const { history, searchBool, tittle } = this.props;
    const { search } = this.state;
    return (
      <header>
        <input
          data-testid="profile-top-btn"
          type="image"
          src={ profileIcon }
          alt="profileIcon"
          onClick={ () => {
            history.push('/profile');
          } }
        />
        <h1 data-testid="page-title">{tittle}</h1>
        {
          searchBool === 'true' && (
            <>
              <input
                data-testid="search-top-btn"
                type="image"
                value={ search }
                src={ searchIcon }
                alt="searchIcon"
                onClick={ this.handleClickSearch }
              />
              {
                search === true && (
                  <input type="text" data-testid="search-input" />
                )
              }
            </>
          )
        }
      </header>
    );
  }
}

Header.propTypes = {
  searchBool: PropTypes.string.isRequired,
  tittle: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Header;