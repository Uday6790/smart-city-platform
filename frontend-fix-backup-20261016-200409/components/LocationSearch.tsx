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
  fetchFields: (options: {
    fields: string[];
  }) => Promise<void>;

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

    const initializeAutocomplete =
      async () => {
        try {
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
              "Google Place Autocomplete is not available."
            );
          }

          autocompleteElement =
            new GoogleAutocomplete();

          autocompleteElement.setAttribute(
            "placeholder",
            "Search a city, area, landmark or building..."
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
            async (event: Event) => {
              try {
                const googleEvent =
                  event as GoogleSelectEvent;

                const placePrediction =
                  googleEvent.placePrediction;

                if (
                  !placePrediction
                ) {
                  return;
                }

                const place =
                  placePrediction.toPlace();

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
                    "Google could not find coordinates for this location."
                  );

                  return;
                }

                const selectedLocation:
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
                  selectedLocation
                );

              } catch (
                selectionError
              ) {
                console.error(
                  "Location selection error:",
                  selectionError
                );

                setError(
                  "Unable to load the selected location."
                );
              }
            };

          autocompleteElement.addEventListener(
            "gmp-select",
            handleSelect
          );

          setLoading(false);

        } catch (
          initializationError
        ) {
          console.error(
            "Google Maps initialization error:",
            initializationError
          );

          if (mounted) {
            setError(
              initializationError instanceof
                Error
                ? initializationError.message
                : "Unable to load Google Maps."
            );

            setLoading(false);
          }
        }
      };

    void initializeAutocomplete();

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
    <div className="location-search-wrapper">

      <div className="location-search-label">

        <span className="location-search-icon">
          🔍
        </span>

        <div>

          <strong>
            Explore any location
          </strong>

          <small>
            Search a city, area, landmark or
            building
          </small>

        </div>

      </div>

      <div
        ref={containerRef}
        className="google-autocomplete-container"
      />

      {loading && (
        <div className="location-search-loading">
          Loading Google location search...
        </div>
      )}

      {error && (
        <div className="location-search-error">
          ⚠️ {error}
        </div>
      )}

    </div>
  );
}

export default LocationSearch;