const goToHome = ()=>{
    window.location.href = "/"
}

const goToCart = ()=>{
    const cartData = document.querySelector('.carrito')
    const cartId = cartData.getAttribute('data-cartId')
    window.location.href = `/api/carts/${cartId}`;
}
