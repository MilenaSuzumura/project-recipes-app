import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCocktails, fetchCocktailsCategory } from '../redux/actions';
import '../styles/foods.css';
import FilterCocktails from './FilterCocktails';
import SearchBar from './SearchBar';

class Cocktails extends React.Component {
  componentDidMount() {
    const { disptachCocktails, disptachCocktailsCategory } = this.props;
    disptachCocktails();
    disptachCocktailsCategory();
  }

  render() {
    const { searchButton, history } = this.props;
    return (
      <div>
        <h3>Cocktail Recipes</h3>
        {
          (searchButton) ? <SearchBar history={ history } /> : <FilterCocktails />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchButton: state.header.buttonToggle,
});

const mapDispatchToProps = (dispatch) => ({
  disptachCocktails: () => dispatch(fetchCocktails()),
  disptachCocktailsCategory: () => dispatch(fetchCocktailsCategory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cocktails);

Cocktails.propTypes = {
  disptachCocktails: propTypes.func.isRequired,
  disptachCocktailsCategory: propTypes.func.isRequired,
  searchButton: propTypes.bool.isRequired,
  history: propTypes.shape().isRequired,
};

// https://stackoverflow.com/questions/56168771/how-to-limit-for-10-results-the-array-filter
