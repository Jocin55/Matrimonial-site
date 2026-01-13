import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

// User
import Home from "../pages/user/Home";
import BrowseProfiles from "../pages/user/BrowseProfiles";
import Requests from "../pages/user/Requests";

// Admin
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserApprovals from "../pages/admin/UserApprovals";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

export default function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        
       
        <Route element={<UserRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<BrowseProfiles />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Route>

       
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="approvals" element={<UserApprovals />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
}
