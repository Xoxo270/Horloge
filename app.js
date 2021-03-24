let isStandardTime = true;


class clock {
  constructor() { 
      const listBox = document.getElementById('list-box');
      this.gmt = document.getElementById('list-box').value;
      this.time = new Date(`${new Date().toUTCString()}${this.gmt}`);
      this.container = document.createElement('div');
      this.container.classList.add('clock');
      const divClock = document.getElementById('divClock');
      divClock.appendChild(this.container);
      this.container.innerHTML = this.time.toLocaleTimeString();

  }
// WIP
  updateClock(){
    setInterval(() => {
      this.time = new Date(`${new Date().toUTCString()}${document.getElementById('list-box').value}`);
      this.container.innerHTML = this.time.toLocaleTimeString();
    }, 1000);
  }
}

const addClock = () => {
  new clock();
}

// const initTime = () => {
//   const clock = document.getElementById('clock');
//   // const listBox = document.getElementById('list-box');
//   // const date = new Date();
//   // let time = new Date(`${date.toUTCString()}${listBox.value}`);

  
//   if (isStandardTime) {
//     clock.innerHTML = time.toLocaleTimeString();
//   } else {
//     ampmFunc(time);
//   }
// }

const switchButton = () => {
  isStandardTime = !isStandardTime;
  // initTime();
}

document.getElementById('list-box').onchange = () => {
  // initTime();
}

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


// setInterval(() => new clock(), 1000);
new clock();

/* To-do list :
- option AM/PM. done
- les heures d'autres pays. done
- ajouter autant d'horloge que le client veut.
- horloge qui se met à jour en même temps.
- http server.
- commenter et push git.
*/

