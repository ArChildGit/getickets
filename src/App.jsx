import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute"
import LoginPage from "./components/Pages/Login"
import Dashboard from "./components/Pages/Dashboard"
import ProfilePage from "./components/Pages/Profile";
import EventDetail from "./components/Pages/Event_details";
import LandingPage from "./components/Pages/Landing";
import { TengahSemester } from "./components/Pages/Tengah_semester";
import RegisterPage from "./components/Pages/Register";
import AdminDetail from "./components/Pages/Admin_details";
import AdminEventList from "./components/Pages/Admin_event_list";
import AddEventForm from "./components/Pages/Admin_add_event";
import MyTicket from "./components/Pages/My_ticket";
import BantuAgt from "./components/Pages/Bantu_anggita";
import MyCommittee from "./components/Pages/My_committee";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={<LandingPage />}
          />
          <Route
            exact
            path="/login"
            element={<LoginPage />}
          />
          <Route
            exact
            path="/register"
            element={<RegisterPage />}
          />
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
            path="/events/:eventId"
            element={<PrivateRoute component={<EventDetail />} />}
          />
          <Route
            path="/admin-events/:eventId"
            element={<PrivateRoute component={<AdminDetail />} />}
          />
          <Route
            exact
            path="/my-ticket"
            element={<PrivateRoute component={<MyTicket />} />}
          />
          <Route
            exact
            path="/uts"
            element={<PrivateRoute component={<TengahSemester />} />}
          />
          <Route
            exact
            path="/admin-details"
            element={<PrivateRoute component={<AdminDetail />} />}
          />
          <Route
            exact
            path="/admin-event-list"
            element={<PrivateRoute component={<AdminEventList />} />}
          />
          <Route
            exact
            path="/admin-add-event"
            element={<PrivateRoute component={<AddEventForm />} />}
          />
          <Route
            exact
            path="/my-committee"
            element={<PrivateRoute component={<MyCommittee />} />}
          />
          <Route
            exact
            path="/bantu-agt"
            element={<PrivateRoute component={<BantuAgt />} />}
          />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
