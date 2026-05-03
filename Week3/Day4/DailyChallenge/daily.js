/*Get the value of each of the inputs in the HTML file when the form is submitted. Remember the event.preventDefault()
Make sure the values are not empty
Write a story that uses each of the values.
Make sure you check the console for errors when playing the game.
Bonus: Add a “shuffle” button to the HTML file, when clicked the button should change the story currently displayed
(but keep the values entered by the user). The user could click the button at least three times and get a new story.
Display the stories randomly.*/

const libform = document.getElementById('libform');
const lib_button = document.getElementById('lib-button');
const lib_story = document.getElementById('story');

lib_button.addEventListener("click", generateStory);
function generateStory(event){
    event.preventDefault(); //prevent the default form submission action using JavaScript to implement custom actions such as form validation before the form data is sent to the server
    const noun = document.getElementById('noun').value;
    const adjective = document.getElementById('adjective').value;
    const person = document.getElementById('person').value;
    const verb = document.getElementById('verb').value;
    const place = document.getElementById('place').value;
    if (!noun || !adjective || !person || !verb || !place) alert("All fields are required");
    //console.log(noun);
    const libArr = [
    `${adjective} ${person} with ${noun} ${verb} in ${place}.`,
    `While ${verb} in ${place}, ${adjective} ${person} saw a ${noun}.`,
    `${adjective} ${person} loves to travel to ${place} and buy ${noun} while ${verb}.`];

    const randomInd = Math.floor(Math.random() * libArr.length);
    //madLibTextResult.innerText = madLibsArr[randomIndex];

    lib_story.textContent = libArr[randomInd];

}

/*<label for="noun">Noun:</label><input type="text" id="noun"><br>
        <label for="adjective">Adjective:</label><input type="text" id="adjective"><br>
        <label for="person">Someone's Name:</label><input type="text" id="person"><br>
        <label for="verb">Verb:</label><input type="text" id="verb"><br>
        <label for="place">A place:</label><input type="text" id="place"><br>
        <button id="lib-button">Lib it!</button>*/