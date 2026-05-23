/*Daily Challenge: Gifs
Use this Giphy API Random documentation. Use this API Key : hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My
In the HTML file, add a form, containing an input and a button. This input is used to fetch gif depending on a specific category.
In the JS file, create a program to fetch one random gif depending on the search of the user (ie. If the search is “sun”, append on the page one gif with a category of “sun”).
The gif should be appended with a DELETE button next to it. Hint : to find the URL of the gif, look for the sub-object named “images” inside the data you receive from the API.
Allow the user to delete a specific gif by clicking the DELETE button.
Allow the user to remove all of the GIFs by clicking a DELETE ALL button.*/

formElem.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formElem);
    const category = formData.get('category'); // Matches the 'name' attribute in HTML
    const url = `https://api.giphy.com/v1/gifs/search?q=${category}&limit=1&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`;
    console.log(url);

    fetch(url)
        .then((response) => {
            if(response.ok){
                console.log('ok');
                return response.json()
            } else {
                throw new Error("Wrong gif")
            }
        })
        .then((result) => {
            console.log(result/*.images.url*/);
        })
        .catch(function (error) {
            console.log(`We got the error ${error}`)
        });

    /*let response = await fetch(url, {
        method: 'POST',
        body: formData
    });

    let result = await response.json();
    console.log(result.images.url);*/
};

    /*let formData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');
    console.log(formData);
    // // List key/value pairs
    for(let [name, value] of formData) {
        console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }*/