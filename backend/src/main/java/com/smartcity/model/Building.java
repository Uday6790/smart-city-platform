package com.smartcity.model;

import jakarta.persistence.*;

@Entity
@Table(name = "buildings")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private Integer floors;
    private Double height;

    private Double xPosition;
    private Double yPosition;
    private Double zPosition;

    private String color;

    public Building() {
    }

    public Building(
            String name,
            String type,
            Integer floors,
            Double height,
            Double xPosition,
            Double yPosition,
            Double zPosition,
            String color) {

        this.name = name;
        this.type = type;
        this.floors = floors;
        this.height = height;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.zPosition = zPosition;
        this.color = color;
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

    public Integer getFloors() {
        return floors;
    }

    public Double getHeight() {
        return height;
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

    public String getColor() {
        return color;
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

    public void setFloors(Integer floors) {
        this.floors = floors;
    }

    public void setHeight(Double height) {
        this.height = height;
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

    public void setColor(String color) {
        this.color = color;
    }
}