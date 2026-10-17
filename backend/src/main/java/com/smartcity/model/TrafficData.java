package com.smartcity.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "traffic_data")
public class TrafficData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roadName;
    private Integer vehicleCount;
    private Double averageSpeed;
    private String congestionLevel;

    private Double xPosition;
    private Double zPosition;

    private LocalDateTime timestamp;

    public TrafficData() {
    }

    public TrafficData(
            String roadName,
            Integer vehicleCount,
            Double averageSpeed,
            String congestionLevel,
            Double xPosition,
            Double zPosition,
            LocalDateTime timestamp) {

        this.roadName = roadName;
        this.vehicleCount = vehicleCount;
        this.averageSpeed = averageSpeed;
        this.congestionLevel = congestionLevel;
        this.xPosition = xPosition;
        this.zPosition = zPosition;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public String getRoadName() {
        return roadName;
    }

    public Integer getVehicleCount() {
        return vehicleCount;
    }

    public Double getAverageSpeed() {
        return averageSpeed;
    }

    public String getCongestionLevel() {
        return congestionLevel;
    }

    public Double getXPosition() {
        return xPosition;
    }

    public Double getZPosition() {
        return zPosition;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRoadName(String roadName) {
        this.roadName = roadName;
    }

    public void setVehicleCount(Integer vehicleCount) {
        this.vehicleCount = vehicleCount;
    }

    public void setAverageSpeed(Double averageSpeed) {
        this.averageSpeed = averageSpeed;
    }

    public void setCongestionLevel(String congestionLevel) {
        this.congestionLevel = congestionLevel;
    }

    public void setXPosition(Double xPosition) {
        this.xPosition = xPosition;
    }

    public void setZPosition(Double zPosition) {
        this.zPosition = zPosition;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}