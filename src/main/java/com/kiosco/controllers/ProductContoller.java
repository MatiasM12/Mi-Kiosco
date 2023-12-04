package com.kiosco.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kiosco.entities.Product;
import com.kiosco.services.ProductService;

@RestController
public class ProductContoller {
	@Autowired
	private ProductService productRepo;
	
	@GetMapping("/getAllProducts")
	public List<Product> getAll() {
		return productRepo.getAll();
	}
	
    @PostMapping("/saveProduct")
    public void saveEmployee(@RequestBody Product product) {
        productRepo.save(product);
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
                // Obtener el nombre original del archivo
                String fileName = file.getOriginalFilename();

                // Construir la ruta donde se guardará la foto (directorio template/img/)
                Path dir = Paths.get("static/img");
                String absoluteRoute = dir.toFile().getAbsolutePath();
                Path route = Paths.get(absoluteRoute + "//" + fileName);

                // Guardar el archivo
                byte[] bytesImg = file.getBytes();
                Files.write(route, bytesImg);

                // Devolver una respuesta exitosa
                return new ResponseEntity<>("Archivo guardado correctamente", HttpStatus.OK);
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
