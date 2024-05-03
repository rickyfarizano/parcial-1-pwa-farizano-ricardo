const pokemonId = window.location.href.split("?id=")[1];
const URL_ENDPOINT = "https://pokeapi.co/api/v2/";
const URL_POKEMON = URL_ENDPOINT + "pokemon/" + pokemonId;
const URL_POKEMON_CHARACT = URL_ENDPOINT + "pokemon-species/" + pokemonId; 

/** 
 * Me genera las cards para cada Pokemon.
 * @param pokemon Un objeto que contenga los datos de tu pokemon.
 * @param characteristics Un objeto que contenga las caracteristicas de tu pokemon.
 */
const ShowCard = (pokemon, characteristics) => {
    const contenedor = document.querySelector("#container-list");
    const ul = document.createElement("ul");
    ul.classList.add("list-details-extended");

    const containerListDetails = document.createElement("div");
    containerListDetails.classList.add("container-list-details");
    
    const img = document.createElement("img");
    img.classList.add("img-details");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name + " sprite";

    const h3 = document.createElement("h3");
    h3.classList.add("pokemon-name-details");

    //Numero del pokemon
    const number = document.createElement("p");
    number.classList.add("number-details");
    number.innerText = `Numero: ${characteristics.order}`;

    // Ratio de captura
    const captureRatio = document.createElement("p");
    captureRatio.classList.add("ratio-details");
    captureRatio.innerText = `Ratio de captura: ${characteristics.capture_rate}`;

    const li = document.createElement("li");
    li.classList.add("list-item");

    const p = document.createElement("p");
    p.innerText = "Tipo:" + pokemon.types.map(type => type.type.name).join(", ");
    p.classList.add("text-list");

    // Creo las habilidades
    const abilitiesList = document.createElement("ul");
    abilitiesList.classList.add("abilities");

    const abilityListTitle = document.createElement('h4');
    abilityListTitle.classList.add("ability-title");
    abilityListTitle.innerText = "Habilidades";
    abilitiesList.append(abilityListTitle);

    // Creo las estadisticas
    const statsList = document.createElement("ul");
    statsList.classList.add("stats");

    const statsListTitle = document.createElement('h4');
    statsListTitle.classList.add("ability-title");
    statsListTitle.innerText = "Estadísticas";
    statsList.append(statsListTitle);

    // Recorro las habilidades y las agrego a la lista
    pokemon.abilities.forEach(ability => {
        let li = document.createElement("li");
        li.innerText = ability.ability.name;

        abilitiesList.append(li);
    });

    // Recorro las estadisticas y las agrego a la lista
    pokemon.stats.forEach(stat => {
        let li = document.createElement("li");
        li.innerText = `Stat: ${stat.base_stat} `;
        li.innerText += `Effort: ${stat.effort}`;

        statsList.append(li);
    });
    
    h3.innerText = pokemon.name;
    li.append(h3, p);
    containerListDetails.append( abilitiesList, statsList);
    ul.append(img, li, number, captureRatio, containerListDetails);
    contenedor.appendChild(ul);
}

fetch(URL_POKEMON)
.then(data => data.json())
.then(pokemons => {
    fetch(URL_POKEMON_CHARACT)
    .then(data => data.json())
    .then(characteristics => {
        ShowCard(pokemons, characteristics);
    });
});
