// ####### start #######

// document.addEventListener('DOMContentLoaded', function () {
//   const startEl = document.querySelector('.start');
//   const logoEl = document.querySelector('.logo');

//   setTimeout(function () {
//     logoEl.classList.add('norma');
//     startEl.classList.add('hide');
//   }, 1000);
// });

// ####### toggle active page #######

const homeEls = document.querySelectorAll('.home-link');
const favEls = document.querySelectorAll('.fav-link');

homeEls.forEach(function (homeEl) {
  homeEl.classList.add('active');

  if (document.body.id === 'home') {
    homeEl.classList.add('active');
  } else {
    homeEl.classList.remove('active');
  }
});

favEls.forEach(function (favEl) {
  if (document.body.id === 'favorites') {
    favEl.classList.add('active');
  } else {
    favEl.classList.remove('active');
  }
});

// ####### toggle theme #######

const switchEls = document.querySelectorAll('.switch');
const body = document.body;

switchEls.forEach(function (switchEl) {
  switchEl.addEventListener('click', function () {
    const isDarkTheme = switchEl.checked;

    if (isDarkTheme) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  });
});

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  switchEls.forEach(function (switchEl) {
    switchEl.checked = true;
  });
} else {
  switchEls.forEach(function (switchEl) {
    switchEl.checked = false;
  });
}

// ####### toggle mobile-menu #######

const mobileMenuEl = document.querySelector('.mobile-menu');
const openMenuEl = document.querySelector('.open-menu');
const closeMenuEl = document.querySelector('.close-menu');

function toggleMenu() {
  mobileMenuEl.classList.toggle('is-open');
}
openMenuEl.addEventListener('click', toggleMenu);
closeMenuEl.addEventListener('click', toggleMenu);
