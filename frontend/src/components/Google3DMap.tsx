
import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import type { SelectedLocation } from "../types/city";

type Coordinates = {
  lat: number;
  lng: number;
};

type Map3DElementType = HTMLElement & {
  center: Coordinates & { altitude?: number };
  range: number;
  tilt: number;
  heading: number;
  mode: string;
};

type Map3DLibrary = {
  Map3DElement: new (options: {
    center: Coordinates & { altitude: number };
    range: number;
    tilt: number;
    heading: number;
    mode: string;
  }) => Map3DElementType;
  MapMode?: {
    HYBRID?: string;
    SATELLITE?: string;
  };
};

type Google3DMapProps = {
  location?: SelectedLocation | null;
  center?: Coordinates;
  locationName?: string;
};

const DEFAULT_CENTER: Coordinates = {
  lat: 16.3067,
  lng: 80.4365,
};

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as
  | string
  | undefined;

function readNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return undefined;
}

function readCoordinate(value: unknown): number | undefined {
  if (typeof value === "function") {
    try {
      return readNumber((value as () => unknown)());
    } catch {
      return undefined;
    }
  }

  return readNumber(value);
}

function getCoordinates(
  location?: SelectedLocation | null
): Coordinates | undefined {
  if (!location) return undefined;

  const item = location as SelectedLocation & {
    lat?: number;
    lng?: number;
    latitude?: number;
    longitude?: number;
    coordinates?: {
      lat?: number;
      lng?: number;
      latitude?: number;
      longitude?: number;
    };
    location?: {
      lat?: number | (() => number);
      lng?: number | (() => number);
      latitude?: number;
      longitude?: number;
    };
  };

  const sources = [item, item.coordinates, item.location].filter(
    (source) => source != null
  );

  for (const source of sources) {
    const lat =
      readCoordinate(source.lat) ??
      readCoordinate(source.latitude);
    const lng =
      readCoordinate(source.lng) ??
      readCoordinate(source.longitude);

    if (
      lat !== undefined &&
      lng !== undefined &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180
    ) {
      return { lat, lng };
    }
  }

  return undefined;
}

function getLocationName(
  location?: SelectedLocation | null
): string {
  if (!location) return "Guntur, Andhra Pradesh";

  const item = location as SelectedLocation & {
    name?: string;
    address?: string;
    formattedAddress?: string;
    displayName?: string;
  };

  return (
    item.name ??
    item.formattedAddress ??
    item.displayName ??
    item.address ??
    "Selected location"
  );
}

export default function Google3DMap({
  location,
  center,
  locationName,
}: Google3DMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map3DElementType | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedCoordinates = getCoordinates(location);
  const activeCenter = selectedCoordinates ?? center ?? DEFAULT_CENTER;
  const activeLocationName =
    locationName ?? getLocationName(location);

  // Initialize Google 3D Maps only once.
  useEffect(() => {
    let cancelled = false;
    let createdMap: Map3DElementType | null = null;

    async function initializeMap() {
      const container = containerRef.current;
      if (!container) return;

      if (!apiKey?.trim()) {
        setError("Google Maps API key is missing. Check frontend/.env.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        setOptions({ key: apiKey, v: "beta" });

        const library = (await importLibrary(
          "maps3d"
        )) as unknown as Map3DLibrary;

        if (cancelled || !containerRef.current) return;

        const map = new library.Map3DElement({
          center: {
            lat: DEFAULT_CENTER.lat,
            lng: DEFAULT_CENTER.lng,
            altitude: 0,
          },
          range: 1200,
          tilt: 65,
          heading: 0,
          mode: library.MapMode?.HYBRID ?? "HYBRID",
        });

        map.style.width = "100%";
        map.style.height = "100%";
        map.style.display = "block";

        if (cancelled || !containerRef.current) return;

        createdMap = map;
        mapRef.current = map;
        containerRef.current.appendChild(map);
        setLoading(false);
      } catch (cause) {
        if (cancelled) return;

        console.error("Google 3D map failed to load:", cause);
        setError(
          cause instanceof Error
            ? cause.message
            : "Unable to load the Google 3D map."
        );
        setLoading(false);
      }
    }

    void initializeMap();

    return () => {
      cancelled = true;

      if (createdMap?.parentNode) {
        createdMap.parentNode.removeChild(createdMap);
      }

      if (mapRef.current === createdMap) {
        mapRef.current = null;
      }
    };
  }, []);

  // Update the existing map when the searched location changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    try {
      map.center = {
        lat: activeCenter.lat,
        lng: activeCenter.lng,
        altitude: 0,
      };
      map.range = 1200;
      map.tilt = 65;
      map.heading = 0;
    } catch (cause) {
      console.error("Could not update map location:", cause);
    }
  }, [activeCenter.lat, activeCenter.lng]);

  return (
    <section className="google-3d-map">
      <header className="google-3d-map__header">
        <div>
          <p className="google-3d-map__eyebrow">
            SMART CITY · REAL-WORLD 3D
          </p>
          <h2>{activeLocationName}</h2>
          <p className="google-3d-map__subtitle">
            Explore streets, buildings and surrounding terrain
          </p>
        </div>

        <span className="google-3d-map__status">
          <span className="google-3d-map__status-dot" />
          {loading ? "Loading map" : error ? "Map unavailable" : "3D VIEW"}
        </span>
      </header>

      <div
        ref={containerRef}
        className="google-3d-map__canvas"
        role="region"
        aria-label={`Interactive 3D map of ${activeLocationName}`}
      >
        {loading && (
          <div className="google-3d-map__message">
            Loading 3D city environment…
          </div>
        )}

        {!loading && error && (
          <div className="google-3d-map__message google-3d-map__error">
            <strong>Could not load the 3D map</strong>
            <p>{error}</p>
            <p>
              Check API access, billing, key restrictions and 3D coverage.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
