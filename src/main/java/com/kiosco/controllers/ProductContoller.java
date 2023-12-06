package com.kiosco.controllers;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.kiosco.entities.Product;
import com.kiosco.services.ProductService;



@RestController
public class ProductContoller {
	@Autowired
	private ProductService productRepo;
	Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
			  "cloud_name", "dbbuyidxq",
			  "api_key", "385424588965612",
			  "api_secret", "hCwmZ7DcGrUfhPuYgTeauLy2_4Y"));
	
	@GetMapping("/getAllProducts")
	public List<Product> getAll() {
		return productRepo.getAll();
	}
	
	@CrossOrigin(origins = "https://kiosco-production.up.railway.app", methods = {RequestMethod.POST}, allowedHeaders = {"Content-Type"})
	@PostMapping("/saveProduct")
	public ResponseEntity<String> saveProduct(@RequestBody Product product) {
	    try {
	        // Lógica para guardar el producto en la base de datos
	    	productRepo.save(product);

	        return new ResponseEntity<>("Producto guardado correctamente", HttpStatus.OK);
	    } catch (Exception e) {
	        // Manejo de excepciones
	        e.printStackTrace();
	        return new ResponseEntity<>("Error al guardar el producto: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    
    @GetMapping("/product/{id}")
    public Product getEmployeeById(@PathVariable("id") Long id) {
        return productRepo.getById(id);
    }

    @PutMapping("/product/{id}")
    public Product updateEmployee(@PathVariable("id") Long id, @RequestBody Product product) {
        return productRepo.updateProductById(id, product);
    }

    @DeleteMapping("/product/{id}")
    public void deleteEmployee(@PathVariable("id") Long id) {
        productRepo.deleteProductById(id);
    }
    
    @GetMapping("/categories")
    public List<String> getCategories() {
        return productRepo.getCategoties();
    }
    
    @GetMapping("/productByCategory/{category}")
    public List<Product> getProdcutByCategories(@PathVariable("category") String category) {
        return productRepo.getProductsByCategory(category);
    }
    
    @GetMapping("/productsByName/{name}")
    public List<Product> getProdcutsByName(@PathVariable("name") String name) {
        return productRepo.getProductByName(name);
    }
    
    @PostMapping("/guardarFoto")
    public ResponseEntity<String> handleFileUpload(@RequestParam("foto") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                // Subir el archivo a Cloudinary
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

                // Obtener la URL de la imagen subida
                String imageUrl = (String) uploadResult.get("secure_url");

                // Devolver la URL en la respuesta
                return new ResponseEntity<>(imageUrl, HttpStatus.OK);
            } catch (IOException e) {
                e.printStackTrace();
                // Devolver una respuesta de error
                return new ResponseEntity<>("Error al guardar el archivo: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            // Devolver una respuesta de error si no se proporcionó un archivo
            return new ResponseEntity<>("No se proporcionó un archivo", HttpStatus.BAD_REQUEST);
        }
    }

   
}
