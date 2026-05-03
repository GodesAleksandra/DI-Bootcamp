/*Get the value of each of the inputs in the HTML file when the form is submitted. Remember the event.preventDefault()
Make sure the values are not empty
Write a story that uses each of the values.
Make sure you check the console for errors when playing the game.
Bonus: Add a “shuffle” button to the HTML file, when clicked the button should change the story currently displayed
(but keep the values entered by the user). The user could click the button at least three times and get a new story.
Display the stories randomly.*/

const libform = document.getElementById('libform');
const lib_button = document.getElementById('lib-button');

lib_button.addEventListener("click", generateStory);
function generateStory(event){
    event.preventDefault(); //prevent the default form submission action using JavaScript to implement custom actions such as form validation before the form data is sent to the server
    /*let formData = new FormData(libform);
    let noun = formData.get('noun');
    let adjective = formData.get('adjective');
    let person = formData.get('person');
    let verb = formData.get('verb');
    let place = formData.get('place');*/
    const noun = document.getElementById('noun').value;
    console.log(noun);

}

/*<label for="noun">Noun:</label><input type="text" id="noun"><br>
        <label for="adjective">Adjective:</label><input type="text" id="adjective"><br>
        <label for="person">Someone's Name:</label><input type="text" id="person"><br>
        <label for="verb">Verb:</label><input type="text" id="verb"><br>
        <label for="place">A place:</label><input type="text" id="place"><br>
        <button id="lib-button">Lib it!</button>*/