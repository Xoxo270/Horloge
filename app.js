let isStandardTime = true;
let clocks = []

/* Constructeur d'objets Clock */
class clock {
  constructor() { 
    this.gmt = document.getElementById('list-box').value;
    this.time = new Date(`${new Date().toUTCString()}${this.gmt}`);
    clocks.push(this);
    this.container = document.createElement('div');
    this.container.classList.add('clock');
    const divClock = document.getElementById('divClock');
    divClock.appendChild(this.container);
    this.container.innerHTML = this.time.toLocaleTimeString();
  }
}

/* Met à jour l'heure des horloges simultanément */
const updateClock = () => {
  clocks.forEach((item) => {
    if (isStandardTime) {
      item.time = new Date(`${new Date().toUTCString()}${item.gmt}`);
      item.container.innerHTML = item.time.toLocaleTimeString();
    } else {
      item.time = new Date(`${new Date().toUTCString()}${item.gmt}`);
      let heures = item.time.getHours();
      let minutes = item.time.getMinutes();
      let secondes = item.time.getSeconds();
    
      if ( heures > 12 ){
        heures = heures - 12;
        if (heures < 10 ){
          heures = `0${heures}`;
        }else;
        if (minutes < 10 ){
          minutes = `0${minutes}`;
        }else;
        if (secondes < 10 ){
          secondes = `0${secondes}`;
        }else;
        item.container.innerText = `${heures}:${minutes}:${secondes} PM`;
      } else {
        if (heures < 10 ){
          heures = `0${heures}`;
        }else;
        if (minutes < 10 ){
          minutes = `0${minutes}`;
        }else;
        if (secondes < 10 ){
          secondes = `0${secondes}`;
        }else;
        item.container.innerText = `${heures}:${minutes}:${secondes} AM`;
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

/* Change le booléen isStandardTime au clic du bouton switchButton */
const switchButton = () => {
  isStandardTime = !isStandardTime;
}

/* Lance la mise à jour des horloges toutes les 1s */
setInterval(updateClock, 1000);

/* Création d'une horloge au lancement de la page */
new clock();