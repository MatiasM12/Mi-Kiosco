package com.kiosco;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan("com.kiosco.entities")
@EnableJpaRepositories("com.kiosco.repositories")
@SpringBootApplication
public class KioscoApplication {

	public static void main(String[] args) {
		SpringApplication.run(KioscoApplication.class, args);
	}

}
