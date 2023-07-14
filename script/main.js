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
  //console.log(characters);
  //main$$.innerHTML = "";
  for (const character of characters) {
    let characterFigure$$ = document.createElement("figure");
    characterFigure$$.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
  `;
    main$$.appendChild(characterFigure$$);
    //console.log(character.image)
  }
};
//      <img src="${character.imagen}" alt="${character.name}">
//#endregion

//#region  init

const init = async () => {
  const characters = await getCharacters();
  const mappeCharacter = mappedCharacters(characters);
  drawCharacters(mappeCharacter)
  //drawInput(mappeCharacter)
};
init();

//#endregion
