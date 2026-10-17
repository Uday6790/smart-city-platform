
import { useCallback, useEffect, useState } from "react";

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

const REFRESH_INTERVAL = 10_000;

function useCityData() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [traffic, setTraffic] = useState<TrafficData[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadCityData = useCallback(async (initial = false) => {
    if (initial) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }

    try {
      const [buildingsData, sensorsData, trafficData] =
        await Promise.all([
          getBuildings(),
          getSensors(),
          getTraffic(),
        ]);

      setBuildings(buildingsData);
      setSensors(sensorsData);
      setTraffic(trafficData);
      setError("");
    } catch (err) {
      console.error("Failed to refresh Smart City data:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load Smart City data."
      );

      // Keep the last successful data visible if a refresh fails.
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    let requestInProgress = false;

    const refresh = async (initial = false) => {
      if (!active || requestInProgress) return;

      requestInProgress = true;

      try {
        await loadCityData(initial);
      } finally {
        requestInProgress = false;
      }
    };

    void refresh(true);

    const intervalId = window.setInterval(() => {
      void refresh(false);
    }, REFRESH_INTERVAL);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void refresh(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      active = false;
      window.clearInterval(intervalId);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadCityData]);

  return {
    buildings,
    sensors,
    traffic,
    loading,
    refreshing,
    error,
    refreshCityData: () => loadCityData(false),
  };
}

export default useCityData;
