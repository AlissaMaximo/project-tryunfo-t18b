import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <input type="text" data-testid="name-input" />
      </form>
    );
  }
}

export default Form;
