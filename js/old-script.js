const response = await fetch("https://pokeapi.co/api/v2");

class Pokemon {
    constructor(id, image, name, apiTypes, attack, defense, special_attack, special_defense, speed) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.apiTypes = apiTypes;
        this.stats = {
            attack: attack,
            defense: defense,
            special_attack: special_attack,
            special_defense: special_defense,
            speed: speed
        };
    }

    displayCard() {

        const article = document.createElement("article");
        
          article.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
      </picture>
      <figcaption>
        <span class="types">${pokemon.apiTypes[0].name}</span>
        <h2>${pokemon.name}</h2>
        <ol>
          <li>Points de vie : ${pokemon.stats.HP}</li>
          <li>Attaque : ${pokemon.stats.attack}</li>
          <li>Défense : ${pokemon.stats.defense}</li>
          <li>Attaque spécial : ${pokemon.stats.special_attack}</li>
          <li>Défense spécial : ${pokemon.stats.special_defense}</li>
          <li>Vitesse : ${pokemon.stats.speed}</li>
        </ol>
      </figcaption>
    </figure>
  `;

  return article;
    }
}

class Type {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        return this.color;
    }
}

async function getPokemons() {
  const response = await fetch("./data/data.json");
  const pokemons = await response.json();
  console.log(pokemons);
  return pokemons;
}

getPokemons();

function createPokemonCard(pokemon) {
  // 1. Créer l'élément article
  const article = document.createElement("article");

  // 2 & 3. Remplir l'article avec innerHTML avec template literals
  article.innerHTML = `
    <figure>
      <picture>
        <img src="${pokemon.image}" alt="Image ${pokemon.name}" />
      </picture>
      <figcaption>
        <span class="types">${pokemon.apiTypes[0].name}</span>
        <h2>${pokemon.name}</h2>
        <ol>
          <li>Points de vie : ${pokemon.stats.HP}</li>
          <li>Attaque : ${pokemon.stats.attack}</li>
          <li>Défense : ${pokemon.stats.defense}</li>
          <li>Attaque spécial : ${pokemon.stats.special_attack}</li>
          <li>Défense spécial : ${pokemon.stats.special_defense}</li>
          <li>Vitesse : ${pokemon.stats.speed}</li>
        </ol>
      </figcaption>
    </figure>
  `;

    let figure = article.querySelector('figure');
  switch (pokemon.apiTypes[0].name) {
    case "Plante":
      figure.style.backgroundColor = "green";
      article.style.borderColor = `green`;
      break;
    case "Feu":  
      figure.style.backgroundColor = "orange";
      article.style.borderColor = `orange`;
      break;
    case "Eau":
      figure.style.backgroundColor = "blue";
      article.style.borderColor = `blue`;
      break;
    default:
        figure.style.backgroundColor = "gray";
  }

  return article;
}

async function displayPokemons() {
  const pokemons = await getPokemons();

  // 4. Sélectionner la balise main
  const main = document.querySelector("main");
  main.innerHTML = "";

  // 5. Créer et ajouter un article par pokémon
  pokemons.forEach((pokemon) => {
    const article = createPokemonCard(pokemon);
    main.appendChild(article);
  });
}

displayPokemons();
