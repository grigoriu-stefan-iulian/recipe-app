let myRecipes = getSavedRecipes()

const filters = {
    searchText: '',
}

renderRecipes(myRecipes, filters)

$('#add-recipe').on('click', (e) => {
    const id = uuidv4()
    myRecipes.push({
        id,
        title: '',
        instructions: '',
        status: '',
        ingredients: []
    })
    saveRecipes(myRecipes)
    /*Next we set an unique link for each Recipe. We use this id to get 
    the recipe we need in the edit.html page by finding 
    the recipe who has the same id as the id in the URL.
    */
    location.assign(`/edit.html#${id}`)


    // Setting the recipe count text in the home page
})



if (myRecipes.length === 0) {
    $('.recipe--count').html('no')
} else {
    $('.recipe--count').html(myRecipes.length)
}

if (myRecipes.length > 1 || myRecipes.length === 0) {
    $('.recipes-plural').html('s')
}

document.querySelector('#search-content').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(myRecipes, filters)
})