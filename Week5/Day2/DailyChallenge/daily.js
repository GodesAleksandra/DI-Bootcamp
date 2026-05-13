/*Daily challenge : HTML Form
Create a form with two fields (name, last name) and a submit button.
When you click the Send button, retrieve the data from the inputs, and append it on the DOM as a JSON string.
*/

form.addEventListener("submit", createJSON);
function createJSON(event){
    event.preventDefault();
    let formData = new FormData(event.target);
    let valFormJSON = "{";
    formData.forEach(function(value, key) {
        valFormJSON = valFormJSON + '"' + key + '":"' + value + '",';
    });
    valFormJSON = valFormJSON.slice(0, -1) + "}";
    p = document.createElement("p");
    p.textContent = valFormJSON;
    document.body.appendChild(p);
}