/*Daily challenge: Not Bad
Create a variable called sentence. The value of the variable should be a string that contains the words “not” and “bad”.
For example, “The movie is not that bad, I like it”.
Create a variable called wordNot where it’s value is the first appearance (ie. the position) of the substring “not” (from the sentence variable).
Create a variable called wordBad where it’s value is the first appearance (ie. the position) of the substring “bad” (from the sentence variable).
If the word “bad” comes after the word “not”, you should replace the whole “not…bad” substring with “good”, then console.log the result.
For example, the result here should be : “The movie is good, I like it”
If the word “bad” does not come after “not” or the words are not in the sentence, console.log the original sentence.
Your string is : 'This dinner is not that bad ! You cook well',
  --> the result is : 'This dinner is good ! You cook well'

  Your string is : 'This movie is not so bad !'
  --> the result is : 'This movie is good !'

  Your string is : 'This dinner is bad !'
  --> the result is : 'This dinner is bad !'*/

let sentence = "This dinner is not that bad ! You cook well";
let wordNot = sentence.indexOf("not");
let wordBad = sentence.indexOf("bad");
let new_sentence = '';

if (wordBad > wordNot && wordBad !== -1 && wordNot !== -1) {
    new_sentence = sentence.substring(0,wordNot) + 'good' + sentence.substring(wordBad + 3);
} else new_sentence = sentence;

console.log(new_sentence);