document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleButton');
    const myList = document.getElementById('myList');

    toggleButton.addEventListener('click', function() {
        myList.classList.toggle('hidden');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const icon = toggleButton.querySelector('ion-icon');

    toggleButton.addEventListener('click', function () {
        if (icon.getAttribute('name') === 'menu') {
            icon.setAttribute('name', 'close');
        } else {
            icon.setAttribute('name', 'menu');
        }
    });
});

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
let startX = 0;
let endX = 0;

next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(() => {next.click()}, 3000);

function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';

    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {next.click()}, 10000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
         active = key;
         reloadSlider();
    });
});

slider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
});

function handleSwipe() {
    if (startX - endX > 50) { // Swipe left
        active = active + 1 <= lengthItems ? active + 1 : 0;
        reloadSlider();
    } else if (endX - startX > 50) { // Swipe right
        active = active - 1 >= 0 ? active - 1 : lengthItems;
        reloadSlider();
    }
}

window.onresize = function(event) {
    reloadSlider();
};
