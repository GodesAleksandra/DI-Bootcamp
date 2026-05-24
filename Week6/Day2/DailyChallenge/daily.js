/*Daily Challenge: Gifs
Use this Giphy API Random documentation. Use this API Key : hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My
In the HTML file, add a form, containing an input and a button. This input is used to fetch gif depending on a specific category.
In the JS file, create a program to fetch one random gif depending on the search of the user (ie. If the search is “sun”, append on the page one gif with a category of “sun”).
The gif should be appended with a DELETE button next to it. Hint : to find the URL of the gif, look for the sub-object named “images” inside the data you receive from the API.
Allow the user to delete a specific gif by clicking the DELETE button.
Allow the user to remove all of the GIFs by clicking a DELETE ALL button.*/

/*OVERALL EVALUATION OF ALL URLS ABOVE
• The core requirement was to use async/await and try/catch, but the solution uses .then() and .catch() promise chains instead. While this works, it doesn't follow the specific instructions of the exercise. The async keyword on the function is present, but await is never used.
• The instructions specified using the Giphy API's 'random' endpoint. The code uses the 'search' endpoint with a random offset. While this is a creative way to get a random-seeming result, it doesn't follow the documentation provided in the prompt.
• The delete and delete-all functionalities are implemented very well. The use of event.target.closest('.gif_div') is a great, robust way to handle the single delete.
• Consider refactoring the API call to use the async/await syntax with a try/catch block for error handling, as this was a key learning objective of the challenge.
• The HTML for the delete button uses <i class="material-icons">delete</i>, but the required Google Fonts/Icons stylesheet is not linked in the HTML file, so the icon will not render correctly.
*/



formElem.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formElem);
    const category = formData.get('category'); // Matches the 'name' attribute in HTML
    const randomInt = Math.floor(Math.random() * 499);
    const url = `https://api.giphy.com/v1/gifs/search?q=${category}&limit=1&offset=${randomInt}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`;

    fetch(url)
        .then((response) => {
            if(response.ok){
                return response.json()
            } else {
                throw new Error("Wrong gif")
            }
        })
        .then((result) => {
            const image_div = document.createElement("div");
            image_div.classList.add('gif_div');
            document.body.append(image_div);
            const image_url = result.data[0].images.original.url;
            const img = document.createElement("img");
            img.src = image_url;
            img.width = 100;
            image_div.append(img);
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="material-icons">delete</i>';
            deleteBtn.addEventListener('click', (event) => {
                const itemToRemove = event.target.closest('.gif_div');
                if (itemToRemove) {
                    itemToRemove.remove();
                }
            });
            image_div.append(deleteBtn);
        })
        .catch(function (error) {
            console.log(`We got the error ${error}`)
        });
};
const deleteAllBtn = document.getElementById("deleteAll");
deleteAllBtn.addEventListener('click', (event) => {
    document.querySelectorAll('.gif_div').forEach(el => el.remove());
});