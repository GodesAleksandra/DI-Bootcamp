/**/
import React, { useState } from 'react';
import './App.css';

function App() {
  const [languages, setLanguages] = useState([
                                              {name: "Php", votes: 0},
                                              {name: "Python", votes: 0},
                                              {name: "JavaSript", votes: 0},
                                              {name: "Java", votes: 0}
                                            ])

  const changeLanguageVotes = (index) => {
      const updatedLanguages = [...languages];
      updatedLanguages[index].votes += 1;
      setLanguages(updatedLanguages);
  }

  return (
    <div id="root">
      <h1>Vote Your Language!</h1>
      <div class="languages">
        {languages.map((language, index) => (
          <div key={index} class="language">
            <div class="voteCount">{language.votes}</div>
            <div class="languageName">{language.name}</div>
            <button type="button" onClick={() => changeLanguageVotes(index)}>Click Here</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
