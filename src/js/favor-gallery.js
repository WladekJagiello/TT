import Notiflix from 'notiflix';
import sprite from '../images/sprite.svg';
import Pagination from 'tui-pagination';
import { createDataCard } from './see-recipe';
import { fetchRecipeData } from './APIrequests';

const heroEl = document.querySelector('.favorites-hero-mobile');
const removeEls = document.querySelectorAll('.remove-favor');
const galleryEl = document.querySelector('.favorites-list');
const zeroEl = document.querySelector('.favorites-zero');
const tagsEl = document.querySelector('.tags-list');

let dataStor = JSON.parse(localStorage.getItem('element_data')) || [];
const itemsPerPage = window.innerWidth < 768 ? 9 : 12;
const selector = '.favorites-list';
let tagsData = {};
let tagsSet = [];

async function createGallery() {
  const startIndex = (pagination.getCurrentPage() - 1) * itemsPerPage;
  const dataForPage = dataStor.slice(startIndex, startIndex + itemsPerPage);

  const recipePromises = dataForPage.map(async id => {
    const response = await fetchRecipeData(id);
    return response;
  });

  const recipes = await Promise.all(recipePromises);

  recipes.forEach(({ _id, tags }) => {
    tags.forEach(tag => {
      if (tagsData[tag]) {
        tagsData[tag].push(_id);
      } else {
        tagsData[tag] = [_id];
      }
    });
  });

  tagsSet = new Set();
  recipes.forEach(({ tags }) => {
    tags.forEach(tag => {
      if (!dataStor.includes(tag) && tag !== '') {
        tagsSet.add(tag);
      }
    });
  });

  const tagEl = Array.from(tagsSet)
    .map(tag => {
      return `<li class="tags-item">
              <button class="favorites-tags" type="button" data-tag="${tag}">
                ${tag}
              </button>
            </li>`;
    })
    .join('');

  tagsEl.innerHTML = tagEl;

  createCards(recipes);
}

async function updateGalleryByTag(selectedTag) {
  const filteredRecipeIds = tagsData[selectedTag] || [];
  const filteredData = dataStor.filter(recipeId =>
    filteredRecipeIds.includes(recipeId)
  );
  const recipePromises = filteredData.map(async id => {
    const response = await fetchRecipeData(id);
    return response;
  });
  const recipes = await Promise.all(recipePromises);

  createCards(recipes);
}

function createCards(recipes) {
  const cardEl = recipes
    .map(({ _id, title, rating, preview, description }) => {
      const starsEl = Array(5)
        .fill()
        .map((_, i) => {
          let activeStars = Math.floor(rating);
          const remainingRating =
            rating - activeStars !== 0
              ? rating - activeStars + 0.4
              : rating - activeStars;
          const sizeStar =
            window.innerWidth < 768 ? 16 : window.innerWidth < 1200 ? 12 : 14;

          if (i < activeStars) {
            return `<svg class="star-icon-active star" width="${sizeStar}" height="${sizeStar}">
                          <use href="${sprite}#star" style="fill: rgba(238, 161, 12, 1)"></use>
                        </svg>`;
          } else if (i === activeStars && remainingRating !== 0) {
            return `<svg class="star-icon-part star" width="${sizeStar}" height="${sizeStar}">
                          <use href="${sprite}#star" style="fill: rgb(238, 161, 12); opacity: ${remainingRating};"></use>
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

  galleryEl.innerHTML = cardEl;

  if (galleryEl.innerHTML === '') {
    heroEl.classList.remove('active');
    zeroEl.classList.remove('active');
  } else {
    heroEl.classList.add('active');
    zeroEl.classList.add('active');
  }

  const heartBtnEls = document.querySelectorAll('.heart-icon');
  heartBtnEls.forEach(function (heartBtnEl) {
    const id = heartBtnEl.getAttribute('id');
    if (!dataStor.includes(id)) {
      heartBtnEl.style.fill = 'none';
    } else {
      heartBtnEl.style.fill = 'rgba(255, 255, 255, 1)';
    }
  });

  const waginaEl = document.querySelector('.pagination-wrapper');
  if (
    recipes.length < 10 ||
    dataStor.length < 10 ||
    (window.innerWidth > 768 && dataStor.length < 13)
  ) {
    waginaEl.style.opacity = '0';
  }

  const buttonEls = document.querySelectorAll('.see-recipe');
  buttonEls.forEach(function (buttonEl) {
    buttonEl.addEventListener('click', function () {
      const id = buttonEl.getAttribute('id');
      createDataCard(id);
    });
  });

  removeEls.forEach(function (removeEl) {
    removeEl.textContent = 'Remove';
    removeEl.classList.add('remove-favor');
  });

  const deletEls = document.getElementsByName('remove');
  deletEls.forEach(deletEl => {
    deletEl.addEventListener('click', function () {
      const id = deletEl.getAttribute('id');
      const index = dataStor.indexOf(id);
      Notiflix.Confirm.show(
        'CHANGE YOUR MIND!',
        'Remove recipe from collection?',
        'Yes',
        'No',
        function okCb() {
          if (index !== -1) {
            dataStor.splice(index, 1);
            localStorage.setItem('element_data', JSON.stringify(dataStor));
            pagination.reset(dataStor.length);
            pagination.movePageTo(1);
            createGallery();
          }
          Notiflix.Notify.success('Slava Ukraine!');
        },
        function cancelCb() {
          Notiflix.Notify.success('Slava Ukraine!');
          return;
        },
        {
          width: '335px',
          borderRadius: '15px',
        }
      );
    });
  });

  const tagBtnEls = document.querySelectorAll('.favorites-tags');
  tagBtnEls.forEach(function (tagBtnEl) {
    tagBtnEl.addEventListener('click', function () {
      const selectedTag = tagBtnEl.getAttribute('data-tag');
      pagination.reset();
      updateGalleryByTag(selectedTag);
    });
  });

  tagsSet.forEach((recipes, tag) => {
    const tagButton = document.querySelector(`button[data-tag="${tag}"]`);
    if (recipes.length === 0) {
      tagButton.classList.add('inactive-tag');
    } else {
      tagButton.classList.remove('inactive-tag');
    }
  });
}

const pagination = new Pagination('pagination', {
  totalItems: dataStor.length,
  itemsPerPage: itemsPerPage,
  visiblePages: window.innerWidth < 768 ? 2 : 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn btn-move tui-{{type}}">' + '</a >',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
});

pagination.on('afterMove', event => {
  createGallery();
});

createGallery();
