let myRecipes = getSavedRecipes()
renderRecipes(myRecipes)

$('#add-recipe').on('click', (e) => {
    const id = uuidv4()
    myRecipes.push({
        id,
        title: 'New Recipe',
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
})

$('.recipe--count').html(myRecipes.length)

if (myRecipes.length > 1) {
    $('.recipes-plural').html('s')
}

const filters = {
    searchText: ''
}

const filteredRecipes = () => myRecipes.filter(recipe => recipe.title.includes(filters.searchText))
$('#search-content').on('input', () => {
    filters.searchText = $('#search-content').val()
    console.log(filters.searchText)
    $('#myRecipes').html('')
  //  filteredRecipes()
    renderRecipes(filteredRecipes())
})


