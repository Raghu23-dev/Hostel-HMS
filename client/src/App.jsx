// Importing CSS for the application
import "./App.css";

// Importing components from React Router for routing
import { Route, Routes } from "react-router-dom";

// Importing components for different pages and sections
import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/index";
import Auth from "./components/LandingSite/AuthPage/Index";
import SignIn from "./components/LandingSite/AuthPage/SignIn";
import AdminSignIn from "./components/LandingSite/AuthPage/AdminSignIn";
import Index from "./components/Dashboards/StudentDashboard/Index";
import Home from "./components/Dashboards/StudentDashboard/Home";
import Attendance from "./components/Dashboards/StudentDashboard/Attendance";
import Suggestions from "./components/Dashboards/StudentDashboard/Suggestions";
import Complaints from "./components/Dashboards/StudentDashboard/Complaints";
import AdminIndex from "./components/Dashboards/AdminDashboard/Index";
import AdminHome from "./components/Dashboards/AdminDashboard/Home/Home";
import RegisterStudent from "./components/Dashboards/AdminDashboard/RegisterStudent";
import AdminAttendance from "./components/Dashboards/AdminDashboard/Attendance";
import AdminComplaints from "./components/Dashboards/AdminDashboard/Complaints";
import AdminSuggestions from './components/Dashboards/AdminDashboard/Suggestions';
import AllStudents from "./components/Dashboards/AdminDashboard/AllStudents";
import { Topbar } from "./components/Dashboards/Common/Topbar";

// Main application component
function App() {
  return (
    <>
      {/* Define routing for the application */}
      <Routes>
        {/* Route for the landing site */}
        <Route path="/" element={<LandingSite />}>
          {/* Default route for the landing page */}
          <Route index element={<LandingPage />} />
          {/* Routes for authentication pages */}
          <Route path="auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route path="login" element={<SignIn />} />
            <Route path="admin-login" element={<AdminSignIn />} />
          </Route>
        </Route>
        
        {/* Route for the student dashboard */}
        <Route path="/student-dashboard" element={<Index />}>
          {/* Default route for the student home page */}
          <Route index element={<Home />} />
          {/* Routes for student dashboard features */}
          <Route path="attendance" element={<Attendance />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="suggestions" element={<Suggestions />} />
        </Route>
        
        {/* Route for the admin dashboard */}
        <Route path="/admin-dashboard" element={<AdminIndex />}>
          {/* Default route for the admin home page */}
          <Route index element={<AdminHome />} />
          {/* Routes for admin dashboard features */}
          <Route path='register-student' element={<RegisterStudent />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="suggestions" element={<AdminSuggestions />} />
          <Route path="all-students" element={<AllStudents />} />
        </Route>
      </Routes>
    </>
  );
}

// Export the App component as default
export default App;
