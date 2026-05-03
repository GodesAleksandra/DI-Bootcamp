/*Exercice 4 : Volume of a sphere
Write a JavaScript program to calculate the volume of a sphere*/

const myForm = document.getElementById('MyForm');
const volume = document.getElementById('volume');

myForm.addEventListener("submit", calculateVolume);
function calculateVolume(event){
    event.preventDefault(); //prevent the default form submission action using JavaScript to implement custom actions such as form validation before the form data is sent to the server
    let formData = new FormData(event.target);
    let radius = formData.get('radius');
    volume.value = (4 / 3) * Math.PI * Math.pow(radius, 3);
}