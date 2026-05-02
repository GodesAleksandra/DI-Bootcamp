/*Exercise 2 : Work with forms
Retrieve the form and console.log it.
Retrieve the inputs by their id and console.log them.
Retrieve the inputs by their name attribute and console.log them.
When the user submits the form (ie. submit event listener)
    use event.preventDefault(), why ?
    get the values of the input tags,
    make sure that they are not empty,
    create an li per input value,
    then append them to a the <ul class="usersAnswer"></ul>, below the form.
The output should be :

<ul class="usersAnswer">
    <li>first name of the user</li>
    <li>last name of the user</li>
</ul>*/

let form = document.forms[0];
console.log(form);
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let submit = document.getElementById('submit');
console.log(fname);
console.log(lname);
console.log(submit);
let firstname = form.elements.firstname;
let lastname = form.elements.lastname;
console.log(firstname);
console.log(lastname);


/*<input type="text" id="fname" name="firstname"><br>
      <label for="lname">Last name:</label><br>
      <input type="text" id="lname" name="lastname"><br><br>
      <input type="submit" value="Submit" id="submit">*/