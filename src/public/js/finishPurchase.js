const button = document.getElementById('finishPurchase');
const cartId = button.getAttribute('data-cartId');
button.addEventListener('click', async () => {
    const res = await fetch(`http://localhost:8080/api/payments/create-checkout-session?cartId=${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const data = await res.json();
    window.location.href = data.url;
})

