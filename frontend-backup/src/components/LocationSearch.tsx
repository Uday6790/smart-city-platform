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

interface LocationSearchProps {
  onLocationSelected: (
    location: SelectedLocation
  ) => void;
}

interface PlaceLocation {
  lat: () => number;
  lng: () => number;
}

interface Place {
  fetchFields: (
    options: {
      fields: string[];
    }
  ) => Promise<void>;

  displayName?: string;

  formattedAddress?: string;

  location?: PlaceLocation;

  id?: string;
}

interface PlacePrediction {
  toPlace: () => Place;
}

interface GoogleSelectEvent
  extends Event {
  placePrediction?: PlacePrediction;
}

function LocationSearch({
  onLocationSelected,
}: LocationSearchProps) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    let mounted = true;

    let autocompleteElement:
      | HTMLElement
      | null = null;

    async function initialize() {

      try {

        const apiKey =
          import.meta.env
            .VITE_GOOGLE_MAPS_API_KEY;

        if (
          !apiKey ||
          apiKey ===
            "YOUR_GOOGLE_MAPS_API_KEY"
        ) {
          throw new Error(
            "Google Maps API key is missing."
          );
        }

        setOptions({
          key: apiKey,
          v: "weekly",
        });

        const placesLibrary =
          await importLibrary(
            "places"
          );

        if (
          !mounted ||
          !containerRef.current
        ) {
          return;
        }

        const GoogleAutocomplete =
          (
            placesLibrary as unknown as {
              PlaceAutocompleteElement:
                new () => HTMLElement;
            }
          )
            .PlaceAutocompleteElement;

        if (!GoogleAutocomplete) {
          throw new Error(
            "Google Places Autocomplete is unavailable."
          );
        }

        autocompleteElement =
          new GoogleAutocomplete();

        autocompleteElement.setAttribute(
          "placeholder",
          "Search city, area, landmark or building..."
        );

        autocompleteElement.setAttribute(
          "aria-label",
          "Search location"
        );

        autocompleteElement.style.width =
          "100%";

        containerRef.current.innerHTML =
          "";

        containerRef.current.appendChild(
          autocompleteElement
        );

        const handleSelect =
          async (
            event: Event
          ) => {

            try {

              const googleEvent =
                event as GoogleSelectEvent;

              const prediction =
                googleEvent.placePrediction;

              if (!prediction) {
                return;
              }

              const place =
                prediction.toPlace();

              await place.fetchFields({
                fields: [
                  "displayName",
                  "formattedAddress",
                  "location",
                  "id",
                ],
              });

              if (!place.location) {
                setError(
                  "Coordinates were not available."
                );

                return;
              }

              const location:
                SelectedLocation = {
                name:
                  place.displayName ||
                  "Selected Location",

                address:
                  place.formattedAddress ||
                  "Address unavailable",

                latitude:
                  place.location.lat(),

                longitude:
                  place.location.lng(),

                placeId:
                  place.id,
              };

              setError("");

              onLocationSelected(
                location
              );

            } catch (err) {

              console.error(
                err
              );

              setError(
                "Unable to load this location."
              );
            }
          };

        autocompleteElement.addEventListener(
          "gmp-select",
          handleSelect
        );

        setLoading(false);

      } catch (err) {

        console.error(
          "Google search error:",
          err
        );

        if (mounted) {

          setError(
            err instanceof Error
              ? err.message
              : "Google Maps could not load."
          );

          setLoading(false);
        }
      }
    }

    void initialize();

    return () => {

      mounted = false;

      if (
        autocompleteElement &&
        containerRef.current?.contains(
          autocompleteElement
        )
      ) {

        containerRef.current.removeChild(
          autocompleteElement
        );
      }

      autocompleteElement = null;
    };

  }, [
    onLocationSelected,
  ]);

  return (
    <div className="cyber-search">

      <div className="search-header">

        <div className="search-symbol">
          ⌕
        </div>

        <div>

          <span>
            LOCATION MATRIX
          </span>

          <small>
            SEARCH REAL-WORLD CITY
          </small>

        </div>

        <div className="search-status">
          ● GOOGLE
        </div>

      </div>

      <div
        ref={containerRef}
        className="google-autocomplete-container"
      />

      {loading && (
        <div className="search-loading">
          INITIALIZING LOCATION MATRIX...
        </div>
      )}

      {error && (
        <div className="search-error">
          ⚠ {error}
        </div>
      )}

    </div>
  );
}

export default LocationSearch;