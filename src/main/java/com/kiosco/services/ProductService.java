package com.kiosco.services;

import java.util.List;

import com.kiosco.entities.Product;

public interface ProductService {

	public void save(Product product);
	
	public Product getById(Long id);
	
	public List<Product> getAll();
	
	public Product updateProductById(Long id,Product product);
	
	public void deleteProductById(Long id);
	
	public List<String> getCategoties();
	
	public List<Product> getProductsByCategory(String category);
	
	public List<Product> getProductByName(String name);
}
