import React from 'react';

class UserFavoriteAnimals extends React.Component {
  render() {
  const { animals } = this.props;
  return (
    <ul>
      {animals.map((animal, index) => (
        <li key={index}>{animal}</li>
      ))}
    </ul>
  );
}
}

export default UserFavoriteAnimals;