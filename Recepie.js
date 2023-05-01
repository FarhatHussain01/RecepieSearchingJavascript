(async function () {

    const response = await fetch("./recipes.json")
    const recipes = await response.json();

    const inputElem = document.getElementById("searchInput")
    const btnElem = document.getElementById("searchBtn")
    const listElem = document.getElementById("recipe-list")
    const recepieDetails = document.getElementById("recipeDetailsContainer");

    function showRecepieDetails(recipe) {
        recepieDetails.innerHTML = `
        <h2>${recipe.title}</h2>
        <h2>Description</h2>
        <div>${recipe.description}</div>
        <h2>Ingredients</h2>
        <ul>${recipe.ingredients.map(function(ingredient) {
            return "<li>" + ingredient + "</li>"  // it returns each ingrediant one by one 
        }).join("")}</ul>  
     `
    //  join method is used here to join the array of list items into a single string with 
    // no separator so that it can be properly rendered as an unordered list.
    }



    function showSearchResults(results) {

        listElem.innerHTML = ""; // if we put this inside foreach then on each iteration previouse item were rempoved first
        results.forEach(recipe => {
            const li = document.createElement("li");
            const listItem = `
    <h2 class="title"> ${recipe.title}</h2>
    <div class="description">${recipe.description}</div>
`
            li.innerHTML = listItem;

            li.addEventListener("click", function () {
                showRecepieDetails(recipe)
            })

            listElem.appendChild(li);
        })
    }


    function search() {
        const input = inputElem.value.toLowerCase();

        const results = recipes.filter(function (recipe) {
            if (recipe.title.toLowerCase().includes(input) ||
                recipe.ingredients.join("").toLowerCase().includes(input)) {
                return true;
            } else {
                return false;
            }
        })
        showSearchResults(results);
    }

    btnElem.addEventListener("click", search)

})();