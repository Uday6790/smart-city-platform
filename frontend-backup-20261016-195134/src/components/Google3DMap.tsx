import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  importLibrary,
  setOptions,
} from "@googlemaps/js-api-loader";

import type {
  SelectedLocation,
} from "../types/city";

interface Google3DMapProps {
  location: SelectedLocation;
}

interface CameraPosition {
  center: {
    lat: number;
    lng: number;
    altitude: number;
  };
  range: number;
  tilt: number;
  heading: number;
  roll: number;
}

interface Google3DMapElement
  extends HTMLElement {
  flyCameraTo?: (options: {
    endCamera: CameraPosition;
    durationMillis: number;
  }) => void;
}

function Google3DMap({
  location,
}: Google3DMapProps) {
  const mapContainerRef =
    useRef<HTMLDivElement>(null);

  const mapRef =
    useRef<Google3DMapElement | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let mounted = true;

    const initializeMap =
      async () => {
        try {
          setLoading(true);
          setError("");

          const apiKey =
            import.meta.env
              .VITE_GOOGLE_MAPS_API_KEY;

          if (!apiKey) {
            throw new Error(
              "Google Maps API key is missing. Check frontend/.env"
            );
          }

          setOptions({
            key: apiKey,
            v: "weekly",
          });

          const maps3dLibrary =
            await importLibrary(
              "maps3d"
            );

          if (
            !mounted ||
            !mapContainerRef.current
          ) {
            return;
          }

          const Map3DElement =
            (
              maps3dLibrary as unknown as {
                Map3DElement: new (
                  options?: Record<
                    string,
                    unknown
                  >
                ) => HTMLElement;
              }
            ).Map3DElement;

          if (!Map3DElement) {
            throw new Error(
              "Google 3D Maps is not available."
            );
          }

          const map =
            new Map3DElement({
              center: {
                lat: location.latitude,
                lng: location.longitude,
                altitude: 100,
              },

              mode: "HYBRID",

              range: 1500,

              tilt: 65,

              heading: 0,

              roll: 0,

              gestureHandling:
                "GREEDY",
            }) as Google3DMapElement;

          map.style.width =
            "100%";

          map.style.height =
            "100%";

          map.style.display =
            "block";

          mapContainerRef.current.innerHTML =
            "";

          mapContainerRef.current.appendChild(
            map
          );

          mapRef.current = map;

          setLoading(false);

        } catch (mapError) {
          console.error(
            "Google 3D map error:",
            mapError
          );

          if (mounted) {
            setError(
              mapError instanceof Error
                ? mapError.message
                : "Unable to load Google 3D Maps."
            );

            setLoading(false);
          }
        }
      };

    void initializeMap();

    return () => {
      mounted = false;

      if (
        mapContainerRef.current
      ) {
        mapContainerRef.current.innerHTML =
          "";
      }

      mapRef.current = null;
    };
  }, [
    location.latitude,
    location.longitude,
  ]);

  return (
    <section className="google-3d-section">

      <div className="google-3d-header">

        <div>

          <span className="section-kicker">
            REAL-WORLD GOOGLE 3D
          </span>

          <h2>
            {location.name}
          </h2>

          <p>
            {location.address}
          </p>

        </div>

        <div className="google-3d-badge">
          🌐 REAL-WORLD 3D
        </div>

      </div>

      <div className="google-3d-map-wrapper">

        <div
          ref={mapContainerRef}
          className="google-3d-map"
        />

        {loading && (
          <div className="google-3d-loading">

            <div className="loading-spinner" />

            <span>
              Loading real-world 3D buildings...
            </span>

          </div>
        )}

        {error && (
          <div className="google-3d-error">

            <strong>
              Google 3D Map could not load
            </strong>

            <span>
              {error}
            </span>

          </div>
        )}

        <div className="google-3d-location-overlay">

          <span>
            📍
          </span>

          <div>

            <strong>
              {location.name}
            </strong>

            <small>
              {location.latitude.toFixed(
                5
              )}
              {" , "}
              {location.longitude.toFixed(
                5
              )}
            </small>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Google3DMap;