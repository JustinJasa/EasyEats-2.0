//importing the database
import pool from '../services/db.js'

/**
 To access the database, the query function from the mysql2 package is used.
 This function is used to execute SQL statements to the database. The results of these
 statements are stored and handled appropriately.
 */

// Get name of ALL categories
export const getAllCategories = async () => {
    const [categories] = await pool.query(`
    SELECT name, category_id FROM categories`)

    // Throw an error if the query result is empty
    if(!categories.length) {
        throw new Error("Cannot fetch categories")
    }

    return categories
};

// Get name of ALL categories
export const getCategoryId = async (categoryName) => {
    const [category] = await pool.query(`
    SELECT category_id
    FROM categories
    WHERE name = ?`, [categoryName])

    // Throw an error if the query result is empty
    if(!category.length) {
        throw new Error("Cannot fetch category")
    }

    return category
};

// Get basic info (recipeName, user) of ALL recipes
export const getAllRecipes = async () => {
    const [recipes] = await pool.query(`
    SELECT r.recipe_id, r.name, u.username, MIN(i.image_id) AS image_id, r.date
    FROM users u
    INNER JOIN recipes r ON u.user_id = r.user_id
    LEFT JOIN images i ON r.recipe_id = i.recipe_id
    GROUP BY r.recipe_id
    ORDER BY r.recipe_id DESC`)
    
    return recipes
};

// Get basic info (recipeName, user) of recipes by categoryName
export const getRecipesByCategoryName = async (categoryName) => {
    const [recipes] = await pool.query(`
    SELECT r.recipe_id, r.name, u.username, MIN(i.image_id) AS image_id, r.date
    FROM users u
    INNER JOIN recipes r ON u.user_id = r.user_id
    INNER JOIN recipe_categories rc ON r.recipe_id = rc.recipe_id
    INNER JOIN categories c ON rc.category_id = c.category_id
    LEFT JOIN images i ON r.recipe_id = i.recipe_id
    WHERE c.name = ?
    GROUP BY r.recipe_id
    ORDER BY r.recipe_id DESC`, [categoryName])

    return recipes
}

// Get basic info (recipeName, user) of recipes by recipeName
export const getRecipesByRecipeName = async (recipeName) => {
    const [recipes] = await pool.query(`
    SELECT r.recipe_id, r.name, u.username, MIN(i.image_id) AS image_id, r.date
    FROM users u
    INNER JOIN recipes r ON u.user_id = r.user_id
    LEFT JOIN images i ON r.recipe_id = i.recipe_id
    WHERE r.name LIKE ?
    GROUP BY r.recipe_id
    ORDER BY r.recipe_id DESC`, ['%' + recipeName + '%'])

    return recipes
}

// Get basic info of recipes by recipeName
export const getRecipesByUserId = async (userId) => {
    const [recipes] = await pool.query(`
    SELECT r.recipe_id, r.name, u.username, MIN(i.image_id) AS image_id, r.date
    FROM users u
    INNER JOIN recipes r ON u.user_id = r.user_id
    LEFT JOIN images i ON r.recipe_id = i.recipe_id
    WHERE r.user_id = ?
    GROUP BY r.recipe_id
    ORDER BY r.recipe_id DESC`, [userId])

    return recipes
}

// Get info (name, description, username, price_range) of a single recipe by recipe_id
export const getRecipeInfo = async (recipeId) => {
    const [recipe] = await pool.query(`
    SELECT r.recipe_id, r.name, r.description, u.username, r.time_hours, r.time_minutes, r.price_range, r.date
    FROM users u
    INNER JOIN recipes r ON u.user_id = r.user_id
    WHERE r.recipe_id = ?`, [recipeId])

    // Throw an error if the query result is empty (recipeId does not exist in recipes table)
    if(!recipe.length) {
        throw new Error("Recipe does not exist")
    }

    return recipe
}

// INTERNAL FUNCTION - CHECKS IF RECIPE EXISTS
const recipeExists = async (recipeId) => {
    const [recipe] = await pool.query(`
    SELECT *
    FROM recipes r
    WHERE r.recipe_id = ?`, [recipeId])

    return recipe.length === 0
}

// Get images of a recipe by recipe_id
export const getRecipeImages = async (recipeId) => {
    if(!recipeExists(recipeId)) {
        throw new Error("Recipe does not exist")
    }

    const [images] = await pool.query(`
    SELECT image_id, name, path
    FROM images
    WHERE recipe_id = ?`, [recipeId])

    return images
}

// Get image of a recipe by recipe_id and image_id
export const getRecipeImage = async (imageId) => {
    const [imageInfo] = await pool.query(`
    SELECT image_id, name, path
    FROM images
    WHERE image_id = ?`, [imageId])

    if(!imageInfo.length) {
        throw new Error("Image does not exist")
    }

    return imageInfo
}

// Get categories of a recipe by recipe_id
export const getRecipeCategories = async (recipeId) => {
    // Throw an error if recipe does not exist
    if(!recipeExists(recipeId)) {
        throw new Error("Recipe does not exist")
    }

    const [categories] = await pool.query(`
    SELECT c.name
    FROM recipes r
    INNER JOIN recipe_categories rc on r.recipe_id = rc.recipe_id
    INNER JOIN categories c ON rc.category_id = c.category_id
    WHERE r.recipe_id = ?`, [recipeId])

    return categories
}

// Get ingredients of a recipe by recipe_id
export const getRecipeIngredients = async (recipeId) => {
    // Throw an error if recipe does not exist
    if(!recipeExists(recipeId)) {
        throw new Error("Recipe does not exist")
    }

    const [ingredients] = await pool.query(`
    SELECT i.description
    FROM ingredients i
    WHERE i.recipe_id = ?`, [recipeId])

    return ingredients
}

// Get steps of a recipe by recipe_id
export const getRecipeSteps = async (recipeId) => {
    // Throw an error if recipe does not exist
    if(!recipeExists(recipeId)) {
        throw new Error("Recipe does not exist")
    }

    const [steps] = await pool.query(`
    SELECT s.description
    FROM steps s
    WHERE s.recipe_id = ?`, [recipeId])

    return steps
}

// Get comments of a recipe by recipe_id
export const getRecipeComments = async (recipeId) => {
    // Throw an error if recipe does not exist
    if(!recipeExists(recipeId)) {
        throw new Error("Recipe does not exist")
    }

    const [comments] = await pool.query(`
    SELECT c.comment_id, u.user_id, u.username, c.comment, c.date
    FROM recipes r
    INNER JOIN comments c ON r.recipe_id = c.recipe_id
    INNER JOIN users u ON c.user_id = u.user_id
    WHERE c.recipe_id = ?`, [recipeId])

    return comments
}

// Get a single comment by comment_id
export const getComment = async (commentId) => {
    const [comment] = await pool.query(`
    SELECT *
    FROM comments c
    WHERE c.comment_id = ?`, [commentId])

    // Throw error if comment does not exist
    if(!comment.length) {
        throw new Error("Comment does not exist")
    }

    return comment
}

// Get all users
export const getAllUsers = async () => {
    const [users] = await pool.query(`
    SELECT *
    FROM users`)

    return users
}

// Get user information by user_id
export const getUser = async (userId) => {
    const [user] = await pool.query(`
    SELECT *
    FROM users u
    WHERE u.user_id = ?`, [userId])

    // Throw error if user does not exist
    if(!user.length) {
        throw new Error("User does not exist")
    }

    return user
}

// Get user by email
export const getUserByEmail = async (email) => {
    const [user] = await pool.query(`
    SELECT *
    FROM users u
    WHERE u.email = ?`, [email])

    return user
}

// Insert basic info of a recipe into recipes table
export const createRecipe = async (userId, name, description, time_h, time_m, price) => {
    const [newRecipe] = await pool.query(`
    INSERT INTO recipes (user_id, name, description, time_hours, time_minutes, price_range, date)
    VALUES (?, ?, ?, ?, ?, ?, now())`, [userId, name, description, time_h, time_m, price])

    // Throw an error if something goes wrong during insertion
    if(!newRecipe.insertId) {
        throw new Error("Recipe insertion failed!")
    }

    const id = newRecipe.insertId
    return getRecipeInfo(id)
}

// Insert an image of a recipe to images table
export const createRecipeImage = async (recipeId, imageName, imagePath) => {
    const [newImageInfo] = await pool.query(`
    INSERT INTO images (recipe_id, name, path)
    VALUES (?, ?, ?)`, [recipeId, imageName, imagePath])

    // Throw an error if something goes wrong during insertion
    if(!newImageInfo.insertId) {
        throw new Error("Image insertion failed!")
    }

    const id = newImageInfo.insertId
    return getRecipeImage(id)
}

// Insert categories of a recipe into recipe_categories table
export const createRecipeCategories = async (recipeId, categoryId) => {
    const [newRecipeCategory] = await pool.query(`
    INSERT INTO recipe_categories (recipe_id, category_id)
    VALUES (?, ?)`, [recipeId, categoryId])

    // Throw an error if something goes wrong during insertion
    if(!newRecipeCategory.insertId) {
        throw new Error("Recipe category insertion failed!")
    }

    const id = newRecipeCategory.insertId
    return getRecipeCategories(recipeId)
}

// Insert ingredients of a recipe into ingredients table
export const createRecipeIngredients = async (recipeId, description) => {
    const [newRecipeIngredient] = await pool.query(`
    INSERT INTO ingredients (recipe_id, description)
    VALUES (?, ?)`, [recipeId, description])

    // Throw an error if something goes wrong during insertion
    if(!newRecipeIngredient.insertId) {
        throw new Error("Recipe ingredient insertion failed!")
    }

    const id = newRecipeIngredient.insertId
    return getRecipeIngredients(id)
}

// Insert steps of a recipe into steps table
export const createRecipeSteps = async (recipeId, description) => {
    const [newRecipeStep] = await pool.query(`
    INSERT INTO steps (recipe_id, description)
    VALUES (?, ?)`, [recipeId, description])

    // Throw an error if something goes wrong during insertion
    if(!newRecipeStep.insertId) {
        throw new Error("Recipe step insertion failed!")
    }

    const id = newRecipeStep.insertId
    return getRecipeSteps(id)
}

// Insert a new comment into comments table
export const createComment = async (userId, recipeId, comment, rating) => {
    const [newComment] = await pool.query(`
    INSERT INTO comments (user_id, recipe_id, comment, date)
    VALUES (?, ?, ?, now())`, [userId, recipeId, comment, rating])

    // Throw an error if something goes wrong during insertion
    if(!newComment.insertId) {
        throw new Error("Comment insertion failed!")
    }

    const id = newComment.insertId
    return getComment(id)
}

// Insert a new user into users table
export const createUser = async (username, email, password) => {
    const [newUser] = await pool.query(`
    INSERT INTO users (username, email, password)
    VALUES (?, ?, ?)`, [username, email, password])

    // Throw an error if something goes wrong during insertion
    if(!newUser.insertId) {
        throw new Error("User insertion failed!")
    }

    const id = newUser.insertId
    return getUser(id)
}

// Update basic info of a recipe in recipes table
export const updateRecipeInfo = async (recipeId, name, description, time_h, time_m, price) => {
    const [result] = await pool.query(`
    UPDATE recipes
    SET
        name = ?,
        description = ?,
        time_hours = ?,
        time_minutes = ?,
        price_range = ?
    WHERE recipe_id = ?`, [name, description, time_h, time_m, price, recipeId])

    return getRecipeInfo(recipeId)
}

// Update comment information in comments table
export const updateComment = async (commentId, comment) => {
    const [result] = await pool.query(`
    UPDATE comments
    SET
        comment = ?
    WHERE comment_id = ?`, [comment, commentId])

    return getComment(commentId)
}

// Update user information in users table
export const updateUser = async (userId, email, username) => {
    const [result] = await pool.query(`
    UPDATE users
    SET
        email = ?,
        username = ?
    WHERE user_id = ?`, [email, username, userId])

    return getUser(userId)
}

// Delete a recipe from recipes table. Also deletes its associated images, categories, ingredients, steps, and comments
export const deleteRecipe = async (recipeId) => {
    // First, delete associated images from images table
    const [resultDelImages] = await pool.query(`
    DELETE FROM images
    WHERE recipe_id = ?`, [recipeId])
    
    // Then delete associated categories from recipe_categories table
    const [resultDelCategories] = await pool.query(`
    DELETE FROM recipe_categories
    WHERE recipe_id = ?`, [recipeId])

    // Then delete ingredients from ingredients table
    const [resultDelIngredients] = await pool.query(`
    DELETE FROM ingredients
    WHERE recipe_id = ?`, [recipeId])

    // Then delete steps from steps table
    const[resultDelSteps] = await pool.query(`
    DELETE FROM steps
    WHERE recipe_id = ?`, [recipeId])
    
    // Then delete comments from comments table
    const [resultDelComments] = await pool.query(`
    DELETE FROM comments
    WHERE recipe_id = ?`, [recipeId])

    // Finally, delete recipe from recipes table
    const [resultDelRecipe] = await pool.query(`
    DELETE FROM recipes
    WHERE recipe_id = ?`, [recipeId])
}

// Delete comment from comments table
export const deleteComment = async (commentId) => {
    const [result] = await pool.query(`
    DELETE FROM comments
    WHERE comment_id = ?`, [commentId])
}

// Delete a user from users table. Also deletes user's associated recipes and comments
export const deleteUser = async (userId) => {
    // First delete user's comments
    const [resultDelComments] = await pool.query(`
    DELETE FROM comments
    WHERE user_id = ?`, [userId])

    // Get a hold of the recipes the user has
    const [userRecipes] = await pool.query(`
    SELECT r.recipe_id
    FROM recipes r
    WHERE r.user_id = ?`, [userId])

    // Iterate over user's recipes and delete them
    for(let i = 0; i< userRecipes.length; i++) {
        const recipeId = userRecipes[i].recipe_id
        deleteRecipe(recipeId)
    }

    // Delete user
    const [resultDelUser] = await pool.query(`
    DELETE FROM users
    WHERE user_id = ?`, [userId])
}

// Delete all images of a recipe by recipeId
export const deleteRecipeImages = async (recipeId) => {
    const [result] = await pool.query(`
    DELETE FROM images
    WHERE recipe_id = ?`, [recipeId])
}

// Delete all categories of a recipe by recipeId
export const deleteRecipeCategories = async (recipeId) => {
    const [result] = await pool.query(`
    DELETE FROM recipe_categories
    WHERE recipe_id = ?`, [recipeId])
}

// Delete all ingredients of a recipe by recipeId
export const deleteRecipeIngredients = async (recipeId) => {
    const [result] = await pool.query(`
    DELETE FROM ingredients
    WHERE recipe_id = ?`, [recipeId])
}

// Delete all steps of a recipe by recipeId
export const deleteRecipeSteps = async (recipeId) => {
    const [result] = await pool.query(`
    DELETE FROM steps
    WHERE recipe_id = ?`, [recipeId])
}
