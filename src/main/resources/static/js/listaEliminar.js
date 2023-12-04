$(document).ready(main);

var divProductos = document.querySelector('.cuadricula-productos');
var productos = [];

function main() {
    obtenerProductos('https://kiosco-production.up.railway.app/getAllProducts');
    botonEliminar();
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
                <h3 class="titulo-tarjeta">${lista.titulo}</h3>
                <p>${lista.descripcion}</p>
                <span class="precio">$${lista.precio}</span>
                <div class="botones-tarjeta">
                    <a href="#" class="boton-eliminar">Eliminar</a>
                </div>
            </div>`;
    idDiv.append(tarjeta);
}

async function botonEliminar() {
    try {
        var listaDeTarjetas = document.querySelector(".cuadricula-productos");

        if (listaDeTarjetas != null) {
            listaDeTarjetas.addEventListener('click', async e => {
                if (e.target.classList.contains("boton-eliminar")) {
                    let producto = e.target.parentElement.parentElement;
                    let titulo = producto.querySelector('.titulo-tarjeta').textContent;
                    let id = "";
                    for (let i = 0; i < productos.length; i++) {
                        if (productos[i].titulo == titulo) {
                            id = productos[i].id;
                        }
                    }

                    try {
                        datosDeProducto = await eliminarData("https://kiosco-production.up.railway.app/product/"+id);
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

async function eliminarData(url) {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud DELETE');
        }
        console.log('Solicitud DELETE exitosa');
        setTimeout(() => {
            location.reload();
        }, 500);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}