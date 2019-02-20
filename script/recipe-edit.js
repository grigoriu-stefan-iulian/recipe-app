const recipes = getSavedRecipes()

const titleEl = $('#recipe-title')
const instructionsEl = $('#recipe-instructions')
const recipeId = location.hash.substring(1)
const recipe = recipes.find((recipe) => recipe.id === recipeId)

titleEl.val(recipe.title)
instructionsEl.val(recipe.instructions)

// Change location to index if no recipe
if (!recipe) {
    location.assign('index.html')
}

// Save the edited title
titleEl.on('input', (e) => {
    recipe.title = e.target.value
    saveRecipes(recipes)
})

// Save the edited Instructions
instructionsEl.on('input', (e) => {
    recipe.instructions = e.target.value
    saveRecipes(recipes)
})

// Render and add ingredients
renderIngredients(recipe.ingredients)

$('#add-ingredient').on('click', (e) => {
    addIngredient(recipe.ingredients)
   saveRecipes(recipes)
    renderIngredients(recipe.ingredients)
    $('#ingredient-to-add').val('')
})

// Remove ingredient and render ingredients after
// $('.remove-ingredient').on('click', function (e) {
//     renderIngredients(recipe.ingredients)
// })

//Delete Recipes
$('#delete-recipe').on('click', () => {
    removeRecipe(recipe.id)
    saveRecipes(recipes)
    location.assign('index.html')
})

// set Ingredients status
getRecipeStatus(recipe)
