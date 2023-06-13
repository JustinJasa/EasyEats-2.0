// API calls to the backend
import { headers } from "@/next.config";
import axios from "axios";
import { authAxios } from "./authAxios";

// const token = 

// GET - All categories


// GET - All recipes
export const getAllRecipes = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/recipes/all`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - Recipes by category name
export const getRecipesByCategoryName = async (categoryName) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/category/${categoryName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - Recipes by recipe name
export const getRecipesByRecipeName = async (recipeName) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/name/${recipeName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



// GET - Recipe categories by recipeId
export const getRecipeCategories = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/${recipeId}/categories`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - Recipe ingredients by recipeId
export const getRecipeIngredients = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/${recipeId}/ingredients`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - Recipe steps by recipeId
export const getRecipeSteps = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/${recipeId}/steps`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - All recipe comments by recipeId
export const getRecipeComments = async (recipeId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/${recipeId}/comments/all`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - Recipe comment by recipeId and commentId
export const getRecipeComment = async (recipeId, commentId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/recipes/${recipeId}/comments/${commentId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - All users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://backend_container:8000/users/all`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// GET - User by userId
export const getUser = async (userId) => {
  try {
    const response = await axios.get(`http://backend_container:8000/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// - - - - - - - - - - - - - - - - - - - -
// - - - - - - - POST - -  - - - - - - - -
// - - - - - - - - - - - - - - - - - - - -

// POST - Recipe info
export const postRecipeInfo = async (
  userId,
  name,
  description,
  time_h,
  time_m,
  price
) => {
  try {
    const response = await axios.post(`http://localhost:8000/recipes/new`, {
      userId: userId,
      name: name,
      description: description,
      time_h: time_h,
      time_m: time_m,
      price: price,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// POST - Recipe images
export const postRecipeImages = async (recipeId, formData) => {
    try {
        const response = await axios.post(
          `http://localhost:8000/recipes/${recipeId}/images/new`,
          formData,
          {
            headers: {
                "Content-Type": "multipart/form-data"
            }
          }
        )

        return response.data
    } catch(error) {
        console.log(error)
    }
}

// POST - Recipe categories
export const postRecipeCategories = async (recipeId, categories) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/${recipeId}/categories/new`,
      {
        categories: categories,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// POST - Recipe ingredients
export const postRecipeIngredients = async (recipeId, ingredients) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/${recipeId}/ingredients/new`,
      {
        ingredients: ingredients,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// POST - Recipe steps
export const postRecipeSteps = async (recipeId, steps) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/${recipeId}/steps/new`,
      {
        steps: steps,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// POST - Comment on a recipe
export const postRecipeComment = async (recipeId, userId, comment, rating) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/recipes/${recipeId}/comments/new`,
      {
        userId: userId,
        comment: comment,
        rating: rating,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// POST - User
export const postUser = async (recipeId, username, email, password) => {
  try {
    const response = await axios.post(`http://backend_container:8000/users/new`, {
      username: username,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - PUT - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - -

// PUT - Recipe info
export const putRecipeInfo = async (
  recipeId,
  name,
  description,
  time_h,
  time_m,
  price
) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/${recipeId}/edit`,
      {
        name: name,
        description: description,
        time_h: time_h,
        time_m: time_m,
        price: price,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PUT - Recipe categories
export const putRecipeCategories = async (recipeId, categories) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/${recipeId}/categories/edit`,
      {
        categories: categories,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PUT - Recipe ingredients
export const putRecipeIngredients = async (recipeId, ingredients) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/${recipeId}/ingredients/edit`,
      {
        ingredients: ingredients,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PUT - Recipe steps
export const putRecipeSteps = async (recipeId, steps) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/${recipeId}/steps/edit`,
      {
        steps: steps,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PUT - Comment on recipe
export const putRecipeComment = async (
  recipeId,
  commentId,
  comment,
  rating
) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/recipes/${recipeId}/comments/${commentId}/edit`,
      {
        comment: comment,
        rating: rating,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// PUT - User
export const putUser = async (userId, username, password) => {
  try {
    const response = await axios.put(
      `http://backend_container:8000/users/${userId}/edit`,
      {
        username: username,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - -

// DELETE - Recipe
export const deleteRecipe = async (recipeId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/recipes/${recipeId}/delete`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE - Comment
export const deleteComment = async (recipeId, commentId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/recipes/${recipeId}/comments/${commentId}/delete`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// DELETE - User
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      `http://backend_container:8000/users/${userId}/delete`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
