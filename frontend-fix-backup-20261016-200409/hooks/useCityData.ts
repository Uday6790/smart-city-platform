import { useEffect, useState } from "react";

import type {
  Building,
  Sensor,
  TrafficData,
} from "../types/city";

import {
  getBuildings,
  getSensors,
  getTraffic,
} from "../services/api";

function useCityData() {
  const [buildings, setBuildings] =
    useState<Building[]>([]);

  const [sensors, setSensors] =
    useState<Sensor[]>([]);

  const [traffic, setTraffic] =
    useState<TrafficData[]>([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string>("");

  useEffect(() => {
    let mounted = true;

    const loadCityData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          buildingsData,
          sensorsData,
          trafficData,
        ] = await Promise.all([
          getBuildings(),
          getSensors(),
          getTraffic(),
        ]);

        if (!mounted) {
          return;
        }

        setBuildings(buildingsData);
        setSensors(sensorsData);
        setTraffic(trafficData);
      } catch (err) {
        console.error(
          "Failed to load city data:",
          err
        );

        if (mounted) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(
              "Failed to load Smart City data"
            );
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadCityData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    buildings,
    sensors,
    traffic,
    loading,
    error,
  };
}

export default useCityData;