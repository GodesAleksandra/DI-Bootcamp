/*Exercise 2 : Move the box
In your Javascript file, use setInterval to move the <div id="animate"> to the right side of the <div id="container">, when the button is clicked on.
The <div id="animate"> should move 1px to the right every milisecond, until it reaches the end of the <div id="container">.
Hint : use clearInterval as soon as the box reaches the right end side of the container
Hint : check out the demonstration in the Course Noted named JS Functions*/

function myMove() {
    let marginLeft = 0;
    const timer = setInterval(() => {
        const div_animate = document.getElementById('animate');
        div_animate.style.marginLeft = marginLeft + "px";
        if (marginLeft == 350) clearInterval(timer);
        marginLeft += 1;
    }, 1);
}