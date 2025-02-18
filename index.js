
//create isFavorite name localStorage array
if (!localStorage.getItem("Favorite")) {
    let Favorite = [];
    localStorage.setItem("Favorite", JSON.stringify(Favorite));
}

if (!localStorage.getItem("AllRecipes")) {
    let AllRecipes = [];
    localStorage.setItem("AllRecipes", JSON.stringify(AllRecipes));
}


// // create dark mode 
if (!localStorage.getItem("darkMode")) {
    let darkMode = false;
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
}



// global flag
 let isSearching = false;

async function getAllRecipes(params) {

    try {
        const data = await fetch('https://dummyjson.com/recipes')
        const jsonData = await data.json();
        // console.log(jsonData.recipes);
        showRecipe(jsonData.recipes)
        localStorage.setItem("AllRecipes", JSON.stringify(jsonData.recipes));


    } catch (error) {
        console.error(error, 'fetching all recipes error')
    }
}

const storedRecipes = JSON.parse(localStorage.getItem('AllRecipes')) || [];

if (storedRecipes.length > 0) {

    showRecipe(JSON.parse(localStorage.getItem('AllRecipes')))
}
else {
    getAllRecipes();
}



window.addEventListener('scroll', () => {
    if (!isSearching && window.innerHeight + window.scrollY >= document.body.scrollHeight-10) {

        showRecipe(JSON.parse(localStorage.getItem('AllRecipes')))

    }
})


function showRecipe(data) {
    let menuList = document.getElementById('menu-list');

    data.forEach(element => {

        let favorites = JSON.parse(localStorage.getItem("Favorite")) || [];
        let isFavorite = favorites.some((item) => item.id === element.id);

        let parentDiv = document.createElement('div')
        parentDiv.classList.add('col-md-3', 'col-sm-4', 'position-relative')
        parentDiv.id = element.id;


        // Creating favorite button
        let favButton = document.createElement("button");
        favButton.classList.add("fav-btn");
        favButton.innerHTML = "🖤";

        if (isFavorite) {
            favButton.classList.add("active");
            favButton.innerHTML = "❤️";

        }



        favButton.addEventListener('click', (event) => {
            event.stopPropagation();

            let favorite = JSON.parse(window.localStorage.getItem('Favorite')) || [];
            let index = favorite.findIndex((item) => item.id === element.id);

            if (index === -1) {
                // Add to favorites
                favorite.push({ id: element.id, favoriteBool: true });
                location.reload();

            } else {
                // Remove from favorites
                favorite.splice(index, 1);
                location.reload()

            }

            window.localStorage.setItem('Favorite', JSON.stringify(favorite))
        })



        let innerdiv = document.createElement('div')
        innerdiv.classList.add('recipe')

        let anchorTag = document.createElement('a')
        anchorTag.classList.add('recipe-link')
        anchorTag.href = `cardPage.html?id=${element.id}`


        let img = document.createElement('img')
        img.src = element.image;
        img.classList.add('recipe-img')


        let h4 = document.createElement('h4')
        h4.innerText = element.name;


        let paraRating = document.createElement('p')
        paraRating.classList.add('rating')

        let starIcon = document.createElement('i')
        starIcon.classList.add('bi', 'bi-star-fill')
        // paraRating.innerText = element.rating;

        let cookingTime = document.createElement('span')
        cookingTime.innerText = element.cookTimeMinutes + 'mins'
        paraRating.appendChild(starIcon)
        paraRating.append(`${element.rating}` + '  ')
        paraRating.appendChild(cookingTime)


        let ingredientPara = document.createElement('p')
        ingredientPara.classList.add('ingredients')
        ingredientPara.innerText = element.ingredients.toString().substring(0, 30) + '...';

        // appending  into anchor tag

        anchorTag.append(img, h4, paraRating, ingredientPara)

        // appending the element

        //    menuList.append(parentDiv,innerdiv,)

        innerdiv.appendChild(anchorTag)
        parentDiv.append(innerdiv, favButton)
        menuList.appendChild(parentDiv)


    });
}


// search functionality 
async function getRecipesByQuery(params) {

    let searchText = document.getElementById('searchText');
    let Text = searchText.value;
    searchText.value='';
    // console.log(Text);

    if (!searchText) {
        // If search box is empty, reset search state and load all recipes
        isSearching = false;
        showRecipe(JSON.parse(localStorage.getItem('AllRecipes')));
        return;
    }


    try {

        isSearching = true;
        const data = await fetch(`https://dummyjson.com/recipes/search?q=${Text}`)
        const jsonData = await data.json();

        let menuList = document.getElementById('menu-list');
        menuList.innerHTML = '';
        showRecipe(jsonData.recipes)

        if(jsonData.recipes.length<=0){
            menuList.innerHTML = 'Does not find any recipe';
        }


    } catch (error) {
        console.error(error, 'fetching  recipes by query error')
    }
}

let searchBtn = document.getElementById('search-btn')
searchBtn.addEventListener('click', getRecipesByQuery);



// get all comments 

async function getAllComments(params) {


    try {

        isSearching = true;
        const data = await fetch("https://dummyjson.com/comments?limit=0")
        const jsonData = await data.json();

         let commentsList = [];
         localStorage.setItem('commentsList',JSON.stringify(commentsList))


    } catch (error) {
        console.error(error, 'fetching  all comment error error')
    }
}


