import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <input type="text" data-testid="name-input" />
        <textarea data-testid="description-input" />
        <input type="number" data-testid="attr1-input" />
        <input type="number" data-testid="attr2-input" />
        <input type="number" data-testid="attr3-input" />
        <input type="text" data-testid="image-input" />
        <select data-testid="rare-input">
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <input type="checkbox" data-testid="trunfo-input" id="trunfo" value="trunfo" />
        <button type="button" data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
