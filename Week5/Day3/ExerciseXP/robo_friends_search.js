const robots = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        image: 'https://robohash.org/1?200x200'
      },
      {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
        image: 'https://robohash.org/2?200x200'
      },
      {
        id: 3,
        name: 'Clementine Bauch',
        username: 'Samantha',
        email: 'Nathan@yesenia.net',
        image: 'https://robohash.org/3?200x200'
      },
      {
        id: 4,
        name: 'Patricia Lebsack',
        username: 'Karianne',
        email: 'Julianne.OConner@kory.org',
        image: 'https://robohash.org/4?200x200'
      },
      {
        id: 5,
        name: 'Chelsey Dietrich',
        username: 'Kamren',
        email: 'Lucio_Hettinger@annie.ca',
        image: 'https://robohash.org/5?200x200'
      },
      {
        id: 6,
        name: 'Mrs. Dennis Schulist',
        username: 'Leopoldo_Corkery',
        email: 'Karley_Dach@jasper.info',
        image: 'https://robohash.org/6?200x200'
      },
      {
        id: 7,
        name: 'Kurtis Weissnat',
        username: 'Elwyn.Skiles',
        email: 'Telly.Hoeger@billy.biz',
        image: 'https://robohash.org/7?200x200'
      },
      {
        id: 8,
        name: 'Nicholas Runolfsdottir V',
        username: 'Maxime_Nienow',
        email: 'Sherwood@rosamond.me',
        image: 'https://robohash.org/8?200x200'
      },
      {
        id: 9,
        name: 'Glenna Reichert',
        username: 'Delphine',
        email: 'Chaim_McDermott@dana.io',
        image:'https://robohash.org/9?200x200'
      },
      {
        id: 10,
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
        image:'https://robohash.org/10?200x200'
      }
];

const robot_container = document.getElementById("robot-container");

const input = document.getElementById("search");
input.addEventListener("input", searchCards(event));
function searchCards(value) {
    document.querySelectorAll('card').forEach(card => {
      console.log(card);
      console.log(event.target.value);
    });
}

function createCard(id) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute('id', id);
    card.style.backgroundImage = "url('card-pattern.png')";
    card.style.backgroundColor = "#2ED1CC";
    robot_container.appendChild(card);
}

function createTextElement(text, id, font_size, font_weight) {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.fontSize = font_size;
    p.style.fontWeight  = font_weight;
    p.style.lineHeight = "0.1";
    document.getElementById(id).appendChild(p);
}

(function displayCards() {
    let div_card, img;
    robots.forEach(robot => {
        createCard(robot.id);
        div_card = document.getElementById(robot.id);
        img = document.createElement('img');
        img.src = robot.image;
        img.width = 200;
        img.classList.add('rounded-border');
        div_card.appendChild(img);
        createTextElement(robot.name, robot.id, "20px", "bold");
        createTextElement(robot.username, robot.id, "16px", "normal");
        createTextElement(robot.email, robot.id, "12px", "normal");
     });
})()

/**/