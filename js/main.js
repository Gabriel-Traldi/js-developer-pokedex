const pokemonListEl = document.querySelector(".pokemons");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 151;
const limit = 5;
let offset = 0;

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map(
    (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
  );
}

function convertPokemonToHtml(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.number}</span>
          <span class="name"> ${pokemon.name} </span>

          <div class="detail">
            <ol class="types">
                ${pokemon.types
                  .map((type) => `<li class="type ${type}">${type}</li>`)
                  .join("")}
            </ol>

            <img
              src="${pokemon.photo}"
              alt="${pokemon.name}"
            />
          </div>

        </li>
    `;
}

function loadPokemonItems(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    .then(
      (pokemons = []) =>
        (pokemonListEl.innerHTML += pokemons.map(convertPokemonToHtml).join(""))
    );
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  if (offset + limit >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);
    loadMoreButton.remove();
  } else {
    loadPokemonItems(offset, limit);
  }
});

loadPokemonItems(offset, limit);
