import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
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
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
};

Card.defaultProps = {
  cardName: 'default',
  cardDescription: 'default',
  cardAttr1: 'default',
  cardAttr2: 'default',
  cardAttr3: 'default',
  cardImage: 'default',
  cardRare: 'default',
  cardTrunfo: 'default',
};

export default Card;
