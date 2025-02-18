

getRecipeDetails();

getComment();

async function getRecipeDetails(params) {
    const param = new URLSearchParams(window.location.search);
    const id = param.get('id')
    // console.log(id);


    try {
        const data = await fetch(`https://dummyjson.com/recipes/${id}`)
        const jsonData = await data.json();
        // console.log(jsonData);
        showRecipe(jsonData)



    } catch (error) {
        console.error(error, 'fetching single recipes error')
    }
}


function showRecipe(data) {

    document.getElementsByClassName('recipes-section')[0].innerHTML = '';

    const container = document.createElement('div');
    container.classList.add('container');

    const heading = document.createElement('h3');
    heading.classList.add('recipe-name');
    heading.textContent = data.name;

    const image = document.createElement('img');
    image.src = data.image;
    image.alt = 'Classic Margherita Pizza';
    image.classList.add('recipe-img');

    container.appendChild(heading);
    container.appendChild(image);

    // document.body.appendChild(container);
    //    🚀🚀🚀🚀🚀🚀🚀🚀🚀

    const ingredientsSection = document.createElement('div');
    ingredientsSection.classList.add('container', 'ingredients');
    ingredientsSection.id = 'ingredients-section';

    const row = document.createElement('div');
    row.classList.add('row');

    const colIngredients = document.createElement('div');
    colIngredients.classList.add('col-md-4', 'col-sm-5');


    let ingredientTitle = document.createElement('h5')
    ingredientTitle.innerText = 'ingredients'

    let ingredientList = document.createElement('ul')
    data.ingredients.forEach(element => {
        let list = document.createElement('li')
        list.innerText = element
        ingredientList.appendChild(list)
    });

    colIngredients.appendChild(ingredientTitle)
    colIngredients.appendChild(ingredientList)
    // row.appendChild(colIngredients)

    const colInstructions = document.createElement('div');
    colInstructions.classList.add('col-md-8', 'col-sm-7', 'instructions');
    let instructionsTitle = document.createElement('h4')
    instructionsTitle.innerText = 'instructions'
    colInstructions.appendChild(instructionsTitle)

    // creating the steps section
    data.instructions.forEach((element, index) => {
        let stepsContainer = document.createElement('div');
        stepsContainer.classList.add('step-container')

        let stepCount = document.createElement('p');
        stepCount.classList.add('step')
        stepCount.innerText = `step ${index + 1}`

        stepsContainer.appendChild(stepCount);

        let stepDetails = document.createElement('p');
        stepDetails.classList.add('steps-details')
        stepDetails.innerText = element;

        stepsContainer.appendChild(stepDetails);


        colInstructions.appendChild(stepsContainer)

    })


    row.appendChild(colIngredients);
    row.appendChild(colInstructions);
    ingredientsSection.appendChild(row);



    document.getElementsByClassName('recipes-section')[0].appendChild(container)

    document.getElementsByClassName('recipes-section')[0].appendChild(ingredientsSection)
}


// getting comment 🚀🚀🚀🚀🚀🚀🚀🚀🚀

async function getComment(params) {
    const param = new URLSearchParams(window.location.search);
    const id = param.get('id')
    // console.log(id);


    try {
        const data = await fetch(`https://dummyjson.com/comments/post/${id}`)
        const jsonData = await data.json();
        console.log(jsonData.comments);
        // showRecipe(jsonData)
        showComments(jsonData.comments)



    } catch (error) {
        console.error(error, 'fetching single recipes error')
    }
}


function showComments(data) {

    let row = document.getElementById('comment-row');

    data.forEach((element) => {

        let commentDiv = document.createElement('div')
        commentDiv.classList.add('comment', 'd-flex')

        let img = document.createElement('img')
        img.classList.add('rounded-circle')
        img.src = 'https://dummyjson.com/icon/lincolnk/128'


        let innerDiv = document.createElement('div')

        let heading = document.createElement('h5')
        heading.innerText = element.user.fullName

        let para = document.createElement('p')
        para.innerText = element.body

        //like and dislike div
        let likeDislikeDiv = document.createElement('div')
        likeDislikeDiv.classList.add('like-dislike-container')

        let likeSpan = document.createElement('span');
        likeSpan.classList.add('like');
        let likeIcon = document.createElement('i');
        likeIcon.classList.add('bi', 'bi-hand-thumbs-up');

        // Append icon and like count properly
        likeSpan.appendChild(likeIcon);
        likeSpan.append(` ${element.likes}`);

        let DislikeSpan = document.createElement('span');
        DislikeSpan.classList.add('like');
        let DislikeIcon = document.createElement('i');
        DislikeIcon.classList.add('bi', 'bi-hand-thumbs-down');
        DislikeSpan.append(DislikeIcon)

    
        likeDislikeDiv.append(likeSpan, DislikeSpan)


        innerDiv.append(heading, para, likeDislikeDiv);

        commentDiv.append(img, innerDiv)

        row.append(commentDiv)


    })
}