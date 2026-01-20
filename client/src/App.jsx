import { Routes, Route, Navigate } from "react-router-dom";

// Auth pages
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// User pages
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import BrowseProfiles from "./pages/user/BrowseProfiles";
import Requests from "./pages/user/Requests";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserApprovals from "./pages/admin/UserApprovals";
import AccessRequests from "./pages/admin/AccessRequests";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Protected route for users
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken"); 
  return token ? children : <Navigate to="/" />;
};

// Protected route for admin
const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken"); 
  return token ? children : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* User dashboard routes */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles/:id" element={<Profile />} />
        <Route path="/browse" element={<BrowseProfiles />} />
        <Route path="/requests" element={<Requests />} />
      </Route>

      {/* Admin login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin dashboard routes */}
      <Route element={<AdminProtectedRoute><DashboardLayout /></AdminProtectedRoute>}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/approvals" element={<UserApprovals />} />
        <Route path="/admin/access" element={<AccessRequests />} />
      </Route>

      {/* Redirect any unknown route to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
