import Notiflix from 'notiflix';
import sprite from '../images/sprite.svg';
import { createDataCard } from './see-recipe';

// ####### markup gallery #######

export async function createGallery(results) {
  const galleryEl = document.querySelector('.gallery-list');

  const cardEl = results
    .map(({ _id, title, rating, preview, description }) => {
      const starsEl = Array(5)
        .fill()
        .map((_, i) => {
          let activeStars = Math.floor(rating);
          const remainingRating =
            rating - activeStars !== 0
              ? rating - activeStars + 0.4
              : rating - activeStars;

          const sizeStar = window.innerWidth < 768 ? 16 : 13;

          if (i < activeStars) {
            return `<svg class="star-icon-active star" width="${sizeStar}" height="${sizeStar}">
                    <use href="${sprite}#star"
                      style="fill: rgba(238, 161, 12, 1)">
                    </use>
                  </svg>`;
          } else if (i === activeStars && remainingRating !== 0) {
            return `<svg class="star-icon-part star" width="${sizeStar}" height="${sizeStar}">
                    <use href="${sprite}#star" 
                      style="fill: rgb(238, 161, 12); opacity: ${remainingRating};">
                    </use>
                  </svg>`;
          } else {
            return `<svg class="star-icon star" width="${sizeStar}" height="${sizeStar}">
                      <use href="${sprite}#star"></use>
                  </svg>`;
          }
        })
        .join('');

      return `
        <li class="card-recipe card-recipe-fav" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${preview})">
          <svg class="heart-icon favorites heart-icon-fav remove-favor" id="${_id}" name="remove" width="22" height="22">
            <use href="${sprite}#heart"></use>
          </svg>
          <h3 class="card-recipe-title card-title-fav">${title}</h3>
          <p class="card-recipe-description">${description}</p>
          <div class="recipe-block recipe-block-fav">
            <div class="rating-block">
              <span class="rating-recipe">${rating}</span>
              ${starsEl}
            </div>   
            <button class="recipe-button see-recipe" id="${_id}" type="button">
              See recipe
            </button>
          </div>
        </li>
      `;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', cardEl);

  const dataStor = JSON.parse(localStorage.getItem('element_data')) || [];

  const buttonEls = document.querySelectorAll('.see-recipe');

  buttonEls.forEach(function (buttonEl) {
    buttonEl.addEventListener('click', function () {
      const id = buttonEl.getAttribute('id');
      createDataCard(id);
    });
  });

  const heartBtnEls = document.querySelectorAll('.heart-icon');

  heartBtnEls.forEach(function (heartBtnEl) {
    const id = heartBtnEl.getAttribute('id');
    if (!dataStor.includes(id)) {
      heartBtnEl.style.fill = 'none';
    } else {
      heartBtnEl.style.fill = 'rgba(255, 255, 255, 1)';
    }
  });

  const addBtnEls = document.querySelectorAll('.favorites');

  addBtnEls.forEach(function (addBtnEl) {
    addBtnEl.addEventListener('click', function () {
      const id = addBtnEl.getAttribute('id');

      if (!dataStor.includes(id)) {
        addBtnEl.style.fill = 'rgba(255, 255, 255, 1)';
        dataStor.push(id);
        Notiflix.Notify.success(
          'the recipe has been successfully added to your collection'
        );
      } else {
        const index = dataStor.indexOf(id);
        if (index !== -1) {
          Notiflix.Notify.info('The recipe is already in your collection');
        }
      }
      const allBtns = document.querySelectorAll(`[id="${id}"]`);
      allBtns.forEach(btn => {
        btn.style.fill = 'rgba(255, 255, 255, 1)';
      });
      localStorage.setItem('element_data', JSON.stringify(dataStor));
    });
  });
}
