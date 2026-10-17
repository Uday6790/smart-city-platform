import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type {
  SelectedLocation,
} from "../types/city";

interface LocationContextType {
  selectedLocation: SelectedLocation;

  setSelectedLocation: (
    location: SelectedLocation
  ) => void;
}

const defaultLocation: SelectedLocation = {
  name: "Hyderabad",
  address: "Hyderabad, Telangana, India",
  latitude: 17.406498,
  longitude: 78.477244,
};

const LocationContext =
  createContext<LocationContextType | undefined>(
    undefined
  );

interface LocationProviderProps {
  children: ReactNode;
}

export function LocationProvider({
  children,
}: LocationProviderProps) {
  const [
    selectedLocation,
    setSelectedLocation,
  ] = useState<SelectedLocation>(
    defaultLocation
  );

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context =
    useContext(LocationContext);

  if (!context) {
    throw new Error(
      "useLocation must be used inside LocationProvider"
    );
  }

  return context;
}