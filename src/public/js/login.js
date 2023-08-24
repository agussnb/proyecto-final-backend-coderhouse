const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data)
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            console.log(obj)
            Swal.fire({
                title:"Sesion iniciada con exito!",
                text:`Bienvenido!`,
                icon:"success",
                background: '#1a1a1a',
                allowOutsideClick: false, 
                color: '#11ECE0',
                confirmButtonColor:'#08A49C'
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.replace('/');
                }
            })
            
        }
        if(result.status ===401){
            Swal.fire({
                title: 'Error al iniciar sesion!',
                text: 'Credenciales incorrectas',
                icon: 'error',
                background: '#1a1a1a',
                allowOutsideClick: false, 
                color: '#11ECE0',
                confirmButtonColor:'#08A49C'
            })
        }
    })
})