import { useEffect, useState } from "react";
import {
  importLibrary,
  setOptions,
} from "@googlemaps/js-api-loader";

import { useLocation } from "../context/LocationContext";
import Google3DMap from "../components/Google3DMap";

interface RealPlace {
  id: string;
  name: string;
  address: string;
  type: string;
  latitude: number;
  longitude: number;
  mapsUri?: string;
}

function BuildingsPage() {
  const { selectedLocation } = useLocation();

  const [places, setPlaces] = useState<RealPlace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function loadNearbyPlaces() {
      try {
        setLoading(true);
        setError("");

        const apiKey =
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (
          !apiKey ||
          apiKey === "YOUR_GOOGLE_MAPS_API_KEY"
        ) {
          throw new Error(
            "Google Maps API key is missing. Check frontend/.env"
          );
        }

        setOptions({
          key: apiKey,
          v: "weekly",
        });

        /*
         * Load Google Places library
         */
        const placesLibrary =
          await importLibrary("places");

        const Place =
          placesLibrary.Place;

        const SearchNearbyRankPreference =
          placesLibrary.SearchNearbyRankPreference;

        /*
         * Search around selected location
         */
        const request = {
          fields: [
            "id",
            "displayName",
            "formattedAddress",
            "location",
            "primaryType",
            "googleMapsURI",
          ],

          locationRestriction: {
            center: {
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            },
            radius: 2000,
          },

          maxResultCount: 20,

          rankPreference:
            SearchNearbyRankPreference.DISTANCE,
        };

        /*
         * Call Google Places
         */
        const result =
          await Place.searchNearby(request);

        if (cancelled) {
          return;
        }

        /*
         * Build our own places array.
         *
         * We intentionally do NOT use
         * .filter().map() here.
         */
        const realPlaces: RealPlace[] = [];

        const googlePlaces =
          result.places || [];

        for (
          let index = 0;
          index < googlePlaces.length;
          index++
        ) {
          const place =
            googlePlaces[index];

          if (!place) {
            continue;
          }

          if (!place.location) {
            continue;
          }

          /*
           * Google location coordinates
           */
          const latitude =
            place.location.lat();

          const longitude =
            place.location.lng();

          /*
           * Create our place object
           */
          const realPlace: RealPlace = {
            id:
              place.id ||
              `place-${index}`,

            name:
              place.displayName ||
              "Unnamed place",

            address:
              place.formattedAddress ||
              "Address unavailable",

            type:
              place.primaryType ||
              "place",

            latitude:
              Number(latitude),

            longitude:
              Number(longitude),

            mapsUri:
              place.googleMapsURI ||
              undefined,
          };

          realPlaces.push(realPlace);
        }

        setPlaces(realPlaces);

      } catch (err) {
        console.error(
          "Google Places error:",
          err
        );

        if (!cancelled) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(
              "Unable to load Google Places."
            );
          }

          setPlaces([]);
        }

      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadNearbyPlaces();

    return () => {
      cancelled = true;
    };

  }, [
    selectedLocation.latitude,
    selectedLocation.longitude,
  ]);


  return (
    <div className="dashboard-page">

      {/* =====================================================
          PAGE HEADER
         ===================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "20px",
        }}
      >

        <div>

          <h1 className="page-title">
            🏢 Buildings & Places
          </h1>

          <p className="page-subtitle">
            Real places around{" "}
            <strong>
              {selectedLocation.name}
            </strong>
          </p>

          <p
            style={{
              marginTop: "6px",
              color: "#64748b",
              fontSize: "12px",
            }}
          >
            {selectedLocation.address}
          </p>

        </div>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          🔄 Refresh
        </button>

      </div>


      {/* =====================================================
          CURRENT LOCATION
         ===================================================== */}

      <div
        className="location-data-notice"
        style={{
          marginTop: 0,
        }}
      >

        <div>

          <span className="section-kicker">
            CURRENT LOCATION
          </span>

          <h3>
            {selectedLocation.name}
          </h3>

          <p>
            Showing real places around the
            selected location.
          </p>

        </div>

        <div className="location-coordinates">

          <span>
            Latitude
          </span>

          <strong>
            {selectedLocation.latitude.toFixed(
              6
            )}
          </strong>

          <span>
            Longitude
          </span>

          <strong>
            {selectedLocation.longitude.toFixed(
              6
            )}
          </strong>

        </div>

      </div>


      {/* =====================================================
          REAL GOOGLE 3D
         ===================================================== */}

      <section
        className="google-3d-section"
        style={{
          marginTop: "24px",
        }}
      >

        <div className="google-3d-header">

          <div>

            <h2>
              🌍 Real-World 3D
            </h2>

            <p>
              Actual Google 3D buildings around{" "}
              <strong>
                {selectedLocation.name}
              </strong>
            </p>

          </div>

          <div className="google-3d-badge">
            REAL-WORLD GOOGLE 3D
          </div>

        </div>

        <Google3DMap
          location={selectedLocation}
        />

      </section>


      {/* =====================================================
          NEARBY PLACES
         ===================================================== */}

      <section
        style={{
          marginTop: "28px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                color: "#0f172a",
                fontSize: "20px",
              }}
            >
              Nearby Places
            </h2>

            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              Real Google Places within 2 km
            </p>

          </div>

          {!loading && (
            <span
              style={{
                padding: "7px 12px",
                borderRadius: "20px",
                background: "#e0f2fe",
                color: "#0369a1",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              {places.length} places
            </span>
          )}

        </div>


        {/* =================================================
            LOADING
           ================================================= */}

        {loading && (

          <div
            className="card"
            style={{
              padding: "30px",
              textAlign: "center",
            }}
          >

            <div className="loading-spinner" />

            <p
              style={{
                margin: "15px 0 0",
                color: "#64748b",
              }}
            >
              Loading real places around{" "}
              {selectedLocation.name}...
            </p>

          </div>

        )}


        {/* =================================================
            ERROR
           ================================================= */}

        {error && (

          <div className="google-3d-error">

            <strong>
              Unable to load nearby places
            </strong>

            <p>
              {error}
            </p>

            <p>
              Check your Google Maps API key
              and make sure Places API (New)
              is enabled.
            </p>

          </div>

        )}


        {/* =================================================
            NO RESULTS
           ================================================= */}

        {!loading &&
          !error &&
          places.length === 0 && (

            <div
              className="card"
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >

              <h3>
                No mapped places found
              </h3>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Try searching for another
                location.
              </p>

            </div>

        )}


        {/* =================================================
            REAL PLACES
           ================================================= */}

        {!loading &&
          !error &&
          places.length > 0 && (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >

              {places.map(
                (place) => (

                  <article
                    key={place.id}
                    className="card"
                    style={{
                      padding: "20px",
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >

                      {/* ICON */}

                      <div
                        style={{
                          width: "42px",
                          height: "42px",
                          minWidth: "42px",
                          borderRadius: "10px",
                          background: "#e0f2fe",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                        }}
                      >
                        🏢
                      </div>


                      {/* INFORMATION */}

                      <div>

                        <h3
                          style={{
                            margin: 0,
                            color: "#0f172a",
                            fontSize: "16px",
                          }}
                        >
                          {place.name}
                        </h3>

                        <p
                          style={{
                            margin: "7px 0 0",
                            color: "#64748b",
                            fontSize: "12px",
                            lineHeight: 1.5,
                          }}
                        >
                          {place.address}
                        </p>

                        <div
                          style={{
                            marginTop: "10px",
                            color: "#0284c7",
                            fontSize: "11px",
                            fontWeight: 700,
                            textTransform:
                              "uppercase",
                          }}
                        >
                          {place.type.replace(
                            /_/g,
                            " "
                          )}
                        </div>

                      </div>

                    </div>


                    {/* GOOGLE MAPS */}

                    {place.mapsUri && (

                      <a
                        href={place.mapsUri}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "16px",
                          color: "#0284c7",
                          fontSize: "12px",
                          fontWeight: 700,
                          textDecoration:
                            "none",
                        }}
                      >
                        View on Google Maps →
                      </a>

                    )}

                  </article>

                )
              )}

            </div>

        )}

      </section>

    </div>
  );
}

export default BuildingsPage;