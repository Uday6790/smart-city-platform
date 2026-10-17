package com.smartcity.controller;

import com.smartcity.model.Building;
import com.smartcity.repository.BuildingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buildings")
@CrossOrigin(origins = "http://localhost:5173")
public class BuildingController {

    private final BuildingRepository repository;

    public BuildingController(BuildingRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Building> getBuildings() {
        return repository.findAll();
    }
}