/*Exercise 1 : Change the article
Using a DOM property, retrieve the h1 and console.log it.
Using DOM methods, remove the last paragraph in the <article> tag.
Add a event listener which will change the background color of the h2 to red, when it’s clicked on.
Add an event listener which will hide the h3 when it’s clicked on (use the display:none property).
Add a <button> to the HTML file, that when clicked on, should make the text of all the paragraphs, bold.
BONUS : When you hover on the h1, set the font size to a random pixel size between 0 to 100.(Check out this documentation)
BONUS : When you hover on the 2nd paragraph, it should fade out (Check out “fade css animation” on Google)*/

let h1 = document.querySelector('h1');
console.log(h1);

let article = document.querySelector('article');
article.removeChild(document.querySelector('article > p:last-child'));

let h2 = document.querySelector('h2');
h2.addEventListener("click", ChangeColorH2);
function ChangeColorH2(e) {
    e.target.style.color = "red";
}

let h3 = document.querySelector('h3');
h3.addEventListener("click", HideH3);
function HideH3(e) {
    e.target.style.display = "none";
}

let btn_highlight = document.getElementById("btn_highlight");
btn_highlight.addEventListener("click", HighlightBoldP);
function HighlightBoldP() {
    document.querySelectorAll('article > p').forEach(p => {
      p.style.fontWeight = "bold";
    });
}

h1.addEventListener("mouseover", ChangeFontSizeRandom);
function ChangeFontSizeRandom(e) {
    const randomSize = Math.floor(Math.random() * 101);
    e.target.style.fontSize = randomSize + 'px';
}

let p = document.querySelectorAll('p')[1];
p.setAttribute("style", "opacity: 1;");
p.addEventListener("mouseover", FadeOut);
function FadeOut(e) {
    e.target.setAttribute("style", "opacity: 0; transition: opacity 2s ease-in-out;");
}



/*.fade-element {
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}


.fade-element.is-visible {
  opacity: 1;
}


const element = document.querySelector('.fade-element');
const button = document.querySelector('#toggle-btn');

button.addEventListener('click', () => {
  // For transitions
  element.classList.toggle('is-visible');

  // OR for one-time keyframe animation
  // element.classList.add('fade-in-animate');
});*/