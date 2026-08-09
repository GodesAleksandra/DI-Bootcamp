/*1.In the App.js You will create a stateful component with props.
2. Create a function named handleChange:
  that retrieves the event.target of the inputs.
  and checks the status of the checkboxes (ie. “checked” or not). Use a ternary operator.
3. Render a FormComponent that displays the form, and the value of the inputs.
4. On submit you will pass the entered data in the URL.*/

import React from 'react';
import FormComponent from './FormComponent';
import './App.css';

class App extends React.Component {
 constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      nutsFree: false,
      lactoseFree: false,
      isVegan: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { value, name, type, checked } = e.target;

    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  }

  render() {
    return <FormComponent handleChange={this.handleChange} {...this.state} />;
  }
}

export default App;