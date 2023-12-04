package com.kiosco.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kiosco.entities.Product;
import com.kiosco.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductRepository productRepo;

	@Override
	public void save(Product product) {
		productRepo.save(product);
	}

	@Override
	public Product getById(Long id) {
		Optional<Product> prduct = productRepo.findById(id);
	    if (prduct.isPresent()) {
	        return prduct.get();
	    }
		return null;
	}

	@Override
	public List<Product> getAll() {
		return productRepo.findAll();
	}

	@Override
	public Product updateProductById(Long id,Product product) {
		 Optional<Product> product1 = productRepo.findById(id);

	        if (product1.isPresent()) {
	        	Product originalProduct = product1.get();

	            if (Objects.nonNull(product.getName()) && !"".equalsIgnoreCase(product.getName())) {
	            	originalProduct.setName(product.getName());
	            }
	            if (Objects.nonNull(product.getCategory()) && product.getCategory() != "") {
	            	originalProduct.setCategory(product.getCategory());
	            }
	            if (Objects.nonNull(product.getDescription()) && product.getDescription() != "") {
	            	originalProduct.setDescription(product.getDescription());
	            }
	            if (Objects.nonNull(product.getPrice()) && product.getPrice() != 0) {
	            	originalProduct.setPrice(product.getPrice());
	            }
	            if (Objects.nonNull(product.getTotal()) && product.getTotal() != 0) {
	            	originalProduct.setTotal(product.getTotal());
	            }
	            if (Objects.nonNull(product.getStock()) && product.getStock() != false) {
	            	originalProduct.setStock(product.getStock());
	            }
	            if (Objects.nonNull(product.getFav()) && product.getFav() != false) {
	            	originalProduct.setFav(product.getFav());
	            }
	            if (Objects.nonNull(product.getImage()) && product.getImage() != "") {
	            	originalProduct.setImage(product.getImage());
	            }
	            return productRepo.save(originalProduct);
	        }
	     return null;
		
	}

	@Override
	public void deleteProductById(Long id) {
		productRepo.deleteById(id);
	}

	@Override
	public List<String> getCategoties() {
		return productRepo.getAllCategoties();
	}
	
    public List<Product> getProductsByCategory(String category) {
        return productRepo.findByCategory(category);
    }
    
    public List<Product> getProductByName(String name) {
        return productRepo.findProductByName(name);
    }

}
