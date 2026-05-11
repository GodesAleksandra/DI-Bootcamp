/*Daily challenge: Anagram
Create a function that:
takes in two strings as two parameters
and returns a boolean that indicates whether or not the first string is an anagram of the second string.
Some Help
What is an anagram?
An anagram is another word or phrase formed by rearranging letters of the first word or phrase.
Example of anagrams
"Astronomer" is an anagram of "Moon starer"
"School master" is an anagram of "The classroom"
"The Morse Code" is an anagram of "Here come dots"*/

function isAnagram(str1, str2) {
    const letters1 = [...str1.toLowerCase().replace(/\s/g, '')].sort();
    const letters2 = [...str2.toLowerCase().replace(/\s/g, '')].sort();
    const isEqual = letters1.length === letters2.length &&
                letters1.every((val, index) => val === letters2[index]);
    return isEqual;
    //return letters1.join('') === letters2.join('');
}

isAnagram('Astronomer', 'Moon starer');
isAnagram('School master', 'The classroom');
isAnagram('The Morse Code', 'Here come dots');