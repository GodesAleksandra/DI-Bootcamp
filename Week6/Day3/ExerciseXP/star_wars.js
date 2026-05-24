const getStarWarsInfo = async () => {
    try {
        updateWithLoading();
        let randomNumber = Math.floor(Math.random() * 83);
        let apiUrl = 'https://www.swapi.tech/api/people/' + randomNumber + '/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Something went wrong")
        } else {
            //console.log("response", response)
            let data = await response.json();
            //console.log("data", data);
            let objectStarWars = data.result;
            console.log(objectStarWars);
        }
    } catch (err) {
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