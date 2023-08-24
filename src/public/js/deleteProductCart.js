// Obtener el botón
const deleteButton = document.querySelector('.delete-button');

// Agregar un evento click al botón
deleteButton.addEventListener('click', async () => {
  const cartId = deleteButton.dataset.cartId;
  const productId = deleteButton.dataset.productId;

  try {
    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Si la respuesta es exitosa, mostrar una alerta de éxito
      Swal.fire({
        title: 'Producto eliminado correctamente',
        text: '',
        icon: 'success',
        background: '#1a1a1a',
        allowOutsideClick: false,
        color: '#11ECE0',
        confirmButtonColor: '#08A49C',
        didClose: () => {
          // Recargar la página después de cerrar la alerta
          location.reload();
        }
      });
    } else {
      // Si la respuesta no es exitosa, mostrar una alerta de error
      Swal.fire({
        title: 'Error al eliminar el producto',
        text: '',
        icon: 'error',
        background: '#1a1a1a',
        allowOutsideClick: false,
        color: '#11ECE0',
        confirmButtonColor: '#08A49C'
      });
    }

    const data = await response.json();
    console.log(data); // Manejar la respuesta
  } catch (error) {
    console.error(error);
  }
});

function removeProducts() {
  const eraseButton = document.querySelector('.eraseFromCart');
  const cartId = eraseButton.dataset.cartId

  fetch(`/api/carts/${cartId}/products`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema al eliminar los productos del carrito.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Productos eliminados del carrito:', data);
      // Mostrar la alerta de SweetAlert para éxito
      Swal.fire({
        title: 'Productos eliminados',
        text: 'Los productos han sido eliminados correctamente del carrito.',
        icon: 'success',
        background: '#1a1a1a',
        allowOutsideClick: false,
        color: '#11ECE0',
        confirmButtonColor: '#08A49C'
      }).then(() => {
        // Enviar al usuario a la pagina principal
        window.location.href = '/'
      });
    })
    .catch(error => {
      console.error('Error:', error);
      // Mostrar la alerta de SweetAlert para errores
      Swal.fire({
        title: 'Error al eliminar los productos del carrito',
        text: error.message,
        icon: 'error',
        background: '#1a1a1a',
        allowOutsideClick: false,
        color: '#11ECE0',
        confirmButtonColor: '#08A49C'
      });
    });
}
// Agregar un event listener al botón para capturar el click
const eraseButton = document.querySelector('.eraseFromCart');
eraseButton.addEventListener('click', removeProducts);



