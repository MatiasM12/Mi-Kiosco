$(document).ready(main);

var tarjetasDeProducto = document.querySelector(".producto");
var tarjetasDeProductosRelacionados = document.querySelector(".productos-relacionados");
var datosDeProducto = JSON.parse(localStorage.getItem("datosDeProducto"));

function main() {
    crearProducto();
    obtenerProductos('http://localhost:8080/getAllProducts');
    botonVerMasRelacionados();
}

function crearProducto() {
    let tarjeta = document.createElement("div");
    tarjeta.className = "producto";

    tarjeta.innerHTML = `
        <div class="imagen">
            <img src=/img/${datosDeProducto.imagen} alt="">
        </div>
        <div class="informacion">
            <h2 class="titulo">${datosDeProducto.titulo}</h2>
            <p>${datosDeProducto.descripcion}</p>
            <p class="precio">$${datosDeProducto.precio}</p>
            <p>en stock</p>
            <div class="boton-producto">
                <a class="boton-comprar" href="#" onclick="mostrarAviso()">Comprar</a>
            </div>
        </div>
    `;
    tarjetasDeProducto.append(tarjeta);
}

var listaDeRelacionados = [];

function obtenerProductos(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            let count = 0;
            for (let i = data.length - 1; i >= 0; i--) {
                if (count < 5 && datosDeProducto.categoria == data[i].category) {
                    const producto = data[i];
                    datosDeProducto = {
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
                    count++;
                    listaDeRelacionados.push(datosDeProducto);
                }
            }
            listaDeRelacionados.forEach(item => crearRelacionados(item, tarjetasDeProductosRelacionados));
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function crearRelacionados(lista, idDiv) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";

    tarjeta.innerHTML = `
        <div class="img-producto">
            <img src=/img/${lista.imagen} alt="" class="imagen-tarjeta">
        </div>
        <div class="info-producto">
            <h2 class="titulo-tarjeta">${lista.titulo}</h2>
            <h2 class="precio-tarjeta">$${lista.precio}</h2>
        </div>
        <div  class="boton-producto">
            <a class="boton-ver-mas"  >Ver mas</a>
        </div>
    `;
    idDiv.append(tarjeta);
}

async function botonVerMasRelacionados() {
    var datosDeProducto;
    var listaDeTarjetas = document.querySelector(".productos-relacionados");
    if (listaDeTarjetas != null) {
        listaDeTarjetas.addEventListener('click', async e => {
            if (e.target.classList.contains('boton-ver-mas')) {
                let producto = e.target.parentElement.parentElement;
                let titulo = producto.querySelector('.titulo-tarjeta').textContent;
                let id = "";
                for (let i = 0; i < listaDeRelacionados.length; i++) {
                    if (listaDeRelacionados[i].titulo == titulo) {
                        id = listaDeRelacionados[i].id;
                    }
                }
                try {
                    datosDeProducto = await obtenerDatos(id);
                    localStorage.setItem("datosDeProducto", JSON.stringify(datosDeProducto));
                    window.location.href = 'http://localhost:8080/producto';
                } catch (error) {
                    console.error('Error al obtener datos:', error);
                }
            }
        });
    }
}

async function obtenerDatos(id) {
    const url = 'http://localhost:8080/product/' + id;

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
