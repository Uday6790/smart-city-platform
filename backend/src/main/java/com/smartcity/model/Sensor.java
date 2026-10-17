package com.smartcity.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sensors")
public class Sensor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private Double value;
    private String unit;
    private String status;

    private Double xPosition;
    private Double yPosition;
    private Double zPosition;

    public Sensor() {
    }

    public Sensor(
            String name,
            String type,
            Double value,
            String unit,
            String status,
            Double xPosition,
            Double yPosition,
            Double zPosition) {

        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.status = status;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.zPosition = zPosition;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public Double getValue() {
        return value;
    }

    public String getUnit() {
        return unit;
    }

    public String getStatus() {
        return status;
    }

    public Double getXPosition() {
        return xPosition;
    }

    public Double getYPosition() {
        return yPosition;
    }

    public Double getZPosition() {
        return zPosition;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setXPosition(Double xPosition) {
        this.xPosition = xPosition;
    }

    public void setYPosition(Double yPosition) {
        this.yPosition = yPosition;
    }

    public void setZPosition(Double zPosition) {
        this.zPosition = zPosition;
    }
}