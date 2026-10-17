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
      <div className="app">
        <Sidebar />

        <div className="main-content">
          <Header />

          <main className="page-content">
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
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;