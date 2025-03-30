async function fetchRecipe() {
    const dish = document.getElementById("dish").value;
    const servings = document.getElementById("servings").value;
    if (!dish || !servings) {
        alert("Please enter both the dish name and the number of servings.");
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`);
        const data = await response.json();

        if (data.meals) {
            displayRecipe(data.meals[0], servings);
        } else {
            alert("Recipe not found. Please try another dish.");
        }
    } catch (error) {
        alert("Error fetching recipe. Please try again later.");
    }
}

function displayRecipe(meal, servings) {
    document.getElementById("recipe-title").innerText = `${meal.strMeal} Recipe for ${servings} servings`;

    let ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        if (meal["strIngredient" + i]) {
            ingredientsList.push(`${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}`);
        }
    }
    document.getElementById("ingredients").innerText = ingredientsList.join(", ");

    let stepsList = document.getElementById("steps");
    stepsList.innerHTML = "";
    meal.strInstructions.split(". ").forEach(step => {
        if (step) {
            let li = document.createElement("li");
            li.innerText = step;
            stepsList.appendChild(li);
        }
    });

    // Change Background to Dish Image
    document.body.style.background = `url('${meal.strMealThumb}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";

    // Hide main page and show recipe page with overlay
    document.getElementById("main-container").style.display = "none";
    document.getElementById("recipe-container").style.display = "block";
    document.getElementById("bgVideo").style.display = "none"; // Hide background video
    document.getElementById("overlay").style.display = "block"; // Show dark overlay
}

function goBack() {
document.getElementById("recipe-container").style.display = "none";
document.getElementById("main-container").style.display = "flex"; // Ensure it's displayed properly
document.getElementById("bgVideo").style.display = "block"; // Show the background video again
document.getElementById("overlay").style.display = "none"; // Hide the overlay

// Reset background to default black
document.body.style.background = "black";

// Clear input fields
document.getElementById("dish").value = "";
document.getElementById("servings").value = "";
}
