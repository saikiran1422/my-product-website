// Global variable to store products
let products = [];

// Fetch the product data from products.json
fetch('products.json')
    .then(response => response.json())  // Parse the JSON data
    .then(data => {
        products = data;  // Store the products in a global variable
        displayProducts(products);  // Initially display all products
    })
    .catch(error => console.error('Error loading product data:', error));

// Function to display products in the grid
function displayProducts(productsToDisplay) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';  // Clear the existing products

    // Loop through each product in the provided array and create HTML for each product
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        
        // Insert the product HTML content
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <a href="${product.amazon_link}" class="buy-btn" target="_blank">Buy Now</a>
        `;
        
        // Append the product div to the product grid
        productGrid.appendChild(productDiv);
    });
}

// Function to filter products based on search query and show suggestions
function filterProducts(query) {
    const suggestionsBox = document.getElementById('suggestions');
    const filteredProducts = products.filter(product => {
        // Convert both the product name and description to lowercase and check if the query matches
        return product.name.toLowerCase().includes(query.toLowerCase()) || 
               product.description.toLowerCase().includes(query.toLowerCase());
    });

    // Only show suggestions if there are matching products
    if (query.trim() !== '' && filteredProducts.length > 0) {
        suggestionsBox.style.display = 'block';
        suggestionsBox.innerHTML = '';  // Clear previous suggestions

        // Show top 5 suggestions
        const topSuggestions = filteredProducts.slice(0, 5);
        topSuggestions.forEach(product => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = product.name;
            suggestionItem.onclick = () => {
                document.getElementById('search-bar').value = product.name;  // Update the search bar with the selected product name
                displayProducts([product]);  // Display the selected product
                suggestionsBox.style.display = 'none';  // Hide suggestions dropdown
            };
            suggestionsBox.appendChild(suggestionItem);
        });
    } else {
        suggestionsBox.style.display = 'none';  // Hide suggestions if no matches
        displayProducts(filteredProducts);  // Display the filtered products
    }
}

// Event listener for search input to trigger filtering
const searchInput = document.getElementById('search-bar');
searchInput.addEventListener('input', (event) => {
    const query = event.target.value;  // Get the search query
    filterProducts(query);  // Filter products based on the query
});

// Hide suggestions when clicking outside of the search bar or suggestions box
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !document.getElementById('suggestions').contains(event.target)) {
        document.getElementById('suggestions').style.display = 'none'; // Hide suggestions when clicking outside
    }
});
