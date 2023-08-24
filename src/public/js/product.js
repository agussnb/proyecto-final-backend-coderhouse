function agregarAlCarrito() {
  const productDiv = document.querySelector('.productDiv');
  const productId = productDiv.getAttribute('data-product-id');
  const productPrice = productDiv.getAttribute('data-product-price');
  const productTitle = productDiv.getAttribute('data-product-title');
  const productThumbnail = productDiv.getAttribute('data-product-thumbnail');
  const productSelectUnit = document.querySelector("#unidades")
  const productUnit = productSelectUnit.value
  const inputElement = document.querySelector('input[data-cartId]');
  const cartId = inputElement.getAttribute('data-cartId');
  
  // Construir objeto de producto
  const productData = {
    quantity: productUnit
  };

 // Realizar petición POST para agregar producto al carrito
 fetch(`/api/carts/${cartId}/product/${productId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(productData)
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Hubo un problema al agregar el producto al carrito.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Producto agregado al carrito:', data);
    // Mostrar la alerta de SweetAlert para éxito
    Swal.fire({
      title: 'Producto agregado',
      text: 'El producto ha sido agregado correctamente al carrito.',
      icon: 'success',
      background: '#1a1a1a',
      allowOutsideClick: false,
      color: '#11ECE0',
      confirmButtonColor: '#08A49C'
    }).then(() => {
      // Refrescar la página
      location.reload();
    });
  })
  .catch(error => {
    console.error('Error:', error);
    // Mostrar la alerta de SweetAlert para errores
    if (error.message === 'Hubo un problema al agregar el producto al carrito.') {
      Swal.fire({
        title: 'Error al agregar el producto al carrito',
        text: 'No es posible agregar al carrito, una cantidad mayor al stock disponible.',
        icon: 'error',
        background: '#1a1a1a',
        allowOutsideClick: false,
        color: '#11ECE0',
        confirmButtonColor: '#08A49C'
      }).then(() => {
        // Refrescar la página
        location.reload();
      });
    } 
  });
}
