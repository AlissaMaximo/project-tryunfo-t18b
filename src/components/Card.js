import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props) {
    super(props); // pega o estado do pai junto com a linha 7
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: false,
    };
  }

  render() {
    const {
      cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare, cardTrunfo,
    } = this.props;

    const checkTrunfo = () => {
      if (cardTrunfo) {
        return (
          <h5 data-testid="trunfo-card">Super Trunfo</h5>
        );
      }
    };

    return (
      <section>
        <h4 data-testid="name-card">{ cardName }</h4>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">{ cardDescription }</p>
        <h6 data-testid="attr1-card">{ cardAttr1 }</h6>
        <h6 data-testid="attr2-card">{ cardAttr2 }</h6>
        <h6 data-testid="attr3-card">{ cardAttr3 }</h6>
        <h5 data-testid="rare-card">{ cardRare }</h5>
        {checkTrunfo()}
      </section>
    );
  }
}

Card.propTypes = {
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardName: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
