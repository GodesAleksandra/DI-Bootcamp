/*In another Javascript file, create the ErrorBoundary class component, it will hold an error property in the state. The error value is set to null.
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

import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo: errorInfo
    });
  }


    render() {
        if (this.state.error) {
            return (
                <div style={{ border: '2px solid red', padding: '15px', margin: '10px 0', backgroundColor: '#fff5f5' }}>
                    <h2 style={{ color: 'red', margin: '0 0 10px 0' }}>Something went wrong.</h2>
                    <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;