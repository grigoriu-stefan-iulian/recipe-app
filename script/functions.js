'use strict'
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

// Save the Recipes
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Remove Recipe
const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    } else {
        console.log('Unable to do')
    }
}

// Toggle ingredient availability
const toggleIngredient = (id) => {
    const ingredient = recipe.ingredients.find((ingredient) => ingredient.ingredientId === id)

    if (ingredient) {
        ingredient.available = !ingredient.available
    }
}

const generateRecipeDOM = (recipeArray) => {
    const recipeLinkArea = $('<a></a>')
    const recipeContainer = $('<div></div>')
    const recipeTitle = $('<h3></h3>')
    const recipeStatus = $('<p></p>')

    recipeTitle.html(recipeArray.title)
    recipeStatus.html(recipeArray.status)

    recipeTitle.addClass('container__recipe--title')
    recipeTitle.addClass('container__recipe--status')
    recipeContainer.addClass('container__recipe')
    recipeLinkArea.attr('href', `/edit.html#${recipeArray.id}`)

    recipeContainer.append(recipeTitle)
    recipeContainer.append(recipeStatus)
    recipeLinkArea.append(recipeContainer)
    return recipeLinkArea
}

const renderRecipes = () => {
    const myRecipesEl = $('#myRecipes')
    myRecipesEl.html('')
    if (myRecipes.length > 0) {
        myRecipes.forEach((recipe) => {
            const recipes = generateRecipeDOM(recipe)
            myRecipesEl.append(recipes)
        })
    } else {
        return
    }
}

const generateIngredientDOM = (ingredient) => {
    const ingredientEl = $('<div></div>')
    const checkbox = $('<input>')
    checkbox.attr('type', 'checkbox')
    checkbox.addClass('container__recipe--checkbox')
    checkbox.prop('checked', ingredient.available);
    ingredientEl.append(checkbox)

    checkbox.on('change', (e) => {
        toggleIngredient(ingredient.ingredientId)
        getRecipeStatus(recipe)
        saveRecipes(recipes)
    })

    const ingredientName = $('<span></span>')
    ingredientName.html(ingredient.name)

    const removeButton = $('<button></button>')
    removeButton.html('Remove')
    removeButton.addClass('remove-ingredient')
    removeButton.attr('id', ingredient.ingredientId)

    // // Remove ingredient and render ingredients after
    removeButton.on('click', function (e) {
        removeIngredient(ingredient.ingredientId)
        getRecipeStatus(recipe)
        saveRecipes(recipes)
        renderIngredients(recipe.ingredients)
    })

    ingredientEl.append(ingredientName)
    ingredientEl.append(removeButton)
    ingredientEl.append('<br>')
    return ingredientEl
}

const renderIngredients = (ingredientsToRender) => {
    const myIngredients = $('.myIngredients')
    myIngredients.html('')
    ingredientsToRender.forEach((ingredient) => {
        myIngredients.append(generateIngredientDOM(ingredient))
    })
}

// Add ingredient
const addIngredient = (ingredientArry) => {
    const ingredientFromInput = $('#ingredient-to-add').val()
    const ingredientId = uuidv4()
    ingredientArry.push({
        ingredientId,
        name: ingredientFromInput,
        available: false
    })
}

//Remove ingredient
const removeIngredient = (id) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.ingredientId === id)
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1)
    } else {
        console.log('Unable to do')
    }
}

const getRecipeStatus = (recipe) => {
    const availableIngredients = recipe.ingredients.filter(ingredient => ingredient.available === true
    )
    console.log(availableIngredients)
    if (availableIngredients.length === 0) {
        return recipe.status = 'You do not have any of the ingredients'
    } else if (availableIngredients.length < recipe.ingredients.length) {
        return recipe.status = 'You have some of the ingredients'
    } else {
        return recipe.status = 'You have all the ingredients'
    }
}