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
    this.container.setAttribute('draggable','true')
    this.container.onDragStart = (event) => { onDragStart(event) }

    this.container.onmousedown = () => {formatChange()};
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
const formatChange = () => {
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

/* Drag & Drop function */

document.addEventListener('DOMContentLoaded', () => {
  let dragSrcEl = null;
  
  function handleDragStart(e) {
    this.style.opacity = '0.4';
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';

    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }

  function handleDragEnter() {
    this.classList.add('over');
  }

  function handleDragLeave() {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl !== this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
  }

  function handleDragEnd() {
    this.style.opacity = '1';
    
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }
  
  
  let items = document.querySelectorAll('.container .clock');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});
