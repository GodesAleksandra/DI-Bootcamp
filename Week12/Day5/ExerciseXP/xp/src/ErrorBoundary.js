import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo){
    this.setState({ hasError: true });
  }


    render() {
        if (this.state.hasError) {
            return (
                <div style={{ border: '2px solid red', padding: '15px', margin: '10px 0', backgroundColor: '#fff5f5' }}>
                    <h2 style={{ color: 'red', margin: '0 0 10px 0' }}>Something went wrong.</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;