import React from 'react';
import Form from './components/Form';

/* Requisito 2 */
function handleInputChange() {
  console.log('oi do handleInputChange');
}

function handleSaveButtonClick() {
  console.log('oi do handleSaveButtonClick');
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName=""
          cardDescription=""
          cardAttr1=""
          cardAttr2=""
          cardAttr3=""
          cardImage=""
          cardRare=""
          cardTrunfo="false"
          hasTrunfo="false"
          isSaveButtonDisabled="false"
          onInputChange={ handleInputChange }
          onSaveButtonClick={ handleSaveButtonClick }
        />
      </div>
    );
  }
}

export default App;

/*
REFERÊNCIAS

*/
