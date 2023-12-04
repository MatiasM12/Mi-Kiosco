$(document).ready(main);

var divProductos = document.querySelector('.cuadricula-productos');
var productos = [];

function main() {
    obtenerProductos('https://kiosco-production.up.railway.app/getAllProducts');
}

function obtenerProductos(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const producto = data[i];
                const datosDeProducto = {
                    id: producto.idProduct,
                    titulo: producto.name,
                    categoria: producto.category,
                    precio: producto.price,
                    descripcion: producto.description,
                    cantidad: producto.total,
                    stock: producto.stock,
                    imagen: producto.image,
                    fav: producto.fav
                };
                productos.push(datosDeProducto);
            }
            if (productos.length <= 0) {
                let tarjeta = document.createElement("div");
                tarjeta.innerHTML = `<h1 >No Hay</h1>`;
                divProductos.append(tarjeta);
            } else {
                productos.forEach(item => listarProductos(item, divProductos));
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function listarProductos(lista, idDiv) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
              <img src=/img/${lista.imagen} >
            <div class="detalles-producto">
                <h3>${lista.titulo}</h3>
                <p>${lista.descripcion}.</p>
                <span class="precio">$${lista.precio}</span>
                <div class="botones-tarjeta">
                    <a onclick="botonEditar('${lista.titulo}')" class="boton-editar">Editar</a>
                </div>
            </div>`;
    idDiv.append(tarjeta);
}

function botonEditar(titulo){
	               let id = "";

                for (let i = 0; i < productos.length; i++) {
                    if (productos[i].titulo == titulo) {
                        id = productos[i].id;
                    }
                }	
	localStorage.setItem("id",id);
    window.location.href = 'https://kiosco-production.up.railway.app/editar';
}
