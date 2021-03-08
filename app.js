let isStandardTime = true;

const switchFormat = () => {
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
  switchFormat();
}

document.getElementById('list-box').onchange = () => {
  switchFormat();
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
setInterval(switchFormat, 1000);
switchFormat();

/* To-do list :
- option AM/PM. done
- les heures d'autres pays. done
- ajouter autant d'horloge que le client veut.
- http server.
- commenter et push git.
*/

