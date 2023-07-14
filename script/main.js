//#region Peticion


const getCharacters = async () => {
  const pokemon = [];
  for (let i = 0; i < 150; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const res = await response.json();
    pokemon.push(res);
  }
  return pokemon;
};

const mappedCharacters = (characters) => {
  return characters.map((character) => ({
    name: character.name,
    image: character.sprites["front_default"],
    type: character.types.map((type) => type.type.name).join(', '),
    id: character.id,
  }));
};

const drawCharacters = (characters) => {
  const main$$ = document.querySelector(".main")
  //main$$.innerHTML = "";
  for (const character of characters) {
    let characterFigure$$ = document.createElement("figure");
    characterFigure$$.setAttribute("class", "main-figure");
    characterFigure$$.innerHTML = `
      <div class="main-figure-container">
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
      </div>
  `;
    main$$.appendChild(characterFigure$$);
    //console.log(character.image)
  }
};

//#endregion

//#region  init
/*
Funcion inicial donde ponemos todas las llamadas a funciones.
Quedan dudas:
*/

const init = async () => {
  const characters =  await getCharacters();
  const mappeCharacter = mappedCharacters(characters);
  drawCharacters(mappeCharacter);
};

init();

//#endregion
