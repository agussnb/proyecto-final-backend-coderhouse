// import Swal from "sweetalert2";

// Escuchar el evento de cambio en el menú desplegable
document.getElementById("selectAction").addEventListener("change", function() {
    // Obtener el valor de la opción seleccionada
    const selectedValue = this.value;

    // Ocultar todos los formularios y encabezados de sección
    hideAllFormsAndHeaders();

    // Mostrar el formulario y encabezado correspondientes a la opción seleccionada
    const selectedForm = document.getElementById(selectedValue + "Form");
    selectedForm.removeAttribute("hidden");
    
    const selectedHeader = document.getElementById(selectedValue + "H3");
    selectedHeader.removeAttribute("hidden");
});

function hideAllFormsAndHeaders() {
    const forms = document.querySelectorAll("form");
    const headers = document.querySelectorAll("h3");
    
    forms.forEach(form => {
        form.setAttribute("hidden", "");
    });

    headers.forEach(header => {
        header.setAttribute("hidden", "");
    });
}


// --------------------------------- Fetch para la creacion del producto ---------------------------------
const createProductForm = document.getElementById('createProductForm');

createProductForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(createProductForm);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/products',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json)).then( Swal.fire({
        title:"Exito",
        text:"Producto creado con exito!",
        icon:"success",
        background: '#1a1a1a',
        allowOutsideClick: false, 
        color: '#11ECE0',
        confirmButtonColor:'#08A49C'
    }));
})



// --------------------------------- Fetch para la actualizacion del producto ---------------------------------

const updateProductForm = document.getElementById('updateProductForm');

updateProductForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(updateProductForm);
    console.log(data);
    const productId = data.get('productId')
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch(`/api/products/${productId}`,{
        method:'PUT',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json)).then( Swal.fire({
        title:"Exito",
        text:"Producto actualizado con exito!",
        icon:"success",
        background: '#1a1a1a',
        allowOutsideClick: false, 
        color: '#11ECE0',
        confirmButtonColor:'#08A49C'
    }));
})

// --------------------------------- Fetch para la eliminacion del producto ---------------------------------

const deleteProductForm = document.getElementById('deleteProductForm');

deleteProductForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(deleteProductForm);
    const productId = data.get('productId'); 

    fetch(`/api/products/${productId}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        Swal.fire({
            title:"Exito",
            text:"Producto eliminado con exito!",
            icon:"success",
            background: '#1a1a1a',
            allowOutsideClick: false, 
            color: '#11ECE0',
            confirmButtonColor:'#08A49C'
        });
    });
});


// --------------------------------- Fetch para la creacion del usuario ---------------------------------

const form = document.getElementById('createUserForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json)).then( Swal.fire({
        title:"Exito",
        text:"Usuario creado con exito!",
        icon:"success",
        background: '#1a1a1a',
        allowOutsideClick: false, 
        color: '#11ECE0',
        confirmButtonColor:'#08A49C'
    }));
})



// --------------------------------- Fetch para la actualizacion del usuario ---------------------------------

const updateUserForm = document.getElementById('updateUserForm');

updateUserForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(updateUserForm);
    const userId = data.get('userId')
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch(`/api/sessions/${userId}`,{
        method:'PUT',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>result.json()).then(json=>console.log(json)).then( Swal.fire({
        title:"Exito",
        text:"Usuario actualizado con exito!",
        icon:"success",
        background: '#1a1a1a',
        allowOutsideClick: false, 
        color: '#11ECE0',
        confirmButtonColor:'#08A49C'
    }));
})



// --------------------------------- Fetch para la eliminacion del usuario ---------------------------------

const deleteUserForm = document.getElementById('deleteUserForm');

deleteUserForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(deleteUserForm);
    const userId = data.get('userId'); 

    fetch(`/api/sessions/${userId}`, { 
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => result.json()).then(json => {
        console.log(json);
        Swal.fire({
            title:"Exito",
            text:"Usuario eliminado con exito!",
            icon:"success",
            background: '#1a1a1a',
            allowOutsideClick: false, 
            color: '#11ECE0',
            confirmButtonColor:'#08A49C'
        });
    });
});