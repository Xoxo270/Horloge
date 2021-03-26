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
    item.time = new Date(`${new Date().toUTCString()}${item.gmt}`);
    item.container.innerHTML = item.time.toLocaleTimeString();
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
  if (isStandardTime) {
    updateClock();
  } else {
    ampmFunc(time);
    console.log("time : " + time);
  }
}

// WIP 
const ampmFunc = (time) => {
  const clock = document.getElementById('clock');
  let heures = time.getHours();
  const minutes = time.getMinutes();
  const secondes = time.getSeconds();
  
  if ( heures > 12 ){
    heures = heures - 12;
    clock.innerText = heures + ":" + minutes + ":" + secondes + " PM";
  } else {
    clock.innerText = heures + ":" + minutes + ":" + secondes + " AM";
  }
}

/* Lance la mise à jour des horloges toutes les 1s */
setInterval(updateClock, 1000);

/* Création d'une horloge au lancement de la page */
new clock();