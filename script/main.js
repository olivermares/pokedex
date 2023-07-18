//#region Peticion,mapeo y dibujar

const getCharacters = async (url) => {
  const imgDefault =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10263.png";
  const response = await fetch(url);
  const characters = await response.json();
  const pokemon = {
    name: characters.name,
    img:
      characters.sprites.front_default === null
        ? imgDefault
        : characters.sprites.front_default,
  };
  return pokemon;
};

const getCharactersRecursive = async (url) => {
  const result = [];
  const response = await fetch(url);
  const characters = await response.json();
  characters.results.forEach(async (element) => {
    result.push(await getCharacters(element.url));
  });
  aux =
    characters.next === null
      ? result
      : await getCharactersRecursive(characters.next);
  aux.forEach(async (element) => {
    result.push(element);
  });
  return result;
};

const mappedCharacters = (characters) => {
  return characters.map((character) => ({
    name: character.name,
    image: character.sprites["front_default"],
    type: character.types.map((type) => type.type.name).join(", "),
    id: character.id,
  }));
};

const drawCharacters = (characters) => {
  const main$$ = document.querySelector('main');
  main$$.innerHTML = "";
  for (const character of characters) {
    let figure$$ = document.createElement("figure");
    figure$$.className = "main-figure";
    figure$$.innerHTML = `
          <h3>${character.name}</h3>
          <img src=${character.img} alt=${character.name}>
      `;
    //const btn$$ = document.createElement("button");
    //btn$$.textContent = "BORRAR";
    //btn$$.addEventListener("click", () => figure$$.remove());

    //figure$$.appendChild(btn$$);
    main$$.appendChild(figure$$);
  }
};

//#endregion

//#region Filtro

const drawHeader = (characters) =>{
  const versions = [-1,150, 550,characters.length-1];
  const header$$ = document.querySelector("header");
  for (let index = 0; index < 3; index++) {
    const btn$$ = document.createElement("button");
    btn$$.textContent = `MOSTRAR V${index+1}`;

    btn$$.addEventListener("click", () => {
      drawCharacters(characters.slice(versions[index]+1, versions[index+1]));
    });

    header$$.appendChild(btn$$);
  }
}

//#endregion

//#region  init
/*
Funcion inicial donde ponemos todas las llamadas a funciones.
*/

const init = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon`;
  const characters = await getCharactersRecursive(url);  
  drawCharacters(characters.slice(0, 150));
  drawHeader(characters);
};

init();

//#endregion
