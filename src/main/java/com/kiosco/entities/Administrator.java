package com.kiosco.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Administrator {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idAdmin;
	private String name;
	private String username;
	private String password;
	
	public Long getIdAdmin() {
		return idAdmin;
	}
	
	public void setIdAdmin(Long idAdmin) {
		this.idAdmin = idAdmin;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getUser() {
		return username;
	}
	
	public void setUser(String user) {
		this.username = user;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}

}
