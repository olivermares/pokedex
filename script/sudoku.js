//const main$$=document.querySelector('main')
//console.log(main$$)

const test = [
  [0, 9, 4, 0, 0, 0, 6, 0, 0],
  [0, 5, 3, 9, 8, 6, 0, 4, 1],
  [0, 8, 2, 0, 1, 3, 9, 7, 5],
  [0, 0, 0, 1, 6, 0, 3, 0, 7],
  [9, 0, 0, 0, 0, 2, 0, 0, 0],
  [0, 3, 0, 0, 0, 0, 0, 1, 2],
  [5, 6, 0, 0, 4, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 7, 0, 0],
  [3, 0, 0, 2, 9, 0, 0, 5, 0],
];

const costructorMatrix = (value) => {
  const source = [];
  for (let i = 0; i < 9; i++) {
    const aux = [];
    for (let j = 0; j < 9; j++) aux.push(value);
    source.push(aux);
  }
  return source;
};

const vertical = costructorMatrix(false);
const horizontal = costructorMatrix(false);
const internal = costructorMatrix(false);

const init = () => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (test[i][j] != 0) {
        vertical[i][j] = true;
        horizontal[j][i] = true;
        internal[Math.floor(i / 3) * 3 + Math.floor(j / 3)][
          test[i][j] - 1
        ] = true;
      }
    }
  }
};
init();

const solution = {
    solution: [...test],
    vertical: [...vertical],
    horizontal: [...horizontal],
    internal: [...internal]
}

console.log(solution)

const solucionador = (solution) => {

}
/*
main$$.innerHTML = `
<div class="main-soduku">
<input type="email" id="mail" name="user_mail" />
</div>
`
//main$$.appendChild(main$$)
*/
