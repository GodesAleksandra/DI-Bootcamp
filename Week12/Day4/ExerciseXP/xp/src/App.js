/*Exercise 1 : React Error Boundary Simulation
Review

Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
We will catch JavaScript errors anywhere in child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

Instructions
In the App.js file create a class component named BuggyCounter.

This component :
will hold a counter property in the state. The counter value starts at 0.
will render the counter. Every time the users clicks on it, the function handleClick() will be called, and add +1 to the counter property.

If the counter reaches 5, you will throw an error ‘I crashed!’

In another Javascript file, create the ErrorBoundary class component, it will hold an error property in the state. The error value is set to null.
Use the componentDidCatch lifecycle to set the value of the error property.
Render an error message with some details. (We will use this component to wrap the BuggyCounter component in our below simulations)
Use this below code to show the Error

<details style={{ whiteSpace: 'pre-wrap' }}>
    {this.state.error && this.state.error.toString()}
    <br />
    {this.state.errorInfo.componentStack}
</details>

Simulation 1:
In our first simulation we will wrap up two BuggyCounter components with one ErrorBoundary component
Note : Because both of them are in the same error boundary. If one crashes, the error boundary will replace both of them.

Simulation 2:
In our second simulation we will have two BuggyCounter components, and each one of them will be wrapped up with one ErrorBoundary component
Note : This time, each BuggyCounter component is in its own error boundary. So if one crashes, the other is not affected

Simulation 3:
In our third simulation we have only one BuggyCounter component, and its not beeing wrapped up by ErrorBoundary component
Note : This time, because the BuggyCounter component is not wrapped up in an error boundary, when it crashes, all the other components will be deleted and a blank page with errors will be displayed.
*/

import './App.css';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import BuggyCounter from './BuggyCounter';
import Color from './Color';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>React Error Boundary Simulation</h1>      
        <hr />

        {/* Simulation 1 */}
        <section style={{ marginBottom: '40px' }}>
          <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
          <ErrorBoundary>
            <BuggyCounter />
            <BuggyCounter />
          </ErrorBoundary>
        </section>

        <hr />

        {/* Simulation 2 */}
        <section style={{ marginBottom: '40px' }}>
          <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
          <ErrorBoundary>
            <BuggyCounter />
          </ErrorBoundary>
        </section>

        <hr />

        {/* Simulation 3 */}
        <section style={{ marginBottom: '40px' }}>
          <p>This counter is not inside of boundary. So if crashes, all other components are deleted.</p>
          <BuggyCounter />
        </section>
        <hr />
        <Color />
      </div>
    );
  }
}


export default App;