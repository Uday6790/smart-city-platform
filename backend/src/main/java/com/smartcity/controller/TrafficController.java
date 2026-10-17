package com.smartcity.controller;

import com.smartcity.model.TrafficData;
import com.smartcity.repository.TrafficDataRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic")
@CrossOrigin(origins = "http://localhost:5173")
public class TrafficController {

    private final TrafficDataRepository repository;

    public TrafficController(TrafficDataRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TrafficData> getTraffic() {
        return repository.findAll();
    }
}