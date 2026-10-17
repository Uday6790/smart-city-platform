SMART CITY // NEXUS — FRONTEND UPDATE

WHAT CHANGED
- Dark cyberpunk / glass-panel styling across the existing frontend.
- Dashboard has a "Use my current location" button.
- Browser geolocation recenters the existing Google 3D map and updates the shared selected location.
- Search and current location are shared through the existing LocationContext.
- The Buildings page uses Google Places Nearby Search to list mapped places within 2 km of the selected point, including names, types, addresses, and Google Maps links where available.
- Updated page title and dashboard branding.

INSTALL / APPLY
1. Back up your current frontend folder.
2. Extract this ZIP.
3. Copy the contents of the extracted folder into your existing frontend folder, allowing src files to be replaced.
4. DO NOT overwrite your existing frontend/.env. This ZIP intentionally excludes .env and API keys.
5. Open a terminal in the frontend folder and run:
   npm install
   npm run dev
6. For a production build, run:
   npm run build

GOOGLE MAPS REQUIREMENTS
- Keep your existing VITE_GOOGLE_MAPS_API_KEY in frontend/.env.
- In Google Cloud, enable the Maps JavaScript API, Places API (New), and the map capabilities needed by the Google 3D Maps component.
- Make sure billing and API key restrictions are configured correctly.
- Browser geolocation requires permission and works on localhost or a secure HTTPS origin.
- Google 3D building coverage varies by location. Where Google does not provide 3D geometry, the map cannot invent it.
- Nearby Places returns places Google has mapped, not every individual building or every detail. Some residential buildings may have no public name/details.
- Current location updates the map; use the Buildings tab to see the surrounding place list.

DATA ACCURACY NOTE
The existing backend's sample sensor, traffic, and database data are not automatically converted into live real-world readings by changing the UI. The map and nearby-place details come from Google Maps/Places; traffic and environmental sensor data require actual connected data sources.
