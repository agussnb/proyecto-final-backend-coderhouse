const logout = () => {
    const button = document.querySelector('.logout');

    button.addEventListener('click', () => {
        fetch('api/sessions/logout')
            .then(response => {
                if (response.ok) {
                    // Mostrar alerta
                    Swal.fire({
                        title: 'Sesión cerrada!',
                        text: 'La sesión ha sido cerrada correctamente',
                        icon: 'success',
                        background: '#1a1a1a',
                        allowOutsideClick: false, // Evita que el usuario cierre la alerta haciendo clic fuera de ella
                        color: '#11ECE0',
                        confirmButtonColor:'#08A49C'
                    }).then(() => {
                        // Redirigir a la página de inicio o de login después de que el usuario haga clic en el botón "OK" de la alerta
                        window.location.href = '/api/users/login';
                    });
                } else {
                    throw new Error('Error al cerrar sesión');
                }
            })
            .catch(error => console.log(error));
    });
};
const login = ()=>{
    window.location.href = "/api/users/login"
}