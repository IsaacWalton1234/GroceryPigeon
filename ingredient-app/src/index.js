const form = document.getElementById('ingredient-form');
const input = document.getElementById('ingredient-input');
const resultsSection = document.getElementById('results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const ingredient = input.value.trim();
    if (ingredient) {
        try {
            const result = await fetchIngredients(ingredient);
            displayResults(result);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            resultsSection.innerHTML = '<p>Error fetching results. Please try again.</p>';
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

function displayResults(result) {
    resultsSection.innerHTML = '';
    if (result && result.name) {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <h3>${result.name}</h3>
            <p><strong>Price:</strong> £${result.price}</p>
            <p><strong>Store:</strong> ${result.store}</p>
            <a href="${result.url}" target="_blank">View Product</a>
        `;
        resultsSection.appendChild(resultItem);
    } else {
        resultsSection.innerHTML = '<p>No results found.</p>';
    }
}