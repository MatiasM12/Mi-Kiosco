package com.kiosco.services;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kiosco.entities.Administrator;
import com.kiosco.repositories.AdministratorRepository;

@Service
public class AdministratorServiceImpl implements AdministratorService{

	
	@Autowired
	private AdministratorRepository adminRepo;
	
	@Override
	public void save(Administrator admin) {
		adminRepo.save(admin);
	}

	@Override
	public List<Administrator> getAll() {
		return adminRepo.findAll();
	}

	@Override
	public Administrator getById(Long id) {
		Optional<Administrator> admin = adminRepo.findById(id);
	    if (admin.isPresent()) {
	        return admin.get();
	    }
		return null;
	}

	@Override
	public Administrator updateById(Long id, Administrator admin) {
        Optional<Administrator> admin1 = adminRepo.findById(id);

        if (admin1.isPresent()) {
        	Administrator originalAdmin = admin1.get();

            if (Objects.nonNull(admin.getName()) && !"".equalsIgnoreCase(admin.getName())) {
            	originalAdmin.setName(admin.getName());
            }
            if (Objects.nonNull(admin.getUser()) && admin.getUser() != "") {
            	originalAdmin.setUser(admin.getUser());
            }
            if (Objects.nonNull(admin.getPassword()) && admin.getPassword() != "") {
            	originalAdmin.setPassword(admin.getPassword());
            }
            return adminRepo.save(originalAdmin);
        }
        return null;
    }
	

	@Override
	public void deleteById(Long id) {
		adminRepo.deleteById(id);
	}

}
