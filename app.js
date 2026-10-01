const candidates = [
  { name: "Luis Gustavo", number: "10", office: "Prefeito", art: "assets/paineis/luis-gustavo.png" },
  { name: "Saulo Pedroso", number: "5515", office: "Deputado Federal", art: "assets/paineis/saulo-pedroso-v2.png" },
  { name: "Eleuses Paiva Filho", number: "5555", office: "Deputado Federal", art: "assets/paineis/eleuses-paiva.png" },
  { name: "Marco Vinholi", number: "1002", office: "Deputado Federal", art: "assets/paineis/marco-vinholi-v2.png" },
  { name: "Vitor Lippi", number: "5501", office: "Deputado Federal", art: "assets/paineis/vitor-lippi.png" },
  { name: "Marangoni", number: "2044", office: "Deputado Federal", art: "assets/paineis/marangoni.png" },
  { name: "Maria Rosas", number: "1022", office: "Deputada Federal", art: "assets/paineis/maria-rosas.png" },
  { name: "Vinicius Marchese", number: "5588", office: "Deputado Federal", art: "assets/paineis/vinicius-marchese.png" },
  { name: "Mauro Bragato", number: "55125", office: "Deputado Estadual", art: "assets/paineis/mauro-bragato.png" },
  { name: "Rafael Saraiva", number: "44077", office: "Deputado Estadual", art: "assets/paineis/rafael-saraiva.png" },
  { name: "Edson Giriboni", number: "44001", office: "Deputado Estadual", art: "assets/paineis/edson-giriboni.png" },
  { name: "Thiago Auricchio", number: "22343", office: "Deputado Estadual", art: "assets/paineis/thiago-auricchio.png" },
  { name: "Guilherme Derrite", number: "111", office: "Senador", art: "assets/paineis/guilherme-derrite.png" },
  { name: "André do Prado", number: "222", office: "Senador", art: "assets/paineis/andre-do-prado.png" },
  { name: "Tarcísio", number: "10", office: "Governador", art: "assets/paineis/tarcisio.png" },
];

const grid = document.querySelector("#selectionGrid");
const profile = document.querySelector("#profileLayer");
const profileArt = document.querySelector("#profileArt");
const activePortrait = document.querySelector("#activePortrait");
const columns = 5;
let selectedIndex = 1;

const portraitPositions = [
  [173, 303], [354, 303], [535, 303], [715, 303], [897, 303],
  [173, 520], [354, 520], [535, 520], [715, 520], [897, 520],
  [173, 736], [354, 736], [535, 736], [715, 736], [897, 736],
];
const cropWidth = 164;
const cropHeight = 204;

function renderGrid() {
  grid.innerHTML = candidates.map((candidate, index) => `
    <button class="selection-slot ${index === selectedIndex ? "is-selected" : ""}" type="button"
      data-index="${index}" role="option" aria-selected="${index === selectedIndex}"
      aria-label="${candidate.name}, ${candidate.office}, número ${candidate.number}"></button>
  `).join("");

  grid.querySelectorAll(".selection-slot").forEach((slot) => {
    slot.addEventListener("click", () => selectCandidate(Number(slot.dataset.index)));
  });

}

function selectCandidate(index) {
  selectedIndex = index;
  const candidate = candidates[index];
  grid.querySelectorAll(".selection-slot").forEach((slot, slotIndex) => {
    const isSelected = slotIndex === index;
    slot.classList.toggle("is-selected", isSelected);
    slot.setAttribute("aria-selected", String(isSelected));
  });

  // Por enquanto só o painel do Saulo foi exportado. As outras artes poderão
  // ser adicionadas ao campo `art` sem alterar a composição da página.
  if (candidate.art) {
    profileArt.src = candidate.art;
    profileArt.alt = `${candidate.name}, ${candidate.office}, número ${candidate.number}`;
  }

  const [x, y] = portraitPositions[index];
  activePortrait.style.left = `${(x / 1920) * 100}%`;
  activePortrait.style.top = `${(y / 1080) * 100}%`;
  activePortrait.style.width = `${(cropWidth / 1920) * 100}%`;
  activePortrait.style.height = `${(cropHeight / 1080) * 100}%`;
  activePortrait.innerHTML = `<img src="assets/selecionaveis/${index + 1}.png" alt="" />`;
  activePortrait.classList.remove("is-active");
  void activePortrait.offsetWidth;
  activePortrait.classList.add("is-active");

  profile.classList.remove("is-changing");
  void profile.offsetWidth;
  profile.classList.add("is-changing");
}

function moveSelection(direction) {
  const row = Math.floor(selectedIndex / columns);
  const col = selectedIndex % columns;
  let next = selectedIndex;
  if (direction === "left") next = selectedIndex === 0 ? candidates.length - 1 : selectedIndex - 1;
  if (direction === "right") next = selectedIndex === candidates.length - 1 ? 0 : selectedIndex + 1;
  if (direction === "up") next = row === 0 ? selectedIndex + columns * 2 : selectedIndex - columns;
  if (direction === "down") next = selectedIndex + columns >= candidates.length ? col : selectedIndex + columns;
  while (next >= candidates.length) next -= columns;
  selectCandidate(next);
}

window.addEventListener("keydown", (event) => {
  const direction = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down" }[event.key];
  if (direction) {
    event.preventDefault();
    moveSelection(direction);
  }
});

renderGrid();
selectCandidate(selectedIndex);
