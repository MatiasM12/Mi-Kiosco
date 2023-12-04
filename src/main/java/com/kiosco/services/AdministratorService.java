package com.kiosco.services;

import java.util.List;

import com.kiosco.entities.Administrator;

public interface AdministratorService {

	public void save(Administrator admin);
	
	public List<Administrator> getAll();
	
	public Administrator getById(Long id);
	
	public Administrator updateById(Long id, Administrator administrator);

    public void deleteById(Long id);
}
