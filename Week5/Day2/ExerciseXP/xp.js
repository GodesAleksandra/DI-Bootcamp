/* Exercise 1 : HTML Form
form
Create a form. The form should contain three inputs:
a small text input asking for a name,
a larger textarea input to write a message,
a submit input (“Send”)
When you click the Send button, the form will be submitted with a GET method. (you can use the same HTML file for the action url)
Where will the sent data appear?*/

/* When the element’s method attribute is GET (or is omitted), the information in the form is added to the end of the action URL as a query string:
file:///C:/Users/1/Desktop/DI-Bootcamp/Week5/Day2/ExerciseXP/xp.html?name=Aleksandra&comments=no+comments
In the Network tab:
Request URL
file:///C:/Users/1/Desktop/DI-Bootcamp/Week5/Day2/ExerciseXP/xp.html?name=Aleksandra&comments=no+comments
Request Method
GET

Query String Parameter
name  Aleksandra
comments  no comments*/

/*Exercise 2 : HTML Form #2
Use the same form structure as Exercise 1.
When you click the Send button, the form will be submitted with a POST method.(you can use the same HTML file for the action url)
Where will the sent data appear? Hint : Look at the Network Tab*/

/*If we change the method to POST, we get the information as part of the data body:
Request URL: file:///C:/Users/1/Desktop/DI-Bootcamp/Week5/Day2/ExerciseXP/ex_2.html
Request Method: POST

From Data
name: Aleksandra
comments: no comments

ContentType "application/x-www-form-urlencoded"
Body "name=Aleksandra&comments=no+comments"*/

/*Exercise 3 : JSON Mario
Convert this JS object into a JSON object. What happens to the nested objects ?
Convert and pretty print this JS object into a JSON object. Hint : Check out the JSON lesson on the platform.
Use your web inspector to add a breakpoint. Check the values of the JSON object in the debugger.
*/

const marioGame = {
  detail : "An amazing game!",
  characters : {
      mario : {
        description:"Small and jumpy. Likes princesses.",
        height: 10,
        weight: 3,
        speed: 12,
      },
      bowser : {
        description: "Big and green, Hates princesses.",
        height: 16,
        weight: 6,
        speed: 4,
      },
      princessPeach : {
        description: "Beautiful princess.",
        height: 12,
        weight: 2,
        speed: 2,
      }
  },
}

let jsonMarioGame = JSON.stringify(marioGame);
console.log(jsonMarioGame); //Output: {"detail":"An amazing game!","characters":{"mario":{"description":"Small and jumpy. Likes princesses.","height":10,"weight":3,"speed":12},"bowser":{"description":"Big and green, Hates princesses.","height":16,"weight":6,"speed":4},"princessPeach":{"description":"Beautiful princess.","height":12,"weight":2,"speed":2}}}
//When you convert a JS object to JSON using JSON.stringify(), nested objects are automatically and recursively converted into JSON strings.

let jsonMarioGamePr = JSON.stringify(marioGame, null, 2);
console.log(jsonMarioGamePr);
/* Output:
{
  "detail": "An amazing game!",
  "characters": {
    "mario": {
      "description": "Small and jumpy. Likes princesses.",
      "height": 10,
      "weight": 3,
      "speed": 12
    },
    "bowser": {
      "description": "Big and green, Hates princesses.",
      "height": 16,
      "weight": 6,
      "speed": 4
    },
    "princessPeach": {
      "description": "Beautiful princess.",
      "height": 12,
      "weight": 2,
      "speed": 2
    }
  }
}*/

