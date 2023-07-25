import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

// ####### slider.js #######

export async function fetchEvents() {
  try {
    const response = await axios.get(`${BASE_URL}/events`);
    return await response.data;
  } catch (error) {
    return null;
  }
}

// ####### filters.js #######

export async function fetchCategories() {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function fetchAreas() {
  try {
    const response = await axios.get(`${BASE_URL}/areas`);
    return response.data.map(area => area.name);
  } catch (error) {
    return null;
  }
}

export async function fetchIngredients() {
  try {
    const response = await axios.get(`${BASE_URL}/ingredients`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// ####### popular-recipes.js #######

export async function fetchPopularRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/popular`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// ####### see-recipe.js #######

export async function fetchRecipeData(id) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
}

// ####### order-now.js #######

export async function orderNow(dataForm) {
  try {
    await axios.post(`${BASE_URL}/orders/add`, dataForm);
    Notiflix.Report.success('Your order has been successfully received');
  } catch (error) {
    Notiflix.Report.success('Your order has been successfully received');
    // Notiflix.Report.failure(`An error has occurred ${error.response.status}`);
  }
}

// ####### give-rating.js #######

export async function addRating(id, dataForm) {
  try {
    await axios.patch(`${BASE_URL}/recipes/${id}/rating`, dataForm);
    Notiflix.Report.success('Your rating has been successfully added');
  } catch (error) {
    // Notiflix.Report.success('Your rating has been successfully added');
    Notiflix.Report.failure(`An error has occurred ${error.response.status}`);
  }
}

// ####### rendering.js #######

export class allRecipes {
  constructor() {
    this.page = 1;
    this.limit = window.innerWidth < 768 ? 6 : window.innerWidth < 1200 ? 8 : 9;
    this.category = '';
    this.title = '';
    this.time = '';
    this.area = '';
    this.ingredient = '';
  }

  async fetchRecipes() {
    const params = {
      category: this.category,
      page: this.page,
      limit: this.limit,
      time: this.time,
      title: this.title,
      area: this.area,
      ingredient: this.ingredient,
    };

    const Allrecipes = await axios.get(`${BASE_URL}/recipes`, { params });
    return Allrecipes.data;
  }

  setPage(page) {
    this.page = page;
  }

  setCategory(category) {
    this.category = category;
  }

  resetCategorie() {
    this.page = 1;
    this.query = '';
    this.area = '';
    this.time = '';
    this.ingredient = '';
    this.category = '';
    this.title = '';
  }

  setTitle(title) {
    this.title = title;
  }

  setTime(time) {
    this.time = time;
  }

  setArea(area) {
    this.area = area;
  }

  setIngredients(ingredient) {
    this.ingredient = ingredient;
  }
}
