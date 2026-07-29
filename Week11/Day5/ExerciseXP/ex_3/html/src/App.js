/*Exercise 3 : HTML Tags in React
Instructions
PART I:
In a separate Javascript file, named Exercise3.js, create a new Class Component called Exercise that contains some HTML tags.
create a <h1> tag and set its color to red, and the background color to lightblue.
create a paragraph, a link, a form, an image and a list.
Import Exercise component to the App.js file and display it.

PART II:
Add the below object to the component Exercise. Use this object to style the <h1>.
const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

PART III:
Create a new css file named Exercise.css and import it in your Exercise component.
Add the following CSS properties to the CSS file, and apply them to the paragraph tag:
.para {
  background-color: #282c34;
  color: white;
  padding: 40px;
  font-family: Arial;
  text-align: center;
}*/

import logo from './logo.svg';
import './App.css';
import Exercise from './Exercise3';
import './Exercise.css';

function App() {
  return (
    <div className="App">
      <Exercise />
    </div>
  );
}

export default App;
