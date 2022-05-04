import { addNewRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } from './Controllers/recipeController.mjs';
import { addNewComment, getComments} from './Controllers/commentController.mjs';



const routes = app => {

    app.route('/api/comment')

    // GET endpoint
        .get(getComments)

    // POST endpoint
        .post(addNewComment);



    app.route('/api/recipes')
    // GET endpoint
        .get(getRecipes)


    // POST endpoint
        .post(addNewRecipe)




    app.route('/api/recipes/:RecipeId')
    // GET specific recipe
        .get(getRecipeById)

    // UPDATE endpoint/ recipe
        .put(updateRecipe)

        .delete(deleteRecipe);
}

export default routes;