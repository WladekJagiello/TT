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

window.addEventListener('DOMContentLoaded', function () {
  const linkEls = document.querySelectorAll('.nav-link');

  linkEls.forEach(function (linkEl) {
    if (linkEl.href.includes(location.pathname)) {
      linkEl.classList.add('active');
    } else {
      linkEl.classList.remove('active');
    }
  });
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
