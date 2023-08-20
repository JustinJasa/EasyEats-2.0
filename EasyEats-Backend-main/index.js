import express from 'express'
import routerCategories from './routes/categories.js'
import routerRecipes from './routes/recipes.js'
import routerUsers from './routes/users.js'
import routerAuth from './routes/auth.js'
import cors from 'cors'
import checkJwt from './middleware/tokenAuth.js'
import checkAuthorization from './middleware/checkAuth'

const PORT = process.env.PORT || 8000

const app = express();
app.use(cors())

app.use(express.json())

app.use('/categories', checkJwt, checkAuthorization, routerCategories)
app.use('/recipes',  checkJwt, checkAuthorization, routerRecipes)
app.use('/users',  checkJwt, checkAuthorization, routerUsers)
app.use('/auth', routerAuth)


app.listen(PORT, () => {
  console.log('Example app listening on port 8000!');
});

app.use((err, req, res, next) => { 
    console.log(err.stack)
    res.status(500).send("Something Broke!")
})

