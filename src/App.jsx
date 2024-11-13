import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute"
import LoginPage from "./components/Pages/Login"
import Dashboard from "./components/Pages/Dashboard"
import ProfilePage from "./components/Pages/Profile";
import EventDetail from "./components/Pages/Event_details";
import LandingPage from "./components/Pages/Landing";
import { TengahSemester } from "./components/Pages/Tengah_semester";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<LandingPage />} />
        <Route
          exact
          path="/login"
          element={<LoginPage />} />
        <Route
          exact
          path="/dashboard"
          element={<PrivateRoute component={<Dashboard />} />}
        />
        <Route
          exact
          path="/profile"
          element={<PrivateRoute component={<ProfilePage />} />}
        />
        <Route
          exact
          path="/details"
          element={<PrivateRoute component={<EventDetail />} />}
        />
        <Route
          exact
          path="/uts"
          element={<PrivateRoute component={<TengahSemester />} />}
        />
      </Routes>
    </div>
  )
}

export default App
