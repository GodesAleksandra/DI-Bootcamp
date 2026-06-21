/*Daily Challenge: Emoji Guessing Game
Create a fun emoji guessing game using an Express API.
The game will present players with a random emoji and a set of options. Players need to guess the correct name of the emoji from 
the given options. The game will keep track of the player’s score and provide feedback on their guesses.

Requirements:
Set up an Express server to handle the game.
Create an array of emoji objects, each containing the emoji character and its corresponding name.
Generate a random emoji from the array and select a few incorrect options as distractors.
Using a form, present the player with the random emoji and multiple choice options (including the correct name).
Allow the player to submit their guess. Get the data from the form and POST it, using the Fetch API.
Check if the guess is correct and update the player’s score.
Provide feedback to the player, indicating whether their guess was correct or not.
Continue presenting new emojis and options for the player to guess.
Keep track of the player’s total score.
Implement a leaderboard to show the top scores.
Advanced Features (Optional):
Add a time limit for each guess.
Implement user authentication to save and display personalized scores.
Use emojis from a larger dataset or an external API.
Implement difficulty levels that affect the number of options or time limit.
Implement a “hint” feature that provides a clue about the emoji’s name.*/


const express = require("express");
const app = express();
const PORT = 3000;
const session = require('express-session');

app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'emoji-game-secret',
    resave: false,
    saveUninitialized: true
}));

const emojis = [
    { emoji: '😀', name: 'Smile', hint: 'expressing happiness or amusement' },
    { emoji: '😂', name: 'Face with Tears of Joy', hint: 'uncontrollable laughter or finding something incredibly hilarious' },
    { emoji: '😍', name: 'Smiling Face with Heart-Eyes', hint: 'expressing love or adoration' },
    { emoji: '😎', name: 'Smiling Face with Sunglasses', hint: 'confident or cool appearance' },
    { emoji: '🤔', name: 'Thinking Face', hint: 'engaged in deep thought' },
    { emoji: '😭', name: 'Loudly Crying Face', hint: 'expressing deep sadness or distress' },
    { emoji: '😱', name: 'Face Screaming in Fear', hint: 'experiencing intense fear or shock' },
    { emoji: '🦄', name: 'Unicorn Face', hint: 'mythical creature with a single horn' },
    { emoji: '🦘', name: 'Kangaroo', hint: 'marsupial from Australia' },
    { emoji: '🐶', name: 'Dog', hint: 'loyal companion animal' },
    { emoji: '🐱', name: 'Cat', hint: 'independent and graceful feline' },
    { emoji: '🍿', name: 'Popcorn', hint: 'snack made from corn kernels' },
    { emoji: '☕', name: 'Hot Beverage', hint: 'beverage served hot, often coffee or tea' },
    { emoji: '🌮', name: 'Taco', hint: 'traditional Mexican dish with a folded tortilla' },
    { emoji: '🍕', name: 'Pizza', hint: 'Italian dish with tomato sauce and cheese' },
    { emoji: '🍔', name: 'Burger', hint: 'sandwich with a grilled patty' },
    { emoji: '🍎', name: 'Apple', hint: 'red or green fruit growing on trees' },
    { emoji: '🚗', name: 'Car', hint: 'motor vehicle for transportation' },
    { emoji: '🌈', name: 'Rainbow', hint: 'arc of colors in the sky' },
    { emoji: '🌵', name: 'Cactus', hint: 'succulent plant with spines' },
    { emoji: '🌋', name: 'Volcano', hint: 'mountain that erupts lava' },
    { emoji: '🏔️', name: 'Snow-Capped Mountain', hint: 'mountain with snow at the peak' },
    { emoji: '🏝️', name: 'Desert Island', hint: 'island in a desert region' },
    { emoji: '🏰', name: 'Castle', hint: 'medieval fortress or palace' },
    { emoji: '🎉', name: 'Party', hint: 'celebration or festive occasion' },
    { emoji: '🎂', name: 'Cake', hint: 'sweet dessert typically served at celebrations' },
    { emoji: '🎁', name: 'Gift', hint: 'present or offering given to someone' },
    { emoji: '🎈', name: 'Balloon', hint: 'inflated rubber sphere, often used for decoration' },
    { emoji: '📚', name: 'Books', hint: 'collection of written or printed works' },
    { emoji: '⚽', name: 'Soccer', hint: 'football game played with a spherical ball' },
    { emoji: '🎵', name: 'Music', hint: 'art of sound in time' },
    { emoji: '🌍', name: 'Earth', hint: 'third planet from the sun' },
    { emoji: '🚀', name: 'Rocket', hint: 'vehicle for space travel' },
    { emoji: '🌟', name: 'Star', hint: 'glowing celestial body' },
    { emoji: '🌞', name: 'Sun', hint: 'star at the center of our solar system' },
    { emoji: '🌜', name: 'Moon', hint: 'natural satellite of Earth' },
    { emoji: '🎤', name: 'Microphone', hint: 'device for converting sound into electrical signals' },
    { emoji: '🎬', name: 'Clapperboard', hint: 'tool for signaling the start of a film shoot' },
    { emoji: '🎮', name: 'Video Game', hint: 'interactive entertainment medium' },
    { emoji: '🎲', name: 'Dice', hint: 'small cube with numbered faces used in games of chance' },
    { emoji: '🎯', name: 'Target', hint: 'bullseye or center of a circular mark' },
    { emoji: '🎳', name: 'Bowling', hint: 'game played with a ball and pins' },
    { emoji: '🎻', name: 'Violin', hint: 'string instrument played with a bow' },
    { emoji: '🎸', name: 'Guitar', hint: 'plucked string instrument' },
    { emoji: '🎹', name: 'Piano', hint: 'keyboard instrument with strings' },
    { emoji: '🎺', name: 'Trumpet', hint: 'brass instrument played by buzzing the lips into a mouthpiece' },
    { emoji: '🎷', name: 'Saxophone', hint: 'woodwind instrument with a reed and bell' },
    { emoji: '🎼', name: 'Musical Score', hint: 'written representation of music' },
    { emoji: '🔑', name: 'Key', hint: 'tool for opening locks' },
    { emoji: '🔔', name: 'Bell', hint: 'device that makes a ringing sound' },
    { emoji: '👑', name: 'Crown', hint: 'ornamental headdress worn by royalty' },
    { emoji: '🔮', name: 'Crystal Ball', hint: 'spherical object used for divination' },
    { emoji: '🎒', name: 'School Backpack', hint: 'bag used by students to carry books and supplies' },
    { emoji: '⏰', name: 'Alarm Clock', hint: 'clock that rings at a set time' }
];

let leaderboard = [];
let users = {};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

app.get('/api/next-emoji', (req, res) => {
  if (!req.session.score) req.session.score = 0;
  const correct = getRandom(emojis);

 let options = [correct.name];
  
  while (options.length < 4) {
    const option = getRandom(emojis).name;
    if (!options.includes(option)) options.push(option);
  }

  options = shuffle(options); 

  res.json({
    emoji: correct.emoji,
    hint: correct.hint,
    correctName: correct.name,
    options
  });
});

// Submit guess & verify
app.post('/api/guess', (req, res) => {
  const { guess, correctName, difficulty } = req.body;
  const isCorrect = guess === correctName;

  const points = difficulty === 'hard' ? 20 : difficulty === 'medium' ? 10 : 5;
  
  res.json({
    correct: isCorrect,
    pointsAwarded: isCorrect ? points : 0,
    correctName: correctName
  });
});

app.post('/api/leaderboard', (req, res) => {
  const { username, score } = req.body;
  leaderboard.push({ username, score });
  leaderboard.sort((a, b) => b.score - a.score);
  // Keep top 5
  leaderboard = leaderboard.slice(0, 5);
  res.json({ leaderboard });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));