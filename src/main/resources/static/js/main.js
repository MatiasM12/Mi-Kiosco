$(document).ready(main);

var tarjetasDeProductosNuevosLanzamientos = document.getElementById("nuevos-lanzamientos");
var tarjetasDeProductosCategorias = document.getElementById("contenedor-categorias");
var tarjetasDeProductosDestacados = document.querySelector(".carousel");

var listaDeNuevosLanzamientos = [];
var listaDeDestacados = [];
var listaDeCategorias = [
    { imagen: "/img/refresco.png", titulo: "Bebidas" },
    { imagen: "img/golosinas.png", titulo: "Golosinas" },
    { imagen: "/img/pancho.png", titulo: "Comida" },
    { imagen: "/img/helado.png", titulo: "Helado" },
    { imagen: "/img/productos.png", titulo: "Snacks" }
];

function main() {
    obtenerNuevosLanzamiento('https://kiosco-production.up.railway.app/getAllProducts');
    obtenerDestacados('https://kiosco-production.up.railway.app/getAllProducts');
    listaDeCategorias.forEach(item => crearCategorias(item, tarjetasDeProductosCategorias));
    botonVerMas();
}

function obtenerNuevosLanzamiento(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (let i = data.length - 1; i >= 0; i--) {
                if (data.length - i <= 5) {
                    const producto = data[i];
                    datosDeProducto = {
                        id: producto.idProduct,
                        titulo: producto.name,
                        categoria: producto.category,
                        precio: producto.price,
                        descripcion: producto.description,
                        cantidad: producto.total,
                        stock: producto.stock,
                        destacado: producto.fav,
                        imagen: producto.image
                    };
                    listaDeNuevosLanzamientos.push(datosDeProducto);
                }
            }
            listaDeNuevosLanzamientos.forEach(item => crearTarjeta(item, tarjetasDeProductosNuevosLanzamientos));
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function obtenerDestacados(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].fav == true) {
                    const producto = data[i];
                    datosDeProducto = {
                        id: producto.idProduct,
                        titulo: producto.name,
                        categoria: producto.category,
                        precio: producto.price,
                        descripcion: producto.description,
                        cantidad: producto.total,
                        stock: producto.stock,
                        destacado: producto.fav,
                        imagen: producto.image
                    };
                    listaDeDestacados.push(datosDeProducto);
                }
            }
            listaDeDestacados.forEach(item => crearDestacado(item, tarjetasDeProductosDestacados));
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function crearDestacado(lista, idDeDiv) {
    let carusel = document.createElement("div");
    carusel.className = lista == listaDeDestacados[0] ? "carousel-item active" : "carousel-item";
    carusel.innerHTML = `
        <div class="tarjeta">
            <div class="card-body1">
                <h5 class="card-title titulo">${lista.titulo}</h5>
                <p class="card-text">${lista.descripcion}</p>
                <a class="boton-ver">Ir al producto</a>
            </div>
            <img class="card-img-top" src=/img/${lista.imagen}>
        </div>
    `;
    idDeDiv.append(carusel);
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

function crearTarjeta(lista, idDiv) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
        <div class="img-producto">
            <img src=/img/${lista.imagen} class="imagen-tarjeta" alt="">
        </div>
        <div class="info-producto">
            <h2 class="titulo-tarjeta">${lista.titulo}</h2>
            <h2 class="precio-tarjeta">$${lista.precio}</h2>
        </div>
        <div class="boton-producto">
            <a class="boton-ver">Ver mas</a>
        </div>
    `;
    idDiv.append(tarjeta);
}

function crearCategorias(lista, idDiv) {
    let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-producto";
    tarjeta.innerHTML = `
        <div class="img-producto">
            <img src=${lista.imagen} alt="" style="height: 200px; padding-bottom:20px">
        </div>
        <div class="info-producto">
            <h2 class="titulo-tarjeta" style="padding-bottom:20px;">${lista.titulo}</h2>
        </div>
        <div class="boton-producto">
            <a class="boton-ver">Ver mas</a>
        </div>
    `;
    idDiv.append(tarjeta);
}

async function botonVerMas() {
    try {
        await manejarClickEnListaDeTarjetas("nuevos-lanzamientos", listaDeNuevosLanzamientos, '.titulo-tarjeta');
    } catch (error) {
        console.error('Error en botonVerMas:', error);
    }

    try {
        await manejarClickEnListaDeTarjetas("carousel", listaDeDestacados, '.titulo');
    } catch (error) {
        console.error('Error en botonVerMas:', error);
    }

    try {
        var listaDeTarjetas = document.getElementById("contenedor-categorias");
        if (listaDeTarjetas != null) {
            listaDeTarjetas.addEventListener('click', e => {
                if (e.target.classList.contains("boton-ver")) {
                    let producto = e.target.parentElement.parentElement;
                    let titulo = producto.querySelector('.titulo-tarjeta').textContent;
                    let categoria =  titulo;
                    localStorage.setItem("categoria", JSON.stringify(categoria));
                    window.location.href = 'https://kiosco-production.up.railway.app/categoria';
                }
            });
        }
    } catch (error) {
        console.error('Error en botonVerMas:', error);
    }
}

async function manejarClickEnListaDeTarjetas(listaId, listaDeProductos, selectorTitulo) {
    var datosDeProducto;
    var listaDeTarjetas = document.getElementById(listaId) || document.querySelector("."+listaId);
    if (listaDeTarjetas != null) {
        listaDeTarjetas.addEventListener('click', async (e) => {
            if (e.target.classList.contains("boton-ver")) {
                let producto = e.target.parentElement.parentElement;
                let titulo = producto.querySelector(selectorTitulo).textContent;
                let id = "";

                for (let i = 0; i < listaDeProductos.length; i++) {
                    if (listaDeProductos[i].titulo == titulo) {
                        id = listaDeProductos[i].id;
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
}

