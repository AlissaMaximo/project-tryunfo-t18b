import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  checkTrunfo = () => {
    const { cardTrunfo } = this.props;
    if (cardTrunfo) {
      return (
        <h5 data-testid="trunfo-card">Super Trunfo</h5>
      );
    }
  };

  render() {
    const {
      cardName, cardDescription,
      cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
    } = this.props;

    return (
      <div>
        <p data-testid="name-card">{ cardName }</p>
        <img src={ cardImage } alt={ cardName } data-testid="image-card" />
        <p data-testid="description-card">{ cardDescription }</p>
        <h6 data-testid="attr1-card">{ cardAttr1 }</h6>
        <h6 data-testid="attr2-card">{ cardAttr2 }</h6>
        <h6 data-testid="attr3-card">{ cardAttr3 }</h6>
        <h5 data-testid="rare-card">{ cardRare }</h5>
        { this.checkTrunfo() }
      </div>
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
