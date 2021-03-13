let isStandardTime = true;

const initTime = () => {
  const clock = document.getElementById('clock');
  const listBox = document.getElementById('list-box');
  const date = new Date();
  let time = new Date(`${date.toUTCString()}${listBox.value}`);
  
  if (isStandardTime) {
    clock.innerHTML = time.toLocaleTimeString();
  } else {
    ampmFunc(time);
  }
}

const switchButton = () => {
  isStandardTime = !isStandardTime;
  initTime();
}

document.getElementById('list-box').onchange = () => {
  initTime();
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

const addClock = () => {
  const divClock = document.getElementById('divClock');
  const newClock = document.createElement('div');
  newClock.classList.add('clock');
  divClock.appendChild(newClock);

}


setInterval(initTime, 1000);
initTime();

/* To-do list :
- option AM/PM. done
- les heures d'autres pays. done
- ajouter autant d'horloge que le client veut.
- http server.
- commenter et push git.
*/

