import { addNewRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } from './Controllers/recipeController.mjs';
import { addNewComment, getComments} from './Controllers/commentController.mjs';



const routes = app => {

    app.route('/comment')

    // GET endpoint
        .get(getComments)

    // POST endpoint
        .post(addNewComment);



    app.route('/recipes')
    // GET endpoint
        .get(getRecipes)


    // POST endpoint
        .post(addNewRecipe)




    app.route('/recipes/:RecipeId')
    // GET specific recipe
        .get(getRecipeById)

    // UPDATE endpoint/ recipe
        .put(updateRecipe)

        .delete(deleteRecipe);
}

export default routes;