/*Exercise 5 : Users
Retrieve the div and console.log it
Change the name “Pete” to “Richard”.
Delete the second <li> of the second <ul>.
Change the name of the first <li> of each <ul> to your name. (Hint : use a loop)

Add a class called student_list to both of the <ul>'s.
Add the classes university and attendance to the first <ul>.

Add a “light blue” background color and some padding to the <div>.
Do not display the <li> that contains the text node “Dan”. (the last <li> of the first <ul>)
Add a border to the <li> that contains the text node “Richard”. (the second <li> of the <ul>)
Change the font size of the whole body.

Bonus: If the background color of the div is “light blue”, alert “Hello x and y” (x and y are the users in the div).
*/

let tag_li = document.getElementsByTagName("li");
let tag_ul = document.getElementsByTagName("ul");

tag_li[1].innerHTML = "Richard";
tag_ul[1].removeChild(tag_li[3]);

let elements = document.querySelectorAll('ul > li:first-child');

for (let elem of elements) {
    elem.innerHTML = "Aleksandra";
}

for (let elem of tag_ul) {
    elem.classList.add("student_list");
}
tag_ul[0].classList.add("university","attendance");

let div = document.getElementById('container');
div.style.background = 'lightblue';
div.style.padding = '10px';
