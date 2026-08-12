/*Exercise 3 : Display JSON Data and parse it
Create a json file and copy/paste this data. The file contains complex data with inner arrays up-to first and second level.
In a new Javascript file, create a Class Component named Example1 that displays the SocialMedias array data.
In a new Javascript file, create a Class Component named Example2 that displays the Skills data.
In a new Javascript file, create a Class Component named Example3 that displays the Experiences array data. Add a key attribute to every new <div>.
Import those components to the App.js file.*/

import React from 'react';
import exampleData from './examples.json';

class Example1 extends React.Component {
  render() {
    return (
      <div>
        <h2>Social Media Links</h2>
        <ul>
          {exampleData.SocialMedias.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Example2 extends React.Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>
        <ul>
          {exampleData.Skills.map((skillArea, index) => (
            <li key={index}>
              <h3>{skillArea.Area}</h3>
              <ul>
                {skillArea.SkillSet.map((skill, subIndex) => (
                  <li key={subIndex}>
                    {skill.Name} {skill.Hot && '(Hot Skill)'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Example3 extends React.Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        <ul>
          {exampleData.Experiences.map((experience, index) => (
            <li key={index}>
              <h3>{experience.companyName}</h3>
              <p>{experience.logo}</p>
              <a href={experience.url} target="_blank" rel="noopener noreferrer">
                Visit Company Website
              </a>
              <ul>
                {experience.roles.map((role, subIndex) => (
                  <li key={subIndex}>
                    <h4>{role.title}</h4>
                    <p>{role.description}</p>
                    <p><strong>Duration:</strong> {role.startDate} to {role.endDate}</p>
                    <p><strong>Location:</strong> {role.location}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export { Example1, Example2, Example3 };
