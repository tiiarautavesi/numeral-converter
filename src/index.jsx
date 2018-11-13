import React from 'react';
import ReactDOM from 'react-dom';

function romanToArabic(roman) {
  if(roman == null)
    return -1;
  var totalValue = 0, 
    value = 0, // Initialise!
    prev = 0;

  for(var i=0;i<roman.length;i++) {
    var current = charToInt(roman.charAt(i));
    if (current > prev) {
        // Undo the addition that was done, turn it into subtraction
        totalValue -= 2 * value;
    }
    if (current !== prev) { // Different symbol?
        value = 0; // reset the sum for the new symbol
    }
    value += current; // keep adding same symbols
    totalValue += current;
    prev = current;
  }
  return totalValue;
}

function charToInt(character) {
  switch(character) {
    case 'I': return 1;
    case 'V': return 5;
    case 'X': return 10;
    case 'L': return 50;
    case 'C': return 100;
    case 'D': return 500;
    case 'M': return 1000;
    default: return -1;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      givenNumber: '',
      convertedNumber: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const convertCurrNumber = romanToArabic(value);
    
    this.setState({
      [name]: value,
      convertedNumber: convertCurrNumber
    });
    
    
  }
  
  handleSubmit(event) {
    console.log('A number was submitted: ' + this.state.givenNumber + 'A number was converted: ' + this.state.convertedNumber);
    event.preventDefault(); 
  }

  

  render() {
    
    return (
      <div className="app">
        <h1>Convert Roman numerals to Arabic numerals</h1>
        <p>Write a Roman number you want to convert for example: "MDCLXVI"
        <br/>
        If your written number is not written correctly the answer might seem a bit funny.</p>
        <form className="form" onSubmit={this.handleSubmit}>
          <input name="givenNumber" className="input" type="text" value={this.state.givenNumber} onChange={this.handleChange} />
        </form>
        <p className="convertedNumber">Answer: <br />{this.state.convertedNumber}</p>
        <footer>&#169; 2018 Tiia Rautavesi</footer>
      </div>
    );
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('app')
);
