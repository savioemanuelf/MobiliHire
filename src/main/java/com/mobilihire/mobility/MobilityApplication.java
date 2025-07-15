package com.mobilihire.mobility;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = { "com.mobilihire.mobility", "com.smarthirepro" })
@EntityScan(basePackages = { "com.mobilihire.mobility.domain.model", "com.smarthirepro.domain.model" })

public class MobilityApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobilityApplication.class, args);
	}

}
