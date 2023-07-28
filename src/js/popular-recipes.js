import { fetchPopularRecipes } from "./APIrequests";

// ####### markup popular-recipes-list #######

async function createPopularList() {
  const containerEls = document.querySelectorAll(".recipes-list");
  const results = await fetchPopularRecipes();
  const cardEl = results
    .flatMap((result) => {
      const { _id, title, preview, description } = result;
      return `
      <li class="card-popular" >   
        <button class="popular-button see-recipe" id="${_id}" type="button">
          <img class="preview-popular" src="${preview}" alt="${title}">          
          <div class="popular-block">
            <h2 class="popular-title">${title}</h2>    
            <p class="popular-description">${description}</p>
          </div>
        </button>        
      </li>
    `;
    })
    .join("");
  containerEls.forEach((containerEl) => {
    containerEl.insertAdjacentHTML("beforeend", cardEl);
  });

  const buttonEls = document.querySelectorAll(".see-recipe");
  let isClicked = false;
  buttonEls.forEach(function (buttonEl) {
    buttonEl.addEventListener("click", function () {
      if (!isClicked) {
        isClicked = true;
        const id = buttonEl.getAttribute("id");
        createDataCard(id);
      }
      setTimeout(function () {
        isClicked = false;
      }, 250);
    });
  });
}
createPopularList();
