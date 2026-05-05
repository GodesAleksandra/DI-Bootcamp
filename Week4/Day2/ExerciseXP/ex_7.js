/*Exercise 7 : Welcome
John has just signed in to your website and you want to welcome him.
Create a Navbar in your HTML file.
In your js file, create a self invoking function that takes 1 argument: the name of the user that just signed in.
The function should add a div in the nabvar, displaying the name of the user and his profile picture.*/

(function (user) {
    const navbar = document.getElementById("navbar");
    const div = document.createElement("div");
    div.textContent = user;
    navbar.appendChild(div);
    const img = document.createElement('img');
    img.src = "profile_picture.png";
    img.width = 100;
    navbar.appendChild(img);
})("Anna");