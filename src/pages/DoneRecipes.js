import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import '../styles/DoneRecipes.css';
import Share from '../components/Share';

class DoneRecipes extends Component {
  // Passo 1 - Vamos receber o valor do localStorage para dentro do meu stado inicial.
  // Passo 1.1 - No Construtor vamos criar uma chave, que deverá ser um array de objetos, e armazenar todas as informações de receitas completas.
  // Passo 2.2 - Vamos criar uma outra chave para armazenar o valor do filtro de done recipes.
  constructor() {
    super();
    this.state = {
      doneRecipes: null,
      filterDoneRecipes: 'All',
    };
  }

  // Passo 1.2 - Depois da primeira renderização, vamos trazer as receitas finalizadas do localStorage para dentro do meu estado local.
  componentDidMount() {
    this.callLocalStorage();
  }

  // Função responsável apenas por atribuir no estado um valor passado por parametro. No componentDidMount não é recomendável que atualize o estado local
  callLocalStorage = () => {
    const localStorageDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')); // ALTERAR LOCALSTORAGE FUTURAMENTE. PEGANDO DOS FAVORITADOS PARA TESTE.
    if (localStorageDoneRecipes?.length) {
      this.setState({
        doneRecipes: [...localStorageDoneRecipes],
      });
    }
  }

  // Passo 2.1.2 - Essa função é responsável por atribuir uma classe e estilizar o botão ed filtragem quando este estiver selecionado retorna true ou false;
  filterClass = (filterName) => {
    const { filterDoneRecipes } = this.state;
    return (filterDoneRecipes === filterName);
  }

  // Passo 2.1.4 - Essa função é responsável por alterar o valor do filtro
  changeFilterAbled = (newFilter) => {
    this.setState({
      filterDoneRecipes: newFilter,
    });
  }

  render() {
    const { history } = this.props;
    // Passo 2 - exibir filtros e componentes na tela
    // Passo 3 - trazer o component Compartilhar
    const { doneRecipes, filterDoneRecipes } = this.state;
    // Passo 2.1.3 - RESOLVENDO LINT : repetindo literal 3 vezes
    const classAbled = 'done-recipes-filter-abled';
    const classDisabled = 'done-recipes-filter-disabled';
    return (
      <>
        <Header tittle="Done Recipes" searchBool="false" history={ history } />
        {/* Passo 2.1 - Exibir os filtros e alterar o css quando o filtro estiver selecionado */}
        <div className="filters-done-recipes">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            className={ (this.filterClass('All')) ? classAbled : classDisabled }
            onClick={ () => this.changeFilterAbled('All') }
          >
            All
            { /* Não Filtrar */ }
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            className={ (this.filterClass('Foods')) ? classAbled : classDisabled }
            onClick={ () => this.changeFilterAbled('Foods') }
          >
            Foods
            { /* Filtrar comidas */ }
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className={ (this.filterClass('Drinks')) ? classAbled : classDisabled }
            onClick={ () => this.changeFilterAbled('Drinks') }
          >
            Drinks
          </button>
        </div>
        <div className="done-recipes">
          {
            (doneRecipes?.length) && doneRecipes
              .filter((recipe) => (
                (filterDoneRecipes === 'Foods') ? recipe.type === 'food' : true)) // filtrar comidas
              .filter((recipe) => (
                (filterDoneRecipes === 'Drinks') ? recipe.type === 'drink' : true)) // filtrar bebidas
              .map((recipe, index) => {
                const {
                  id,
                  type,
                  category,
                  nationality,
                  alcoholicOrNot,
                  name,
                  image,
                  doneDate,
                  tags,
                } = recipe;
                console.log(recipe);
                return (
                  <div
                    className={ `done-recipe ${index}-done-recipe` }
                    key={ `${index}-done-recipe` }
                  >
                    <button
                      type="button"
                      data-testid={ `button-${index}-horizontal-image` }
                      onClick={ () => history.push(`${type}s/${id}`) }
                    >
                      <img
                        className="thumb-card"
                        src={ image }
                        alt="recipe"
                        data-testid={ `${index}-horizontal-image` }
                      />
                    </button>
                    <button
                      type="button"
                      data-testid={ `button-${index}-horizontal-name` }
                      onClick={ () => history.push(`${type}s/${id}`) }
                    >
                      <h3 data-testid={ `${index}-horizontal-name` }>
                        {name}
                      </h3>
                    </button>
                    <h3 data-testid={ `${index}-horizontal-top-text` }>
                      {
                        type === 'food' ? `${nationality} - ${category}`
                          : alcoholicOrNot
                      }
                    </h3>
                    <h3 data-testid={ `${index}-horizontal-done-date` }>
                      {doneDate}
                    </h3>
                    {
                      tags.map((tag) => (
                        <h3
                          key={ `${name}-${tag}` }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}
                        </h3>
                      ))
                    }
                    <Share
                      testId={ `${index}-horizontal-share-btn` }
                      item={ recipe }
                      pathname={ history.location.pathname }
                      keyused="item"
                    />
                  </div>
                );
              })
          }
        </div>
      </>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
    push: PropTypes.func,
  }).isRequired,
};

export default DoneRecipes;
