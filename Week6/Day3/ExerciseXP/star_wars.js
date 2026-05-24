let button = document.querySelector('#button');
let names = document.querySelector('#name');
let height = document.querySelector('#height');
let gender = document.querySelector('#gender');
let birthYear = document.querySelector('#birth-year');
let homeWorld = document.querySelector('#home-world');

const getStarWarsInfo = async () => {
    try {
        updateWithLoading();
        let randomNumber = Math.floor(Math.random() * 83);
        let apiUrl = 'https://www.swapi.tech/api/people/' + randomNumber + '/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            //throw new Error("Something went wrong")
            updateInfoWithError();
            console.log('there was an error');
        } else {
            //console.log("response", response)
            let data = await response.json();
            //console.log("data", data);
            names.innerText = data.result.properties.name;
            height.innerText = `Height: ${data.result.properties.height}`;
            gender.innerText = `Gender: ${data.result.properties.gender}`;
            birthYear.innerText = `Birth Year: ${data.result.properties.birth_year}`;
            homeWorld.innerText = `Home World: ${data.result.properties.planet}`;
        }
    } catch (err) {
        updateInfoWithError();
        console.log("In the catch ", err);
    }
}

function updateInfoWithError(){
  names.innerText = "Oh No! That person isn't available.";
  height.innerText = '';
  gender.innerText = '';
  birthYear.innerText = '';
  homeWorld.innerText = '';
}

function updateWithLoading(){
  names.innerHTML = '<i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i> <p>Loading...</p>';
  height.innerText = '';
  gender.innerText = '';
  birthYear.innerText = '';
  homeWorld.innerText = '';
}


button.addEventListener('click', getStarWarsInfo);