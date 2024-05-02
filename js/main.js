const URL_ENDPOINT = "https://pokeapi.co/api/v2/";
const URL_POKEMON = URL_ENDPOINT + "pokemon";
const limit = 100;
const offset = 0;
const URL_LIMIT = `${URL_POKEMON}?limit=${limit}&offset=${offset}`;

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

    const p = document.createElement("p");
    p.innerText = "Tipo:" + pokemon.types.map(type => type.type.name).join(", ");
    p.classList.add("text-list");

    h3.innerText = pokemon.name;
    li.append(h3, p);
    ul.append(img, li);
    contenedor.appendChild(ul);
}

fetch(URL_LIMIT)
.then(data => data.json())
.then(pokemons => {
    const pokemonList = pokemons.results;
    let pokemonCount;

    pokemonList.forEach(pokemon => {
        console.log(pokemon);
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
