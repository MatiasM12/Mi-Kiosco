package com.kiosco.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kiosco.entities.Administrator;
import com.kiosco.services.AdministratorService;

@RestController
public class AdministratorController {

	@Autowired
	private AdministratorService adminService;
	
	@GetMapping("/getAll")
	public List<Administrator> getAll() {
		return adminService.getAll();
	}
	
    @PostMapping("/save")
    public void saveEmployee(@RequestBody Administrator admin) {
        adminService.save(admin);
    }
    
    @GetMapping("/admin/{id}")
    public Administrator getEmployeeById(@PathVariable("id") Long id) {
        return adminService.getById(id);
    }

    @PutMapping("/admin/{id}")
    public Administrator updateEmployee(@PathVariable("id") Long id, @RequestBody Administrator admin) {
        return adminService.updateById(id, admin);
    }

    @DeleteMapping("/admin/{id}")
    public void deleteEmployee(@PathVariable("id") Long id) {
        adminService.deleteById(id);
    }
}