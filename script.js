var i = 0;
const txt = ['Professional Asian failure since 2009.', 'Amateur programmer since 2020.', 'Why am I here?', 'Tech support at The World Of PC.'];
var speed = 50;

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
}

const result = getRandomItem(txt);


function typeWriter() {
  if (i < result.length) {
    document.getElementById("unbold-intro").innerHTML += result.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(txt.length) setTimeout(typeWriter, 500);
  });

  document.getElementById("cards").onmousemove = e => {
    for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;
  
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };
  }

  $(window).bind('scroll', function() {
    if ($(window).scrollTop() > 20) {
        $('#scrolldown').hide();
    }
    else {
        $('#scrolldown').show();
    }
});

const height = $(window).height();
const scrollTop = $(window).scrollTop();

$(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll > 400)
    $('nav').addClass('nav-color');
  else
    $('nav').removeClass('nav-color');
});