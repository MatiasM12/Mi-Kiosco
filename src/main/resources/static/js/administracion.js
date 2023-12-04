$(document).ready(main);

function main() {
	obtenerProductos('https://kiosco-production.up.railway.app/getAllProducts')


}

function enviarDatos() {
	uploadFile();
	// Obtener los valores del formulario
	var nombre = document.getElementById('nombre').value;
	var cantidad = document.getElementById('cantidad').value;
	var precio = document.getElementById('precio').value;
	var categoria = document.getElementById('categoria').value;
	var descripcion = document.getElementById('descripcion').value;
	var destacado = document.getElementById('destacado').checked;
	var foto = document.getElementById('foto').files[0].name;

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
	
	// Enviar la solicitud POST
	fetch('https://kiosco-production.up.railway.app/saveProduct', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(datosProducto),
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error('Error:', error));
}

function uploadFile() {
	var inputFile = document.getElementById('foto');
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


function agregarProductoALista(producto) {
	// Obtén la lista y el contenedor
	var lista = document.getElementById('lista-productos');
	var listaContainer = document.getElementById('lista-productos-container');

	// Crea un nuevo elemento de lista (li) con los detalles del producto
	var nuevoProducto = document.createElement('li');
	var productoId = `producto-${producto.id}`;
	nuevoProducto.id = productoId; // Asigna un ID único

	nuevoProducto.innerHTML = `
        <div class="producto-item" id="producto-${producto.id}">
        <img src="/img/${producto.image}" alt="Imagen del producto" class="producto-imagen">
	    <div class="producto-detalles">
	        <strong>${producto.name}</strong><br>
	        Precio: ${producto.price}<br>
	        Cantidad: ${producto.total}<br>
	        Categoría: ${producto.category}<br>
	        Descripción: ${producto.description}<br>
	    </div>
	     <button class="boton-borrar" onclick="eliminarProducto('${productoId}', ${producto.id})">Eliminar</button>
		</div>
	`;

	// Agrega el nuevo producto a la lista
	lista.appendChild(nuevoProducto);

	// Si la lista estaba vacía, muestra el contenedor
	if (lista.children.length === 1) {
		listaContainer.style.display = 'block';
	}
}

function eliminarProducto(productoId, id) {
	// Realiza la llamada a la API para eliminar el producto por su id
	console.log(id);
	fetch(`https://kiosco-production.up.railway.app/product/${id}`, {
		method: 'DELETE',
	})
		.then(data => {
			console.log(data);
			// Elimina la tarjeta del producto de la interfaz
			var tarjetaProducto = document.getElementById(productoId);
			tarjetaProducto.remove();
		})
		.catch(error => console.error('Error:', error));
}

var productos = []


function obtenerProductos(url) {
	// Realizar la llamada a la API utilizando fetch
	fetch(url)
		.then(response => {
			// Verificar si la respuesta es exitosa (código de estado 200)
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			// Convertir la respuesta a formato JSON
			return response.json();
		})
		.then(data => {
			// Vaciar el array antes de agregar nuevos productos
			productos = [];

			// Manipular los datos obtenidos de la API
			for (let i = 0; i < data.length; i++) {
				const producto = data[i];
				datosDeProducto = {
					id: producto.idProduct,
					name: producto.name,
					category: producto.category,
					price: producto.price,
					description: producto.description,
					total: producto.total,
					stock: producto.stock,
					image: producto.image,
					fav: producto.fav
				}
				// Aquí puedes acceder a las propiedades del producto
				productos.push(datosDeProducto);
				console.log(productos);
			}
			// Llamar a agregarProductoALista después de vaciar el array
			productos.forEach(item => agregarProductoALista(item));
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
}

 