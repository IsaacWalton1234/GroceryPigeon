const form = document.getElementById('ingredient-form');
const input = document.getElementById('ingredient-input');
const table = document.getElementById('table');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const ingredient = input.value.trim();
    if (ingredient) {
        try {
            const result = await fetchIngredients(ingredient);
            addResultsToTable(result);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            table.innerHTML += '<p>Error fetching results. Please try again.</p>';
        }
    }
});

async function fetchIngredients(ingredient) {
    const response = await fetch(`http://localhost:3001/api/search?q=${ingredient}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function addResultsToTable(result) {
    if (result && result.name) {
        const ingredientRow = document.createElement('section');
        ingredientRow.className = 'ingredient_row';
        
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredients';
        ingredientDiv.textContent = result.name;
        
        const priceDiv = document.createElement('div');
        priceDiv.className = 'price';
        priceDiv.textContent = `£${result.price}`;
        
        const shopDiv = document.createElement('div');
        shopDiv.className = 'shop';
        shopDiv.textContent = result.store;
        
        ingredientRow.appendChild(ingredientDiv);
        ingredientRow.appendChild(priceDiv);
        ingredientRow.appendChild(shopDiv);
        
        table.appendChild(ingredientRow);
        input.value = '';
    }
}