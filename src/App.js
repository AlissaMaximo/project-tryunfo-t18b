import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

export default class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    hasTrunfo: false,
    isSaveButtonDisabled: true,
    cards: [],
    shownFilteredCards: [],
    filterName: '',
    filterRare: 'todas',
  }; // é o estado do App (componente parente)

  verifyForm = () => { // Requisito 5
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    const ableButtonBools = [];
    const formStrings = [cardName, cardDescription, cardImage, cardRare];
    const formNumbers = [Number(cardAttr1), Number(cardAttr2), Number(cardAttr3)];
    const maxSum = formNumbers.reduce((acc, cur) => acc + cur);
    const TWO_HUNDRED_AND_TEN = 210;
    const NINETY = 90;
    const SEVEN = 7;

    formStrings.forEach((string) => {
      if (string.length !== 0) {
        ableButtonBools.push('y');
      }
    });
    if (maxSum <= TWO_HUNDRED_AND_TEN) {
      formNumbers.forEach((number) => {
        if (number <= NINETY && number >= 0) {
          ableButtonBools.push('y');
        }
      });
    }
    if (ableButtonBools.length === SEVEN) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  handleInputChange = ({ target: { name, value } }) => { // Requisito 2
    const { cardTrunfo } = this.state; // em diante, Requisito 4.

    this.setState({ [name]: name === 'cardTrunfo' ? !cardTrunfo : value },
      () => this.verifyForm()); // se o nome for cardTrunfo, que é o único que é de acionar ou não, então torna o valor no estado true.
  };

  handleSaveButtonClick = () => { // Requisito 6
    let containTrunfo = false;

    const {
      cardName,
      cardDescription,
      cardAttr1, cardAttr2, cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      cards } = this.state;
    cards.push({
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    });
    this.setState({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
    });

    cards.forEach((card) => { // Requisito 7.
      if (card.cardTrunfo === true) {
        containTrunfo = true;
        return containTrunfo;
      }
    });
    if (containTrunfo === true) {
      this.setState({ hasTrunfo: true, cardTrunfo: false });
    }
  };

  checkTrunfoInAllCards = () => { // Requisito 8
    const { cards } = this.state;
    const trunfoCardExist = cards.find((card) => card.hasTrunfo === true);

    if (trunfoCardExist) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  deleteCard = (cardName) => {
    const { cards } = this.state;
    const newCardsArr = cards.filter((card) => card.cardName !== cardName);

    this.setState({ cards: newCardsArr }, () => this.checkTrunfoInAllCards());
  };

  filterCards = (cards, filterName, filterRare) => cards // Requisito 10
    .filter((card) => (filterName === '' ? card : card.cardName.includes(filterName)))
    .filter((card) => (filterRare === 'todas' ? card : card.cardRare === filterRare));

  handleSearchInputChange = ({ target: { value } }) => {
    const { cards } = this.state;
    const filteredCards = []; // filtered cards é o que vai mostrar na tela, então é por último.

    this.setState({ filterName: value });
    cards.forEach((card) => {
      if (card.cardName.includes(value)) {
        filteredCards.push(card);
      }
    });
    this.setState({ shownFilteredCards: filteredCards });
    if (value === '') {
      this.setState({ shownFilteredCards: [] });
    }
  };

  handleSelectChange = ({ target: { value } }) => {
    this.setState({ filterRare: value });
  }

  showFiltered = () => {
    const { cards, shownFilteredCards } = this.state;
    if (shownFilteredCards.length !== 0) {
      return shownFilteredCards.map((card) => (
        <>
          <Card
            cardName={ card.cardName }
            cardDescription={ card.cardDescription }
            cardAttr1={ card.cardAttr1 }
            cardAttr2={ card.cardAttr2 }
            cardAttr3={ card.cardAttr3 }
            cardImage={ card.cardImage }
            cardRare={ card.cardRare }
            cardTrunfo={ card.cardTrunfo }
            cards={ cards }
          />
          <button
            type="button"
            data-testid="delete-button"
            onClick={ () => this.deleteCard(card.cardName) }
          >
            Excluir
          </button>
        </>
      ));
    }
  };

  render() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
      cardTrunfo, hasTrunfo, isSaveButtonDisabled, cards, filterName, filterRare,
    } = this.state; // pegar o estado criado antes

    return (
      <>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ this.handleSearchInputChange }
        />
        <select data-testid="rare-filter" onChange={ this.handleSelectChange }>
          <option value="todas" selected>Todas</option>
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <div>
          <h1>Tryunfo</h1>
          <Form
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            hasTrunfo={ hasTrunfo }
            isSaveButtonDisabled={ isSaveButtonDisabled }
            onInputChange={ this.handleInputChange }
            onSaveButtonClick={ this.handleSaveButtonClick }
          />
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            cardTrunfo={ cardTrunfo }
            cards={ cards }
          />
          {/* Requisito 8 */}
          { cards && this.filterCards(cards, filterName, filterRare).map((card) => (
            <section key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                cardTrunfo={ card.cardTrunfo }
                cards={ cards }
              />
              <button
                type="button"
                data-testid="delete-button"
                onClick={ () => this.deleteCard(card.cardName) }
              >
                Excluir
              </button>
            </section>)) }
        </div>
      </>
    );
  }
}
