const form = document.getElementById('ingredient-form');
const input = document.getElementById('ingredient-input');
const resultsSection = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const ingredient = input.value.trim();
    if (ingredient) {
        try {
            const results = await fetchIngredients(ingredient);
            displayResults(results);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            resultsSection.innerHTML = '<p>Error fetching results. Please try again.</p>';
        }
    }
});

async function fetchIngredients(ingredient) {
    const response = await fetch(`https://www.trolley.co.uk/search/?from=search&q=${ingredient}&order=price`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function displayResults(results) {
    resultsSection.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.textContent = result.name; // Adjust based on actual API response structure
            resultsSection.appendChild(resultItem);
        });
    } else {
        resultsSection.innerHTML = '<p>No results found.</p>';
    }
}