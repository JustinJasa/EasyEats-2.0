import express from 'express'
import { getAllRecipes, getRecipesByCategoryName, getRecipesByRecipeName, getRecipeInfo, getRecipeCategories, 
         getRecipeIngredients, getRecipeSteps, getRecipeComments, createRecipe, createRecipeCategories, 
         createRecipeIngredients, createRecipeSteps, updateRecipeInfo, deleteRecipeCategories, deleteRecipeIngredients,
         deleteRecipeSteps, deleteRecipe, deleteComment, updateComment, createComment, getRecipesByUserId,
         getComment, createRecipeImage, getRecipeImages, getRecipeImage, deleteRecipeImages, getCategoryId} from '../controllers/queries.js';
import multer from 'multer'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { unlinkSync } from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "./public/images")
  },
  filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

const routerRecipes = express.Router()

//  - - - - - - - - - - - - -
//  - - - - - GET - - - - - -
//  - - - - - - - - - - - - -

// GET  ---  Get all recipes
routerRecipes.route("/all").get(async (req, res) => {
  const queryResult = await getAllRecipes()
  if(queryResult.length === 0) {
    res.status(404).send(queryResult)
  }
  else {
    res.status(200).send(queryResult)
  }
});

// GET  ---  Get recipes by categoryName
routerRecipes.route("/category/:categoryName").get(async (req, res) => {
  const queryResult = await getRecipesByCategoryName(req.params.categoryName)
  if(queryResult.length === 0) {
    res.status(404).send(queryResult)
  }
  else {
    res.status(200).send(queryResult)
  }
});

// GET  ---  Get recipes by recipeName
routerRecipes.route("/name/:recipeName").get(async (req, res) => {
  const queryResult = await getRecipesByRecipeName(req.params.recipeName)
  if(queryResult.length === 0) {
    res.status(404).send(queryResult)
  }
  else {
    res.status(200).send(queryResult)
  }
});

// GET  --- Get recipes by userId
routerRecipes.route("/user/:userId").get(async (req, res) => {
  const queryResult = await getRecipesByUserId(req.params.userId)
  if(queryResult.length === 0) {
    res.status(404).send(queryResult)
  }
  else {
    res.status(200).send(queryResult)
  }
})

// GET  --- Get recipe basic info by recipeId
routerRecipes.route("/:recipeId").get(async (req, res) => {
  try {
    const queryResult = await getRecipeInfo(req.params.recipeId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
});

// GET  --- Get recipe images by recipeId
routerRecipes.get("/:recipeId/images", async (req, res) => {
  try {
    const recipeId = req.params.recipeId
    const queryResult = await getRecipeImages(recipeId)
    console.log(queryResult)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
})

// GET  --- Get recipe image by imageId
routerRecipes.get("/:recipeId/images/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId
    const result = await getRecipeImage(imageId)
    
    // console.log(path.dirname(fileURLToPath(import.meta.url)).slice(0, -6) + result[0].path)
    
    // dirname path is <path_to_folder>/Easy-Eats-Backend/routes
    // Used .slice(0, -6) to remove the /routes from the path, and append to it /public/images/:imageName
    const routesDirName = "routes"
    res.sendFile(path.dirname(fileURLToPath(import.meta.url)).slice(0, -routesDirName.length) + result[0].path)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
})

// GET  --- Get recipe categories by recipeId
routerRecipes.route("/:recipeId/categories").get(async (req, res) => {
  try {
    const queryResult = await getRecipeCategories(req.params.recipeId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
});

// GET  --- Get recipe ingredients by recipeId
routerRecipes.route("/:recipeId/ingredients").get(async (req, res) => {
  try {
    const queryResult = await getRecipeIngredients(req.params.recipeId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
});

// GET  --- Get recipe steps by recipeId
routerRecipes.route("/:recipeId/steps").get(async (req, res) => {
  try {
    const queryResult = await getRecipeSteps(req.params.recipeId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
});

//  GET --- Get recipe comments by recipeId
routerRecipes.route("/:recipeId/comments/all").get(async (req, res) => {
  try {
    const queryResult = await getRecipeComments(req.params.recipeId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
});

//  GET --- Get a recipe's comment by its id
routerRecipes.route("/:recipeId/comments/:commentId").get(async (req, res) => {
  try {
    const queryResult = await getComment(req.params.commentId)
    res.status(200).send(queryResult)
  } catch(error) {
    res.status(404).send("Error:" + error)
  }
})

//  - - - - - - - - - - - - -
//  - - - - - POST - - - - -
//  - - - - - - - - - - - - -

//  POST --- Insert a new recipe's basic info
routerRecipes.route("/new").post(async (req, res) => {
  const { userId, name, description, time_h, time_m, price } = req.body
  
  if (name.length > 0 && description.length > 0 && time_h !== null && time_m !== null, price !== null){
    const queryResult = await createRecipe(userId, name, description, time_h, time_m, price)
    res.status(200).send(queryResult)
  }

  res.status(403).send('The recipe is missing information');
})

// POST  --- Insert a recipe's images
routerRecipes.post("/:recipeId/images/new", upload.array("images"), async (req, res) => {
  const recipeId = req.params.recipeId

  // If req.files contains images (is not undefined), then add them to the database
  if(req.files !== undefined) {
    // Iterate through images and insert each one
    for(let i = 0; i < req.files.length; i++) {
      const result = await createRecipeImage(recipeId, req.files[i].filename, req.files[i].path)
      console.log(result)
    }
  }
  res.status(200).send(`Added ${req.files.length} images to recipe ${recipeId}`)

})

//  POST --- Insert a recipe's categories
routerRecipes.route("/:recipeId/categories/new").post(async (req, res) => {
  const recipeId = req.params.recipeId
  const { categories } = req.body

  if(categories.length > 0){
    for(let i = 0; i < categories.length; i++) {
      const categoryId = await getCategoryId(categories[i])
      const queryResult = await createRecipeCategories(recipeId, categoryId[0].category_id)
    }
    res.status(200).send(`Added ${categories.length} categories to recipe ${recipeId}`)
  }

  res.status(403).send('There must be at least one category');

  
})

//  POST --- Insert a recipe's ingredients
routerRecipes.route("/:recipeId/ingredients/new").post(async (req, res) => {
  const recipeId = req.params.recipeId
  const { ingredients } = req.body

  if(ingredients.length > 0){
    for(let i = 0; i < ingredients.length; i++){
      const description = ingredients[i]
      const queryResult = await createRecipeIngredients(recipeId, description)
    }
    res.status(200).send(`Added ${ingredients.length} ingredients to recipe ${recipeId}`)
  }

  res.status(403).send('There must be at least one ingredient');

})

//  POST --- Insert a recipe's steps
routerRecipes.route("/:recipeId/steps/new").post(async (req, res) => {
  const recipeId = req.params.recipeId
  const { steps } = req.body

  if(steps.length > 0){
    for(let i = 0; i < steps.length; i++) {
      const description = steps[i]
      const queryResult = await createRecipeSteps(recipeId, description)
    }
    res.status(200).send(`Added ${steps.length} steps to recipe ${recipeId}`)
  }
  
  res.status(403).send('There must be at least one step');


})

//  POST --- Insert a new comment on a recipe
routerRecipes.route("/:recipeId/comments/new").post(async (req, res) => {
  const recipeId = req.params.recipeId
  const { userId, comment } = req.body

  if(comment.length > 0){
    const queryResult = await createComment(userId, recipeId, comment)
    res.status(200).send(queryResult)
  }

  res.status(403).send('There must be minimum 10 characters');

})

//  - - - - - - - - - - - - -
//  - - - - - PUT - - - - - -
//  - - - - - - - - - - - - -

// PUT  --- Update the basic info of a recipe
routerRecipes.route("/:recipeId/edit").put(async (req, res) => {
  const recipeId = req.params.recipeId
  const { name, description, time_h, time_m, price } = req.body
  const queryResult = await updateRecipeInfo(recipeId, name, description, time_h, time_m, price)

  res.status(200).send(queryResult)
})

// PUT  --- Update the images of a recipe
routerRecipes.put("/:recipeId/images/edit", upload.array("images"), async (req, res) => {
  const recipeId = req.params.recipeId

  // Get the paths for the images to delete the files locally /public/images
  const images = await getRecipeImages(recipeId)

  // Delete the files for the images locally
  for(let i = 0; i < images.length; i++) {
    // console.log(images[i].path)
    try {
      const routesDirName = "routes"
      unlinkSync(path.dirname(fileURLToPath(import.meta.url)).slice(0, -routesDirName.length) + images[i].path)
    } catch(error) {
      res.status(500).send(error)
    }
  }

  // Clear images for current recipe
  deleteRecipeImages(recipeId)

  if(req.files !== undefined) {
    // Iterate through images and insert each one
    for(let i = 0; i < req.files.length; i++) {
      // console.log(req.files[i].originalname, req.files[i].filename, req.files[i].path)
      const result = await createRecipeImage(recipeId, req.files[i].filename, req.files[i].path)
    }
  }

  res.status(200).send(`Recipe ${recipeId} now has ${req.files !== undefined ? req.files.length : 0} images`)
})

// PUT  --- Update the categories of a recipe
routerRecipes.route("/:recipeId/categories/edit").put(async (req, res) => {
  const recipeId = req.params.recipeId
  const { categories } = req.body
  
  // Clear categories for current recipe
  deleteRecipeCategories(recipeId)

  // Then add the new ones
  for(let i = 0; i < categories.length; i++) {
    const categoryId = await getCategoryId(categories[i])
    const queryResult = await createRecipeCategories(recipeId, categoryId[0].category_id)
  }
  res.status(200).send(`Recipe ${recipeId} now has ${categories.length} categories`)
})

// PUT  --- Update the ingredients of a recipe
routerRecipes.route("/:recipeId/ingredients/edit").put(async (req, res) => {
  const recipeId = req.params.recipeId
  const { ingredients } = req.body

  // Delete ingredients from ingredients table
  deleteRecipeIngredients(recipeId)

  // Then add the new ones
  for(let i = 0; i < ingredients.length; i++) {
    const ingredientId = ingredients[i]
    const queryResult = await createRecipeIngredients(recipeId, ingredientId)
  }
  res.status(200).send(`Recipe ${recipeId} now has ${ingredients.length} ingredients`)
})

// PUT  --- Update the steps of a recipe
routerRecipes.route("/:recipeId/steps/edit").put(async (req, res) => {
  const recipeId = req.params.recipeId
  const { steps } = req.body

  // Delete ingredients from ingredients table
  deleteRecipeSteps(recipeId)

  // Then add the new ones
  for(let i = 0; i < steps.length; i++) {
    const stepId = steps[i]
    const queryResult = await createRecipeSteps(recipeId, stepId)
  }
  res.status(200).send(`Recipe ${recipeId} now has ${steps.length} steps`)
})

//  PUT --- Update a comment on a recipe
routerRecipes.route("/:recipeId/comments/:commentId/edit").put(async (req, res) => {
  const commentId = req.params.commentId
  const { comment } = req.body

  const queryResult = await updateComment(commentId, comment)
  res.status(200).send(`Comment ${commentId} has been updated`)
})

//  - - - - - - - - - - - - -
//  - - - - - DELETE  - - - -
//  - - - - - - - - - - - - -

// DELETE --- Delete a recipe
routerRecipes.route("/:recipeId/delete").delete(async (req, res) => {
  const recipeId = req.params.recipeId

  // Get the paths for the images to delete the files locally /public/images
  const images = await getRecipeImages(recipeId)

  // Delete the files for the images locally
  for(let i = 0; i < images.length; i++) {
    // console.log(images[i].path)
    try {
      const routesDirName = "routes"
      unlinkSync(path.dirname(fileURLToPath(import.meta.url)).slice(0, -routesDirName.length) + images[i].path)
    } catch(error) {
      res.status(500).send(error)
    }
  }

  deleteRecipe(recipeId)

  res.status(200).send(`Recipe has been deleted`)
})

// DELETE --- Delete a comment on a recipe
routerRecipes.route("/:recipeId/comments/:commentId/delete").delete(async (req, res) => {
  const commentId = req.params.commentId

  deleteComment(commentId)

  res.status(200).send(`Comment has been deleted`)
})

export default routerRecipes
