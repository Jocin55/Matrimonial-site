import React from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const AdminDashboard = () => {
  const [profiles, setProfiles] = React.useState([]);

  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await api.get("/profiles");
        setProfiles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/approvals" className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">User Approvals</h2>
          <p>Approve or reject new user registrations.</p>
        </Link>

        <Link to="/admin/access-requests" className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Access Requests</h2>
          <p>View and manage special access requests.</p>
        </Link>

        {profiles.map((profile) => (
          <Link key={profile._id} to={`/admin/profile/${profile._id}`} className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{profile.name}</h2>
            <p>Age: {profile.age}</p>
            <p>Location: {profile.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
