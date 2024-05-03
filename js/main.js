const URL_ENDPOINT = "https://pokeapi.co/api/v2/";
const URL_POKEMON = URL_ENDPOINT + "pokemon";
const limit = 100;
const offset = 0;
const URL_LIMIT = `${URL_POKEMON}?limit=${limit}&offset=${offset}`;

/** 
 * Me genera las cards para cada Pokemon.
 * @param pokemon Un objeto que contenga los datos de tu pokemon.
 */
const ShowCard = (pokemon) => {
    const contenedor = document.querySelector("#container-list");
    const ul = document.createElement("ul");
    ul.classList.add("list-details");
    
    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name + " sprite";

    const h3 = document.createElement("h3");
    const li = document.createElement("li");
    li.classList.add("list-item");

    const btn = document.createElement("button");
    btn.classList.add("btn-card");
    btn.innerText = "Ver mas";

    btn.addEventListener("click", () => {
        ShowDetails(pokemon.id);
    });

    h3.innerText = pokemon.name;
    li.append(h3);
    ul.append(img, li, btn);
    contenedor.appendChild(ul);
}

/**
 * Muestra los detalles maximizados de cada pokemon.
 * @param id Numero identificador o nombre del pokemon.
 */
const ShowDetails = (id) => {
    window.location.href = "http://127.0.0.1:5500/detalle.html?id=" + id;
}

fetch(URL_LIMIT)
.then(data => data.json())
.then(pokemons => {
    const pokemonList = pokemons.results;

    pokemonList.forEach(pokemon => {
        // Obtengo el id de cada pokemon
        const pokemonId = pokemon.url.split("/")[6];
        
        // Hago un pedido a la url en base al id de cada pokemon para 
        //poder trabajar sus datos.
        fetch(`${URL_ENDPOINT}pokemon/${pokemonId}`)
        .then(data => data.json())
        .then(pokemonData => {
            ShowCard(pokemonData);
        })
        .catch(error => {
            console.error("Error al obtener los detalles del Pokémon:", error);
        });
    });

});
