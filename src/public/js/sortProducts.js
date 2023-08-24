document.addEventListener('DOMContentLoaded', () => {
    const categorySelector = document.querySelector('.selectProducts');
    const productsContainer = document.getElementById('products-container');

    categorySelector.addEventListener('change', async (event) => {
        const selectedCategory = event.target.value;

        try {
            const response = await fetch(`/sort-by-category`);
            const sortedProducts = await response.json();

            // Genera el HTML para todos los productos o los productos filtrados
            const productsHTML = sortedProducts.map(category => {
                if (selectedCategory === "" || category._id === selectedCategory) {
                    return category.products.map(product => `
                        <div class="col-sm-4">
                            <div class="card ">
                                <h4 class="card-title text-white">${product.title}</h4>
                                <img class="card-img-top" src="/images/${product.thumbnail}" alt="${product.title}">
                                <div class="card-body">
                                    <p class="card-text precio">USD$${product.price}</p>
                                    <a class="btn verDetalle text-white" href="/api/products/${product._id}">Ver detalle</a>
                                </div>
                            </div>
                        </div>
                    `).join('');
                } else {
                    return ''; // No se muestra nada si no coincide la categoría
                }
            }).join('');

            // Actualiza el contenido de los productos en el contenedor
            productsContainer.innerHTML = productsHTML;
        } catch (error) {
            console.error(error);
        }
    });
});
