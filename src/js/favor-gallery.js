import Notiflix from 'notiflix';
import sprite from '../images/sprite.svg';
import Pagination from 'tui-pagination';
import { createDataCard } from './see-recipe';
import { fetchRecipeData } from './APIrequests';

// localStorage.clear();

const galleryEl = document.querySelector('.favorites-list');
const dataStor = JSON.parse(localStorage.getItem('element_data')) || [];
const itemsPerPage = window.innerWidth < 768 ? 9 : 12;
let isClicked = false;
let tagsData = {};
let totalCards;

async function createGallery() {
  const startIndex = (pagination.getCurrentPage() - 1) * itemsPerPage;
  const dataForPage = dataStor.slice(startIndex, startIndex + itemsPerPage);
  const recipePromises = dataForPage.map(async id => {
    const response = await fetchRecipeData(id);
    return response;
  });
  const AllFavorites = await Promise.all(recipePromises);
  totalCards = dataStor.length;
  createCards(AllFavorites, totalCards);
}

const tagsEl = document.querySelector('.favor-tags-list');
const AllPromises = dataStor.map(async id => {
  const response = await fetchRecipeData(id);
  return response;
});
const recipesAllTags = await Promise.all(AllPromises);
tagsData = recipesAllTags.reduce((result, { _id, tags }) => {
  tags.forEach(tag => {
    if (tag !== '' && !result[tag]) {
      result[tag] = [_id];
    } else if (tag !== '' && !result[tag].includes(_id)) {
      result[tag].push(_id);
    }
  });
  return result;
}, {});
const tagEl = Object.keys(tagsData)
  .sort()
  .map(tag => {
    return `<li class="tags-item">
          <button class="favorites-tags" type="button" data-tag="${tag}">
            ${tag}
          </button>
        </li>`;
  })
  .join('');
tagsEl.innerHTML += tagEl;

async function galleryByTag(selectedTag) {
  const filteredRecipeIds = tagsData[selectedTag] || [];
  const filteredData = dataStor.filter(recipeId =>
    filteredRecipeIds.includes(recipeId)
  );
  const recipePromises = filteredData.map(async id => {
    const response = await fetchRecipeData(id);
    return response;
  });
  const recipesByTeg = await Promise.all(recipePromises);
  totalCards = recipesByTeg.length;
  createCards(recipesByTeg, totalCards);
}

function createCards(recipes, totalCards) {
  galleryEl.innerHTML = '';
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
          <li class="card-recipe" id="${_id}" style="background-image: linear-gradient(rgba(5, 5, 5, 0.3), rgba(5, 5, 5, 0.3)), url(${preview})">
            <svg class="heart-icon remuve" id="${_id}" width="22" height="22">
              <use href="${sprite}#heart"></use>
            </svg>
            <h3 class="card-recipe-title">${title}</h3>
            <p class="card-recipe-description">${description}</p>
            <div class="recipe-block">
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

  const heroEl = document.querySelector('.hero');
  const zeroEl = document.querySelector('.favorites-zero');
  const allTagsBtnEl = document.querySelector('.all-tags');
  if (galleryEl.innerHTML === '') {
    heroEl.classList.remove('active');
    zeroEl.classList.add('active');
    allTagsBtnEl.style.display = 'none';
  } else {
    heroEl.classList.add('active');
    zeroEl.classList.remove('active');
    allTagsBtnEl.display = 'flex';
  }

  const waginaEl = document.querySelector('.pagination-wrapper');
  if (
    (window.innerWidth < 768 && totalCards < 10) ||
    (window.innerWidth > 768 && totalCards < 13)
  ) {
    waginaEl.style.display = 'none';
  } else {
    waginaEl.style.display = 'flex';
  }

  const tagBtnEls = document.querySelectorAll('.favorites-tags');
  tagBtnEls.forEach(function (tagBtnEl) {
    tagBtnEl.addEventListener('click', function () {
      if (!isClicked) {
        isClicked = true;
        if (tagBtnEl.classList.contains('all-tags')) {
          deactivateActive();
          tagBtnEl.classList.add('active');
          pagination.reset();
          createGallery();
        } else {
          const selectedTag = tagBtnEl.getAttribute('data-tag');
          deactivateActive();
          tagBtnEl.classList.add('active');
          pagination.reset();
          galleryByTag(selectedTag);
        }
        setTimeout(function () {
          isClicked = false;
        }, 250);
      }
    });
  });

  function deactivateActive() {
    tagBtnEls.forEach(tagBtnEl => {
      tagBtnEl.classList.remove('active');
    });
  }

  const buttonEls = document.querySelectorAll('.see-recipe');
  buttonEls.forEach(function (buttonEl) {
    buttonEl.addEventListener('click', function () {
      if (!isClicked) {
        isClicked = true;
        const id = buttonEl.getAttribute('id');
        createDataCard(id);
      }
      setTimeout(function () {
        isClicked = false;
      }, 250);
    });
  });

  const backdropEl = document.querySelector('.see-backdrop');
  const deletEls = document.querySelectorAll('.remuve');
  deletEls.forEach(deletEl => {
    deletEl.addEventListener('click', function () {
      if (!isClicked) {
        isClicked = true;
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
              backdropEl.classList.remove('active');
              document.body.style.overflow = '';
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
      }
      setTimeout(function () {
        isClicked = false;
      }, 250);
    });
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
