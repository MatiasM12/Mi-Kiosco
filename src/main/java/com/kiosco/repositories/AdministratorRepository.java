package com.kiosco.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kiosco.entities.Administrator;

@Repository
public interface AdministratorRepository extends JpaRepository<Administrator, Long>{

}
