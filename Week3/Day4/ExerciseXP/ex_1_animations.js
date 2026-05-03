/*Exercise 1: Timer
Part I
In your Javascript file, using setTimeout, call a function after 2 seconds.
The function will alert “Hello World”.
Part II
In your Javascript file, using setTimeout, call a function after 2 seconds.
The function will add a new paragraph <p>Hello World</p> to the <div id="container">.
Part III
In your Javascript file, using setInterval, call a function every 2 seconds.
The function will add a new paragraph <p>Hello World</p> to the <div id="container">.
The interval will be cleared (ie. clearInterval), when the user will click on the button.
Instead of clicking on the button, the interval will be cleared (ie. clearInterval) as soon as there will be 5 paragraphs inside the <div id="container">.
*/

function Greeting() {
    alert("Hello World");
}
setTimeout(Greeting, 2000);

function AddParagraph() {
    const p = document.createElement("p");
    p.textContent = "Hello World";
    document.getElementById("container").appendChild(p);
}
setTimeout(AddParagraph, 2000);

const timer = setInterval(() => {
  if (document.querySelectorAll('p').length == 5) {
    stopTimer();
  } else AddParagraph();
}, 2000);

function stopTimer() {
  clearInterval(timer);
  console.log("Interval stopped.");
}

document.getElementById('clear').addEventListener('click', () => {
    stopTimer();
});