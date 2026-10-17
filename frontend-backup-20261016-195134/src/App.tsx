import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import BuildingsPage from "./pages/BuildingsPage";
import Traffic from "./pages/Traffic";
import Sensors from "./pages/Sensors";
import Environment from "./pages/Environment";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>

      <div className="cyber-app">

        <div className="scanline" />

        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="ambient ambient-three" />

        <Sidebar />

        <div className="cyber-main">

          <Header />

          <main className="cyber-content">

            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/buildings"
                element={<BuildingsPage />}
              />

              <Route
                path="/traffic"
                element={<Traffic />}
              />

              <Route
                path="/sensors"
                element={<Sensors />}
              />

              <Route
                path="/environment"
                element={<Environment />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />

            </Routes>

          </main>

          <footer className="cyber-footer">

            <span>
              SMART CITY NEXUS
            </span>

            <span>
              REAL-TIME URBAN INTELLIGENCE
            </span>

            <span>
              SYSTEM ONLINE
            </span>

          </footer>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;