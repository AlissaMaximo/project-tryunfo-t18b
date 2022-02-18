import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
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
  }; // é o estado do App (componente parente)

  /* Requisito 5 */
  verifyForm = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare } = this.state;
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

  /* Requisito 2 */
  handleInputChange = ({ target: { name, value } }) => {
    // l. 8 em diante, Requisito 4.
    const { cardTrunfo } = this.state;

    this.setState({ [name]: name === 'cardTrunfo' ? !cardTrunfo : value },
      () => this.verifyForm()); // se o nome for cardTrunfo, que é o único que é de acionar ou não, então torna o valor no estado true.
  };

  /* Requisito 6 */
  handleSaveButtonClick = () => {
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

    // Requisito 7.
    cards.forEach((card) => {
      if (card.cardTrunfo === true) {
        containTrunfo = true;
        return containTrunfo;
      }
    });
    if (containTrunfo === true) {
      this.setState({ hasTrunfo: true, cardTrunfo: false });
    }
  };

  /* Requisito 8 */
  checkTrunfoInAllCards = () => {
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

    this.setState({ cards: newCardsArr }, this.checkTrunfoInAllCards);
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      cards,
    } = this.state; // pegar o estado criado antes

    return (
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
        { cards.map((card) => (
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
    );
  }
}

export default App;

/*
REFERÊNCIAS
Requisito 4: https://stackoverflow.com/questions/35537229/how-can-i-update-the-parents-state-in-react
https://github.com/tryber/sd-018-b-project-tryunfo/pull/119/files para verificar se é de marcar ou não.
https://github.com/tryber/sd-018-b-project-tryunfo/pull/128/files
https://www.geeksforgeeks.org/how-to-set-the-default-value-for-an-html-select-element/

Requisito 5: https://github.com/telerik/kendo-react/issues/327 https://github.com/telerik/kendo-react/issues/327
https://flaviocopes.com/how-to-convert-string-to-number-javascript/

Requisito 9:https://github.com/facebook/prop-types/issues/212
*/
