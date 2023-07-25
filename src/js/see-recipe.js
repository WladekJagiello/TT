import sprite from '../images/sprite.svg';
import { fetchRecipeData } from './APIrequests';

export async function createDataCard(id) {
  const ingredientsEl = document.querySelector('.ingredients-block');
  const ratingTimeEl = document.querySelector('.rating-time');
  const lowerBlockEl = document.querySelector('.lower-block');
  const backdropEl = document.querySelector('.see-backdrop');
  const giveBtnEl = document.querySelector('.give-rating');
  const addBtnEll = document.querySelector('.to-favorite');
  const titleEl = document.querySelector('.recipe-name');
  const modalEl = document.querySelector('.see-modal');
  const closeEl = document.querySelector('.see-close');
  const videoEl = document.querySelector('.video');

  let isRequestSent = false;

  if (!isRequestSent) {
    isRequestSent = true;
    const response = await fetchRecipeData(id);

    toggleModal();
    resetData();

    const {
      youtube,
      thumb,
      description,
      title,
      rating,
      time,
      ingredients,
      tags,
      instructions,
    } = response;

    if (
      !youtube ||
      youtube === '' ||
      youtube === null ||
      youtube.includes('watch?') === false
    ) {
      videoEl.innerHTML = `<div class="thumb" style="background-image: url('${thumb}');" alt="${description}">
                      </div>`;
    } else {
      videoEl.innerHTML = `<iframe class="recipe-video"
                        src="${youtube.replace('watch?v=', 'embed/')}"
                        frameborder="0"
                        alt="${description}">
                      </iframe>`;
    }

    titleEl.textContent = title;

    ratingTimeEl.innerHTML = `<span class="rating-span">${rating}</span>`;

    const stars = Array(5)
      .fill()
      .map((_, i) => {
        let activeStars = Math.floor(rating);
        const remainingRating =
          rating - activeStars !== 0
            ? rating - activeStars + 0.3
            : rating - activeStars;

        const sizeStar = window.innerWidth < 768 ? 15 : 16;

        if (i < activeStars) {
          return `<svg class="star-icon-active star see"
                          width="${sizeStar}" height="${sizeStar}">
                          <use href="${sprite}#star"
                            style="fill: rgba(238, 161, 12, 1)">
                          </use>
                        </svg>`;
        } else if (i === activeStars && remainingRating !== 0) {
          return `<svg class="star-icon-part star see"
                          width="${sizeStar}" height="${sizeStar}">
                          <use href="${sprite}#star"
                            style="fill: rgb(238, 161, 12); opacity: ${remainingRating};">
                          </use>
                        </svg>`;
        } else {
          return `<svg class="star-icon star see-star see"
                          width="${sizeStar}" height="${sizeStar}">
                          <use href="${sprite}#star"></use>
                        </svg>`;
        }
      })
      .join('');

    ratingTimeEl.insertAdjacentHTML('beforeend', stars);

    const timeRecipe = `<span class="time-span">${time} min</span>`;

    ratingTimeEl.insertAdjacentHTML('beforeend', timeRecipe);

    const ingredientsRecipe = ingredients
      .flatMap(ingredient => {
        const { name, measure } = ingredient;
        return `<div class="ingredients-recipe">
                        <span class="ingredient">${name}</span>
                        <span class="measure">${measure}</span>
                      </div>`;
      })
      .join('');

    ingredientsEl.innerHTML += ingredientsRecipe;

    const tagsRecipe = tags
      .map(tag => {
        return `<span class="tag">#${tag}</span>`;
      })
      .join('');
    const tagsList = `<div class-"tags-list">${tagsRecipe}</div>`;

    lowerBlockEl.innerHTML += tagsList;

    const instructionsRecipe = `<p class="instructions">${instructions}</p>`;

    lowerBlockEl.innerHTML += instructionsRecipe;

    giveBtnEl.setAttribute('data', `${description}`);
    giveBtnEl.setAttribute('id', `${id}`);
    addBtnEll.setAttribute('id', `${id}`);

    isRequestSent = false;
  }

  modalEl.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      backdropEl.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  backdropEl.addEventListener('click', function () {
    backdropEl.classList.remove('active');
    document.body.style.overflow = '';
  });

  closeEl.addEventListener('click', function () {
    backdropEl.classList.remove('active');
    document.body.style.overflow = '';
  });

  function toggleModal() {
    backdropEl.classList.toggle('active');

    if (backdropEl.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  function resetData() {
    videoEl.innerHTML = '';
    titleEl.textContent = '';
    ratingTimeEl.innerHTML = '';
    ingredientsEl.innerHTML = '';
    lowerBlockEl.innerHTML = '';
  }
}
