const API_URL = "https://tyradex.app/api/v1";

const select = document.getElementById("generation-select");
const sortSelect = document.getElementById("sort-select");
const typesContainer = document.getElementById("types-container");
const list = document.getElementById("pokemon-list");

let allPokemons = [];
let selectedType = "all";

class Type {
  constructor(data) {
    this.name = data.name;
    this.image = data.image;
    this.color = this.getColorHexa();
  }

  getColorHexa() {
    switch (this.name) {
      case "Normal":
        return "#a8a77a";
      case "Feu":
        return "#ee8130";
      case "Eau":
        return "#6390f0";
      case "Plante":
        return "#7ac74c";
      case "Électrik":
        return "#f7d02c";
      case "Glace":
        return "#96d9d6";
      case "Combat":
        return "#c22e28";
      case "Poison":
        return "#a33ea1";
      case "Sol":
        return "#e2bf65";
      case "Vol":
        return "#a98ff3";
      case "Psy":
        return "#f95587";
      case "Insecte":
        return "#a6b91a";
      case "Roche":
        return "#b6a136";
      case "Spectre":
        return "#735797";
      case "Dragon":
        return "#6f35fc";
      case "Ténèbres":
        return "#705746";
      case "Acier":
        return "#b7b7ce";
      case "Fée":
        return "#d685ad";
      default:
        return "#808080";
    }
  }
}

class Pokemon {
  constructor(data) {
    this.id = data.pokedex_id;
    this.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.pokedex_id}.png`;
    this.name = data.name.fr;
    this.apiTypes = data.types ? data.types.map((type) => new Type(type)) : [];
    this.hp = data.stats.hp;
    this.attack = data.stats.atk;
    this.defense = data.stats.def;
    this.special_attack = data.stats.spe_atk;
    this.speed = data.stats.vit;
  }

  displayCard() {
    const types = this.apiTypes.map((type) => type.name).join(" / ");
    const color = this.apiTypes[0]?.color ?? "grey";

    const card = document.createElement("article");
    card.style.borderColor = color;
    card.style.backgroundColor = color;

    card.innerHTML = `
      <figure>
        <picture>
          <img src="${this.image}" alt="Image ${this.name}" loading="lazy" />
        </picture>
        <figcaption>
          <span class="types">${types}</span>
          <h2>${this.name}</h2>
          <ol>
            <li>Points de vie : ${this.hp}</li>
            <li>Attaque : ${this.attack}</li>
            <li>Défense : ${this.defense}</li>
            <li>Attaque spécial : ${this.special_attack}</li>
            <li>Vitesse : ${this.speed}</li>
          </ol>
        </figcaption>
      </figure>
    `;

    return card;
  }
}

function displayTypeButtons() {
  const types = [];
  allPokemons.forEach((pokemon) => {
    pokemon.apiTypes.forEach((type) => {
      if (!types.includes(type.name)) {
        types.push(type.name);
      }
    });
  });

  typesContainer.innerHTML = "";
  ["all", ...types].forEach((type) => {
    const button = document.createElement("button");
    button.textContent = type === "all" ? "Tous" : type;

    if (type === selectedType) {
      button.className = "active";
    }

    button.addEventListener("click", () => {
      selectedType = type;
      displayTypeButtons();
      displayPokemons();
    });

    typesContainer.appendChild(button);
  });
}

function displayPokemons() {
  let pokemons = [...allPokemons];

  if (selectedType !== "all") {
    pokemons = pokemons.filter((pokemon) =>
      pokemon.apiTypes.some((type) => type.name === selectedType)
    );
  }

  const sort = sortSelect.value;
  if (sort === "id") {
    pokemons.sort((a, b) => a.id - b.id);
  } else if (sort === "name") {
    pokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "hp") {
    pokemons.sort((a, b) => b.hp - a.hp);
  } else if (sort === "atk") {
    pokemons.sort((a, b) => b.attack - a.attack);
  } else if (sort === "type") {
    pokemons.sort((a, b) =>
      (a.apiTypes[0]?.name ?? "").localeCompare(b.apiTypes[0]?.name ?? "")
    );
  }

  list.innerHTML = "";
  pokemons.forEach((pokemon) => {
    list.appendChild(pokemon.displayCard());
  });
}

async function loadData(generation) {
  try {
    const response = await fetch(`${API_URL}/gen/${generation}`);
    const data = await response.json();

    const results = Array.isArray(data) ? data : data.pokemons;
    allPokemons = results.map((pokemonData) => new Pokemon(pokemonData));
    selectedType = "all";

    displayTypeButtons();
    displayPokemons();
  } catch (error) {
    console.error("impossible de charger ces Pokemon :", error);
  }
}

loadData(1);

select.addEventListener("change", () => {
  loadData(select.value);
});

sortSelect.addEventListener("change", () => {
  displayPokemons();
});