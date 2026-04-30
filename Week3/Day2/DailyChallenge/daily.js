/*Create an array which value is the planets of the solar system.
For each planet in the array, create a <div> using createElement. This div should have a class named "planet".
Each planet should have a different background color. (Hint: you could add a new class to each planet -
each class containing a different background-color).
Finally append each div to the <section> in the HTML (presented below).
Bonus: Do the same process to create the moons.
Be careful, each planet has a certain amount of moons. How should you display them?
Should you still use an array for the planets ? Or an array of objects ?*/

const planets = [{"name":"Mercury","color":"grey", "moons":[]},
{"name":"Venus","color":"yellow", "moons":[]},
{"name":"Earth","color":"green", "moons":["The Moon"]},
{"name":"Mars","color":"red", "moons":["Phobos", "Deimos"]},
{"name":"Jupiter","color":"orange", "moons":["Ganymede","Europa","Io","Callisto"]},
{"name":"Saturn","color":"gold", "moons":["Titan","Enceladus","Rhea","Mimas"]},
{"name":"Uranus","color":"cyan", "moons":["Miranda","Titania","Oberon"]},
{"name":"Neptune","color":"blue", "moons":["Triton"]}];

let section = document.getElementsByClassName('listPlanets')[0];

planets.forEach((planet, index) => {
    const div_planet = document.createElement("div");
    div_planet.classList.add("planet",planet.color);
    div_planet.style.background = planet.color;
    div_planet.textContent = planet.name;
    //div_planet.style.verticalAlign = "middle";
    section.appendChild(div_planet);

    for (let moon of planet.moons) {
        const div_moon = document.createElement("div");
        div_moon.classList.add("moon");
        div_moon.textContent = moon;
        div_moon.style.fontSize = "8px";
        div_moon.style.textAlign = "center";
        div_moon.style.paddingLeft = "110px";
        //div_moon.style.verticalAlign = "middle";
        section.appendChild(div_moon);
    }
});


