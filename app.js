let isStandardTime = true;
let clocks = [];
let dragSrcEl;

/* Constructeur d'objets Clock */
class clock {
  constructor() {
    this.gmt = document.getElementById('list-box').value;
    this.time = new Date(`${new Date().toUTCString()}${this.gmt}`);
    clocks.push(this);
    this.container = document.createElement('div');
    this.container.classList.add('clock');
    this.container.setAttribute('draggable','true')
    this.container.addEventListener('dragstart', (e) => this.handleDragStart(e, this.container));
    this.container.addEventListener('dragend', (e) => this.handleDragEnd(e, this.container));
    this.container.addEventListener('dragenter', (e) => this.handleDragEnter(e, this.container));
    this.container.addEventListener('dragleave', (e) => this.handleDragLeave(e, this.container));
    this.container.addEventListener('dragover', (e) => this.handleDragOver(e));
    this.container.addEventListener('drop', (e) => this.handleDrop( e, this.container));

    this.container.onmousedown = (event) => { formatChange(event) };
    this.container.oncontextmenu = () => {return false};
    const divClock = document.getElementById('divClock');
    divClock.appendChild(this.container);
    this.hourParagraph = document.createElement('p');
    this.hourParagraph.classList.add('hourParagraph');
    this.container.appendChild(this.hourParagraph);
    this.button = document.createElement('p');
    this.button.classList.add('supprButton');
    this.container.appendChild(this.button);
    this.button.onclick = (event) => { this.deleteClock(event) };
    this.hourParagraph.innerHTML = this.time.toLocaleTimeString();
  }

  /* Methode pour delete l'horloge */
  deleteClock = (event) => {
    event.target.parentNode.remove();
    clocks.splice(this.id, 1);
    clocks.forEach((clock, i) => clock.id = i);
  }

  handleDragStart(event, clock) {
    clock.style.opacity = 0.4;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', clock.innerHTML);
    dragSrcEl = clock;
  }

  handleDragEnd(event, clock) {
    clock.style.opacity = 1;
  }

  handleDragEnter(event, clock) {
    clock.classList.add('drag-over');
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragLeave(event, clock) {
    clock.classList.remove('drag-over');
  }

  handleDrop(event, target) {
    if (dragSrcEl !== target) {
      target.classList.remove('drag-over');
      dragSrcEl.innerHTML = target.innerHTML;
      target.innerHTML = event.dataTransfer.getData('text/html');
    }
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
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (secondes < 10) {
          secondes = `0${secondes}`;
        }
          item.hourParagraph.innerText = `${heures}:${minutes}:${secondes} PM`;
      } else {
        if (heures < 10) {
          heures = `0${heures}`;
        }
        if (minutes < 10) {
          minutes = `0${minutes}`;
        }
        if (secondes < 10) {
          secondes = `0${secondes}`;
        }
          item.hourParagraph.innerText = `${heures}:${minutes}:${secondes} AM`;
      }
    }

  });
};

/* Ajoute une nouvelle horloge lorsqu'on clique sur le bouton d'ajout */
const addClock = () => {
  new clock();
  clocks.forEach((clock, i) => clock.id = i);
}

/* Change l'heure de la première horloge lorsqu'on sélectionne un autre fuseau horaire. */
document.getElementById('list-box').onchange = () => {
  clocks[0].gmt = document.getElementById('list-box').value;
  updateClock();
}

/* Change le format de l'heure lorsqu'on clic droit sur une horloge */
const formatChange = (event) => {
  if (event.buttons === 2) {
    isStandardTime = !isStandardTime;
    updateClock();
  }
}

/* Lance la mise à jour des horloges toutes les 1s */
setInterval(updateClock, 1000);

/* Création d'une horloge au lancement de la page */
new clock();

/* Changement de background dynamique */
const backgroundChange = () => {
  let bodyDiv = document.getElementById('body');
  let current = 0;
  const backgrounds = [
    'url(images/nightSky.jpg)',
    'url(images/lake.jpg)',
    'url(images/rainyDay.jpg)',
    'url(images/lakeView.jpg)',
    'url(images/fallRoad.jpg)',
  ];

  let nextBackground = () => {
    current++;
    current = current % backgrounds.length;
    bodyDiv.style.backgroundImage = backgrounds[current];
  }
  setInterval(nextBackground, 10000);

  bodyDiv.style.backgroundImage = backgrounds[0];
}
backgroundChange();

