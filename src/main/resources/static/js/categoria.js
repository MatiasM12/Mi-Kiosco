$(document).ready(main);

var divProductos = document.querySelector('.productos');
var categoria = JSON.parse(localStorage.getItem("categoria"));
const miDiv = document.getElementById('titulo-categoria');
const miH1 = miDiv.querySelector('h1');

var productos = [];

function main() {
	miH1.textContent = categoria;
    obtenerProductos("https://kiosco-production.up.railway.app/productByCategory/"+categoria.toLowerCase());
    botonVerMas();
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
			console.log(data)
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
        <div class="img-producto">
            <img src=${lista.imagen} alt="" class="imagen-tarjeta">
        </div>
        <div class="info-producto">
            <h2 class="titulo-tarjeta">${lista.titulo}</h2>
            <h2 class="precio-tarjeta">$${lista.precio}</h2>
        </div>
        <div class="boton-producto">
            <a class="boton-ver"  >Ver mas</a>
        </div>`;
    idDiv.append(tarjeta);
}

async function botonVerMas() {
    try {
        var datosDeProducto;
        var listaDeTarjetas = document.querySelector(".productos");

        if (listaDeTarjetas != null) {
            listaDeTarjetas.addEventListener('click', async e => {
                if (e.target.classList.contains("boton-ver")) {
                    let producto = e.target.parentElement.parentElement;
                    let titulo = producto.querySelector('.titulo-tarjeta').textContent;
                    let id = "";
                    for (let i = 0; i < productos.length; i++) {
                        if (productos[i].titulo == titulo) {
                            id = productos[i].id;
                        }
                    }

                    try {
                        datosDeProducto = await obtenerDatos(id);
                        localStorage.setItem("datosDeProducto", JSON.stringify(datosDeProducto));
                        window.location.href = 'https://kiosco-production.up.railway.app/producto';
                    } catch (error) {
                        console.error('Error al obtener datos:', error);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error en botonVerMas:', error);
    }
}

async function obtenerDatos(id) {
    const url = 'https://kiosco-production.up.railway.app/product/' + id;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();
    return {
        id: data.idProduct,
        titulo: data.name,
        categoria: data.category,
        precio: data.price,
        descripcion: data.description,
        cantidad: data.total,
        stock: data.stock,
        destacado: data.fav,
        imagen: data.image
    };
}
