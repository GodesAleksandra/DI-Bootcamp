/*Exercise 2 : Lifecycle
First : Do the exercise xp 4 of yesterday using Class Components

Part I : shouldComponentUpdate
Use the shouldComponentUpdate() method and set it to return true.
If you set the return value of the shouldComponentUpdate() method to false, you won’t be able to change the value of the favoriteColor property to “blue”, (even after clicking on the button)

Part II: componentDidUpdate
When the component is mounting, it will be rendered with the favorite color “red”.
2. When the component has been mounted, a timer changes the state, and the color becomes “yellow”. 
3. In the componentDidUpdate method, add a console.log("after update"). Open the Dev Tools, to see when this message is displayed.

Part III : getSnapshotBeforeUpdate
Use the getSnapshotBeforeUpdate() method, add a console.log("in getSnapshotBeforeUpdate"). 
Open the Dev Tools, to see when this message is displayed.

Exercise 3 : Lifecycle #2
Using the previous exercise (Exercise 2 : Lifecycle)
Add a new property named show to the state object. Set the value of this property to true.
Add a Class component named Child to the same file. This new component will render a ‘Hello World!’ message in a header tag.
This new component uses the componentWillUnmount method to alert an unmounted message.
Render the Child component in your App, only if the value of the show property is set to true.
Create a “Delete” button that when clicked on (ie. onClick) will call a function that updates the value of the show property to false.*/

import React from 'react';

class Child extends React.Component {
  componentWillUnmount() {
    alert("The component named Child is about to be unmounted.");
  }

  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}

class Color extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoriteColor: "red",
            show: true
        };
    }

    changeFavoriteColor = (event) => {
        this.setState({ favoriteColor: "blue" });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; 
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
        this.setState({ favoriteColor: "yellow" });
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("in getSnapshotBeforeUpdate");
        return null; 
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("after update");
    }

    deleteChild = () => {
        this.setState({ show: false });
    };

    render() {
        return (
            <div>
                <h1>My favorite color is {this.state.favoriteColor}</h1>
                <button type="button" onClick={this.changeFavoriteColor}> Change color</button>
                {this.state.show && <Child />}
                <button type="button" onClick={this.deleteChild}> Delete Header</button>
            </div>
        )
    }

};

export default Color;