document.addEventListener("DOMContentLoaded", () => {
    let result = document.getElementById('results');
    let searchBtn = document.getElementById('search-btn');
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    let searchRecipe = () => {    
        let userInp = document.getElementById("search-inp").value;    
        if (userInp.length == 0){
            result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
        } else {
            fetch(url + userInp)
            .then ((response) => response.json())
            .then ((data) => {
                let myMeal = data.meals[0];
                console.log(myMeal);
                console.log(myMeal.strMealThumb);
                console.log(myMeal.strMeal);
                console.log(myMeal.strArea);
                console.log(myMeal.strCategory);
                console.log(myMeal.strInstructions);
            
                let count = 1;
                let ingredients = [];
                for (let i in myMeal) {
                    let ingredient = "";
                    let measure = "";
                    if(i.startsWith('strIngredient') && myMeal[i]){
                        ingredient = myMeal[i];
                        measure = myMeal[`strMeasure` + count];
                        count += 1;
                        ingredients.push(`${measure} ${ingredient }`);
                    };
                }
                console.log(ingredients);
            
                result.innerHTML = `
                <img src=${myMeal.strMealThumb}>
                <div class="details">
                    <h2>${myMeal.strMeal}</h2>
                    <h2 style="font-weight: 400;">${myMeal.strArea}</h2>
                </div>
                <div id="ingredientsContainer">
                </div>
                <div id="recipe">
                    <button id="hide-recipe">X</button>
                    <pre id="insructions">${myMeal.strInstructions}</pre>
                </div>
                <button id="show-recipe">View Recipe</button>
                `;
            
                let ingredient = document.getElementById("ingredientsContainer");
                let parent = document.createElement("ul");
                let recipe = document.getElementById("recipe");
                let hideRecipe = document.getElementById("hide-recipe");
                let showRecipe = document.getElementById("show-recipe");
            
                ingredients.forEach((i) => {
                    let child = document.createElement("li");
                    child.innerText = i;
                    parent.appendChild(child);
                    ingredient.appendChild(parent);
                });
            
                hideRecipe.addEventListener("click", () => {
                    recipe.style.display = "none";
                });
            
                showRecipe.addEventListener("click", () => {
                    recipe.style.display = "block";
                });
            })
            .catch(() => {
                result.innerHTML = `<h3>Invalid Input</h3>`;
            })
        }      
    }

    const userInp = document.getElementById("search-inp");

    userInp.addEventListener("keyup", (e) => {
        if(e.keyCode === 13){
           searchRecipe() ;
        }
    });
    
    searchBtn.addEventListener("click", searchRecipe)

})