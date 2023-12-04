
function buscar() {
  // Obtener el valor de la barra de búsqueda
  var valorBusqueda = document.getElementById('barraBusqueda').value;

  // Almacenar el valor en el almacenamiento local
  localStorage.setItem('ultimaBusqueda', valorBusqueda);

  // Redirigir a otra página (puedes cambiar 'otraPagina.html' por la página que desees)
  window.location.href = 'https://kiosco-production.up.railway.app/busqueda';
}

// Escuchar el evento 'keydown' para la tecla Enter en el campo de búsqueda
document.getElementById('barraBusqueda').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    buscar();
  }
});
