import { fetchCategories, fetchAreas, fetchIngredients } from "./APIrequests";

// ####### markup categories-list #######

async function createCategoriesList() {
    const containerEl = document.querySelector(".categories-list");
    const response = await fetchCategories();
    response.sort();
    const buttonEl = response
        .map(({ name }) => {
            return `<button class="category-item" type="button">${name}</button>`;
        })
        .join("");
    containerEl.innerHTML += buttonEl;
}

// ####### markup time-list #######

async function createTimeList() {
    const inputEl = document.querySelector(".time-input");
    const iconEl = document.querySelector(".time-icon");
    const placeholderEl = document.querySelector(".time-placeholder");
    const containerEl = document.querySelector(".time-list");

    for (let i = 5; i <= 120; i += 5) {
        const buttonEl = `<li>
                      <button class="time-item" type="button">${i} min</button>
                    </li>`;
        containerEl.insertAdjacentHTML("beforeend", buttonEl);
    }

    inputEl.addEventListener("click", () => {
        containerEl.classList.toggle("active");
        iconEl.classList.toggle("active");
    });

    const itemEls = document.querySelectorAll(".time-item");
    itemEls.forEach(function (item) {
        item.addEventListener("click", function () {
            placeholderEl.textContent = item.textContent;
            placeholderEl.classList.add("active");
        });
    });
}

// ####### markup area-list #######

async function createAreasList() {
    const inputEl = document.querySelector(".area-input");
    const iconEl = document.querySelector(".area-icon");
    const placeholderEl = document.querySelector(".area-placeholder");
    const containerEl = document.querySelector(".area-list");
    const areas = await fetchAreas();
    areas.sort();
    const buttonEl = areas
        .map(
            (area) => `<li>
                 <button class="area-item" type="button">${area}</button>
               </li>`
        )
        .join("");
    containerEl.insertAdjacentHTML("beforeend", buttonEl);

    inputEl.addEventListener("click", () => {
        containerEl.classList.toggle("active");
        iconEl.classList.toggle("active");
    });

    const itemEls = document.querySelectorAll(".area-item");
    itemEls.forEach(function (item) {
        item.addEventListener("click", function () {
            placeholderEl.textContent = item.textContent;
            placeholderEl.classList.add("active");
        });
    });
}

// ####### markup ingredient-list #######

async function createIngredientsList() {
    const placeholderEl = document.querySelector(".ingredient-placeholder");
    const iconEl = document.querySelector(".ingredient-icon");
    const inputEl = document.querySelector(".ingredient-input");
    const containerEl = document.querySelector(".ingredient-list");
    const response = await fetchIngredients();
    const ingredients = response
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
    const buttonEls = ingredients
        .map(({ _id, name }) => {
            return `<li>
              <button class="ingredient-item" id="${_id}" type="button">${name}</button>
            </li>`;
        })
        .join("");
    containerEl.insertAdjacentHTML("beforeend", buttonEls);

    inputEl.addEventListener("click", () => {
        containerEl.classList.toggle("active");
        iconEl.classList.toggle("active");
    });

    const itemEls = document.querySelectorAll(".ingredient-item");
    itemEls.forEach(function (item) {
        item.addEventListener("click", function () {
            placeholderEl.textContent = item.textContent;
            placeholderEl.classList.add("active");
        });
    });
}

createIngredientsList();
createCategoriesList();
createAreasList();
createTimeList();
