let isStandardTime = true;
let clocks = [];

/* Constructeur d'objets Clock */
class clock {
  constructor() {
    this.gmt = document.getElementById('list-box').value;
    this.time = new Date(`${new Date().toUTCString()}${this.gmt}`);
    clocks.push(this);
    this.container = document.createElement('div');
    this.container.classList.add('clock');
    this.container.onmousedown = () => {formatChange()};
    this.container.oncontextmenu = () => {return false};
    const divClock = document.getElementById('divClock');
    divClock.appendChild(this.container);
    this.hourParagraph = document.createElement('p');
    this.hourParagraph.classList.add('hourParagraph');
    this.container.appendChild(this.hourParagraph);
    this.button = document.createElement('button');
    this.button.classList.add('supprButton');
    this.container.appendChild(this.button);
    this.button.onclick = () => {deleteClock()};
    this.hourParagraph.innerHTML = this.time.toLocaleTimeString();
  }
}

/* Met à jour l'heure des horloges simultanément */
const updateClock = () => {
  clocks.forEach((item) => {
    if (isStandardTime) {
      item.time = new Date(`${new Date().toUTCString()}${item.gmt}`);
      item.hourParagraph.innerHTML = item.time.toLocaleTimeString();
    } else {
      item.time = new Date(`${new Date().toUTCString()}${item.gmt}`);
      let heures = item.time.getHours();
      let minutes = item.time.getMinutes();
      let secondes = item.time.getSeconds();

      if (heures > 12) {
        heures = heures - 12;
        if (heures < 10) {
          heures = `0${heures}`;
        } else;
        if (minutes < 10) {
          minutes = `0${minutes}`;
        } else;
        if (secondes < 10) {
          secondes = `0${secondes}`;
        } else;
          item.hourParagraph.innerText = `${heures}:${minutes}:${secondes} PM`;
      } else {
        if (heures < 10) {
          heures = `0${heures}`;
        } else;
        if (minutes < 10) {
          minutes = `0${minutes}`;
        } else;
        if (secondes < 10) {
          secondes = `0${secondes}`;
        } else;
          item.hourParagraph.innerText = `${heures}:${minutes}:${secondes} AM`;
      }
    }

  });
};

/* Ajoute une nouvelle horloge lorsqu'on clique sur le bouton d'ajout */
const addClock = () => {
  new clock();
}

/* Change l'heure de la première horloge lorsqu'on sélectionne un autre fuseau horaire. */
document.getElementById('list-box').onchange = () => {
  clocks[0].gmt = document.getElementById('list-box').value;
  updateClock();
}

/* Change le format de l'heure lorsqu'on clic droit sur une horloge */
const formatChange = () => {
  if (event.buttons === 2) {
    isStandardTime = !isStandardTime;
    updateClock();
  }
}

const deleteClock = () => {
  console.log(event.target.parentNode);
  // console.log(event.target);
  // console.log(event);
  event.target.parentNode.remove();
  console.log(clocks);
}

/* Lance la mise à jour des horloges toutes les 1s */
setInterval(updateClock, 1000);

/* Création d'une horloge au lancement de la page */
new clock();

/* Changement de background dynamique */
let bodyDiv = document.getElementById('body');

const backgrounds = new Array(
    'url(images/nightSky.jpg)'
  , 'url(images/lake.jpg)'
  , 'url(images/darkGravel.jpg)'
  , 'url(images/rainyDay.jpg)'
);
let current = 0;

let nextBackground = () => {
  current++;
  current = current % backgrounds.length;
  bodyDiv.style.background = backgrounds[current];
}
setInterval(nextBackground, 10000);

bodyDiv.style.background = backgrounds[0];
