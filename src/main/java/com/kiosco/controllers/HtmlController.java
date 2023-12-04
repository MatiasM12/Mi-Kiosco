package com.kiosco.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class HtmlController {

	@GetMapping("/")
	public ModelAndView mostrarInicio() {
	    ModelAndView modelAndView = new ModelAndView("index.html");
	    return modelAndView;
	}
	
	@GetMapping("/lista-productos")
	public ModelAndView mostrarProductos() {
	    ModelAndView modelAndView = new ModelAndView("lista-productos.html");
	    return modelAndView;
	}
	
	@GetMapping("/producto")
	public ModelAndView mostrarProducto() {
	    ModelAndView modelAndView = new ModelAndView("producto.html");
	    return modelAndView;
	}
	
	@GetMapping("/almacen")
	public ModelAndView mostrarAdministracion() {
	    ModelAndView modelAndView = new ModelAndView("administracion.html");
	    return modelAndView;
	}
	
	@GetMapping("/editar")
	public ModelAndView mostrarEdicion() {
	    ModelAndView modelAndView = new ModelAndView("editar.html");
	    return modelAndView;
	}
	
	@GetMapping("/categoria")
	public ModelAndView mostrarCategoria() {
	    ModelAndView modelAndView = new ModelAndView("categoria.html");
	    return modelAndView;
	}
	
	@GetMapping("/busqueda")
	public ModelAndView mostrarBuscador() {
	    ModelAndView modelAndView = new ModelAndView("busqueda.html");
	    return modelAndView;
	}
	
	@GetMapping("/control")
	public ModelAndView mostrarControl() {
	    ModelAndView modelAndView = new ModelAndView("control.html");
	    return modelAndView;
	}
	
	@GetMapping("/lista-eliminar")
	public ModelAndView mostrarListaEliminar() {
	    ModelAndView modelAndView = new ModelAndView("lista-eliminar.html");
	    return modelAndView;
	}
	
	@GetMapping("/lista-editar")
	public ModelAndView mostrarListaEditar() {
	    ModelAndView modelAndView = new ModelAndView("lista-editar.html");
	    return modelAndView;
	}
	
	@GetMapping("/lista-produc-admin")
	public ModelAndView mostrarListaProductosAdmin() {
	    ModelAndView modelAndView = new ModelAndView("lista-productos-admin.html");
	    return modelAndView;
	}
}
