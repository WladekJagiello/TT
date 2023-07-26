import { addRating } from './APIrequests';

const giveBackdropEl = document.querySelector('.give-backdrop');
const seeBackdropEl = document.querySelector('.see-backdrop');
const ratingEl = document.querySelector('.give-rating-span');
const starEls = document.querySelectorAll('.rating-label');
const radioEls = document.querySelectorAll('.rating');
const modalEl = document.querySelector('.give-modal');
const closeEl = document.querySelector('.close-give');
const openEl = document.querySelector('.give-rating');
const descEl = document.querySelector('.give-desc');
const formEl = document.querySelector('.give-form');

openEl.addEventListener('click', openHandleClick);
function openHandleClick() {
  const desc = openEl.getAttribute('data');
  const id = openEl.getAttribute('id');
  seeBackdropEl.classList.remove('active');
  toggleModal();
  changeRating(id);
  descEl.innerHTML = `<p class="desc-text">${desc}</p>`;
  openEl.removeEventListener('click', openHandleClick);
}

modalEl.addEventListener('click', function (event) {
  event.stopPropagation();
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    giveBackdropEl.classList.remove('active');
    document.body.style.overflow = '';
  }
});

closeEl.addEventListener('click', toggleModal);
giveBackdropEl.addEventListener('click', toggleModal);
function toggleModal() {
  giveBackdropEl.classList.toggle('active');

  if (giveBackdropEl.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

async function changeRating(id) {
  let interval;
  function changeColorsInterval() {
    let currentIndex = 0;
    interval = setInterval(() => {
      for (let i = 0; i < starEls.length; i++) {
        if (i === currentIndex) {
          starEls[i].classList.add('color');
        } else {
          starEls[i].classList.remove('color');
        }
      }
      currentIndex = (currentIndex + 1) % starEls.length;
    }, 150);
  }
  changeColorsInterval();

  let checked = false;
  radioEls.forEach((radioEl, index) => {
    radioEl.addEventListener('change', function () {
      clearInterval(interval);
      setActiveRating(index);
      checked = true;
    });
  });

  starEls.forEach((starEl, index) => {
    starEl.addEventListener('mouseenter', function () {
      clearInterval(interval);
      setActiveRating(index);
    });
    starEl.addEventListener('mouseleave', function () {
      if (checked !== true) {
        changeColorsInterval();
        ratingEl.textContent = 0;
      }
    });
  });

  function setActiveRating(index) {
    for (let i = 0; i < starEls.length; i++) {
      if (i <= index) {
        starEls[i].classList.add('color');
        ratingEl.textContent = i + 1;
      } else {
        starEls[i].classList.remove('color');
      }
    }
  }

  formEl.addEventListener('submit', event => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const email = elements.email.value.trim();

    console.log(email);

    const dataForm = {
      [`"rate"`]: Number(elements.rate.value),
      [`"email"`]: email,
    };

    console.log(dataForm);

    // addRating(id, dataForm);
    toggleModal();
    descEl.innerHTML = '';
    event.currentTarget.reset();
  });
}
