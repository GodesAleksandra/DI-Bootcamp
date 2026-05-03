/* Exercise 3 : Transform the sentence
Declare a global variable named allBoldItems.
Create a function called getBoldItems() that takes no parameter.
This function should collect all the bold items inside the paragraph and assign them to the allBoldItems variable.
Create a function called highlight() that changes the color of all the bold text to blue.

Create a function called returnItemsToDefault() that changes the color of all the bold text back to black.
Call the function highlight() on mouseover (ie. when the mouse pointer is moved onto the paragraph),
and the function returnItemsToDefault() on mouseout (ie. when the mouse pointer is moved out of the paragraph).*/

let allBoldItems;

function getBoldItems() {
    allBoldItems = document.querySelectorAll('p strong, p b');
    //console.log(allBoldItems);
}
getBoldItems();

function highlight() {
    allBoldItems.forEach(p => {
      p.style.color = "blue";
    });
}

/*function returnItemsToDefault() {

}*/

highlight();