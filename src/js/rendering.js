import Notiflix from "notiflix";
import debounce from "lodash.debounce";
import Pagination from "tui-pagination";
import { allRecipes } from "./APIrequests";
import { createGallery } from "./gallery";

const filter = new allRecipes();
const ingredientValueEl = document.querySelector(".ingredient-placeholder");
const categoriesEl = document.querySelector(".categories-list");
const allCategoryEl = document.querySelector(".button-all-categories");
const ingredientEl = document.querySelector(".ingredient-list");
const timeValueEl = document.querySelector(".time-placeholder");
const areaValueEl = document.querySelector(".area-placeholder");
const searchInEl = document.querySelector(".search-input");
const galleryEl = document.querySelector(".gallery-list");
const searchEl = document.querySelector(".search-icon");
const resetEl = document.querySelector(".reset-btn");
const timeEl = document.querySelector(".time-list");
const areaEl = document.querySelector(".area-list");
let isClicked = false;
let optionCategopy;

allCategoryEl.addEventListener("click", function () {
  isClicked = true;
  // deactivateCategory();
  optionCategopy = false;
  allCategoryEl.classList.add("active");
  timeValueEl.textContent = "0 min";
  timeValueEl.classList.remove("active");
  areaValueEl.textContent = "Region";
  areaValueEl.classList.remove("active");
  ingredientValueEl.textContent = "Product";
  ingredientValueEl.classList.remove("active");
  searchEl.classList.remove("active");
  searchInEl.value = "";
  filter.resetCategorie();
  renderGallery();
});

const categoryEls = document.querySelectorAll(".category-item");
categoriesEl.addEventListener("click", function (event) {
  deactivateCategory();
  console.log(event.target);
  const category = event.target.textContent;
  optionCategopy = true;
  allCategoryEl.classList.remove("active");
  filter.setCategory(category);
  renderGallery();
  event.target.classList.add("active");
});

function deactivateCategory() {
  categoryEls.forEach((categoryEl) => {
    categoryEl.classList.remove("active");
  });
}

searchInEl.addEventListener(
  "input",
  debounce(() => {
    allCategoryEl.classList.remove("active");
    const title = String(searchInEl.value.trim());
    if (title !== "") {
      searchEl.classList.add("active");
      resetEl.style.display = "block";
      filter.setTitle(title);
      renderGallery();
    } else {
      activeAllCategory();
      searchEl.classList.remove("active");
      resetEl.style.display = "none";
      renderGallery();
    }
  }, 300)
);

resetEl.addEventListener("click", function () {
  activeAllCategory();
  searchInEl.value = "";
  resetEl.style.display = "none";
  searchEl.classList.remove("active");
  filter.setTitle("");
  renderGallery();
});

function activeAllCategory() {
  if (
    timeValueEl.textContent === "0 min" &&
    areaValueEl.textContent === "Region" &&
    ingredientValueEl.textContent === "Product" &&
    optionCategopy === false
  ) {
    allCategoryEl.classList.add("active");
  }
}

timeEl.addEventListener("click", function (event) {
  allCategoryEl.classList.remove("active");
  const time = parseInt(event.target.textContent);
  filter.setTime(time);
  renderGallery();
});

areaEl.addEventListener("click", function (event) {
  allCategoryEl.classList.remove("active");
  const area = event.target.textContent;
  filter.setArea(area);
  renderGallery();
});

ingredientEl.addEventListener("click", function (event) {
  allCategoryEl.classList.remove("active");
  const ingredient = event.target.id;
  filter.setIngredients(ingredient);
  renderGallery();
});

const pagination = new Pagination("pagination", {
  totalItems: 0,
  itemsPerPage: window.innerWidth < 768 ? 6 : window.innerWidth < 1200 ? 8 : 9,
  visiblePages: window.innerWidth < 768 ? 2 : 3,
  page: 1,
  centerAlign: true,
  firstItemClassName: "tui-first-child",
  lastItemClassName: "tui-last-child",
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn btn-move tui-{{type}}">' + "</a >",
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' + "</span>",
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      "</a>",
  },
});

pagination.on("afterMove", async (event) => {
  galleryEl.innerHTML = "";
  const page = event.page;
  filter.setPage(page);
  const response = await filter.fetchRecipes();
  const unique = new Set();
  response.results.forEach((result) => {
    unique.add(result);
  });
  const uniqueResults = Array.from(unique);
  createGallery(uniqueResults);
});

function paginationHide(totalItems) {
  const paginaEl = document.querySelector(".pagination-wrapper");
  if (
    (totalItems < 7 && window.innerWidth < 768) ||
    (totalItems < 9 && window.innerWidth < 1200) ||
    (totalItems < 10 && window.innerWidth > 1200)
  ) {
    paginaEl.classList.add("hide");
  } else {
    paginaEl.classList.remove("hide");
  }
}

async function renderGallery() {
  galleryEl.innerHTML = "";
  const response = await filter.fetchRecipes();
  const unique = new Set();
  response.results.forEach((result) => {
    unique.add(result);
  });
  const uniqueResults = Array.from(unique);
  createGallery(uniqueResults);
  const totalItems = response.totalPages * response.perPage;
  paginationHide(totalItems);
  pagination.reset(totalItems);
}
renderGallery();
