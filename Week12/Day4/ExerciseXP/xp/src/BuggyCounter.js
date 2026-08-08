import React from 'react';

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  }


  render() {
    if (this.state.counter === 5) {
      throw new Error('I crashed!');
    }

    return (
      <div 
        onClick={this.handleClick} 
        style={{ 
          padding: '10px', 
          margin: '5px', 
          backgroundColor: '#f0f0f0', 
          cursor: 'pointer',
          display: 'inline-block',
          border: '1px solid #ccc',
          userSelect: 'none'
        }}
      >
        {this.state.counter}
      </div>
    );
  }
}

export default BuggyCounter;