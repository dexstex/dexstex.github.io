var i = 0;
const txt = ['Professional Asian failure since 2009.', 'Amateur programmer since 2020.', 'Why am I here?', 'Tech support at The World Of PC.'];
var speed = 50;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
}

const result = getRandomItem(txt);
console.log(result)


function typeWriter() {
  if (i < result.length) {
    document.getElementById("unbold-intro").innerHTML += result.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(txt.length) setTimeout(typeWriter, 2000 + 250);
  });
