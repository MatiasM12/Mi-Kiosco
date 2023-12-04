$(document).ready(main);
let id =localStorage.getItem("id");

function main() {
}

function enviarDatos(event) {
	event.preventDefault();
	uploadFile();
	// Obtener los valores del formulario
	var nombre = document.getElementById('nombre').value;
	var cantidad = document.getElementById('cantidad').value;
	var precio = document.getElementById('precio').value;
	var categoria = document.getElementById('categoria').value;
	var descripcion = document.getElementById('descripcion').value;
	var destacado = document.getElementById('destacado').checked;
	var foto ;
	if(document.getElementById('foto') != null)
		foto = document.getElementById('foto').files[0].name;

	// Crear un objeto con los datos
	var datosProducto = {
		name: nombre,
		price: parseFloat(precio), // Convertir a número flotante si es necesario
		category: categoria,
		description: descripcion,
		total: parseInt(cantidad), // Convertir a número entero si es necesario
		stock: true,
		fav: destacado,
		image: foto
	};
	
	// Enviar la solicitud Put
	var url = 'http://localhost:8080/product/'+id; // Reemplaza con la URL de tu API y el ID del producto correspondient
	fetch(url, {
	    method: 'PUT',
	    headers: {
	        'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(datosProducto)
	})
	.then(response => {
	    if (!response.ok) {
	        throw new Error('Error en la solicitud PUT');
	    }
	    console.log('Solicitud PUT exitosa');
	    mostrarMensajeExito("Editado Correctamente")
	})
	.catch(error => {
	    console.error('Error:', error);
	});
	
	
}

function uploadFile() {
	var inputFile = document.getElementById('foto');
	
	
	if(inputFile != null){
		var file = inputFile.files[0];
		
		var formData = new FormData();
		formData.append('foto', file);
	
		$.ajax({
			url: '/guardarFoto',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				console.log(data);
				alert('La imagen se subio correctamente, por favor llene los datos restantes');
			},
			error: function(error) {
				console.error(error);
				alert('Error al subir el archivo');
			}
	});
	}
	
}

function mostrarMensajeExito(mensaje) {
    const contenedorDifuminado = document.createElement("div");
    contenedorDifuminado.className = "contenedor-difuminado";

    const cartel = document.createElement("div");
    cartel.className = "mensaje-exito";
    cartel.textContent = mensaje;

    contenedorDifuminado.appendChild(cartel);

    document.body.appendChild(contenedorDifuminado);

	setTimeout(() => {
        contenedorDifuminado.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(contenedorDifuminado);
        }, 500);
    }, 1000); 
}


