const URL_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";

/** 
 * Muestra informacion de un pokemon en pantalla
 * 
*/
const ShowCard = (pokemon) => {
    console.log(pokemon);

    const containerList = document.querySelector("#container-list");
    const li = document.createElement('li');

    const pokemonName = document.createElement('h3');
    pokemonName.innerText = pokemon.name;
    li.appendChild(pokemonName);

    containerList.appendChild(li);
}

fetch(URL_ENDPOINT)
.then(data => data.json())
.then(result => {
    const results = result.results;
    const primerResultado = results[0];
    ShowCard(primerResultado);
    
});