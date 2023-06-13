import express from 'express'
import routerCategories from './routes/categories.js'
import routerRecipes from './routes/recipes.js'
import routerUsers from './routes/users.js'
import routerAuth from './routes/auth.js'
import cors from 'cors'
import checkJwt from './middleware/tokenAuth.js'

const PORT = process.env.PORT || 8000

const app = express();
app.use(cors())

app.use(express.json())

app.use('/categories', checkJwt, routerCategories)
app.use('/recipes',  checkJwt, routerRecipes)
app.use('/users',  checkJwt, routerUsers)
app.use('/auth', routerAuth)


app.listen(PORT, () => {
  console.log('Example app listening on port 8000!');
});

app.use((err, req, res, next) => { 
    console.log(err.stack)
    res.status(500).send("Something Broke!")
})

