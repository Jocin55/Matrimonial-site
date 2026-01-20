import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/profiles");
        console.log("Profiles response:", res.data);
        setProfiles(res.data);
      } catch (err) {
        console.error("Failed to load profiles:", err.response || err);
        setError(err.response?.data?.message || "Failed to load profiles");
      }
      setLoading(false);
    };

    fetchProfiles();
  }, []);
  
  const requestAccess = async (id) => {
    try {
      await api.post("/profiles/request-access", {
        targetUserId: id,
      });
      alert("Access request sent");
    } catch (err) {
      alert(err.response?.data?.message || "Request failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profiles...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Profiles</h1>

      {profiles.length === 0 ? (
        <p className="text-center text-gray-500">No profiles found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profiles.map((user) => (
            <div key={user._id} className="bg-white p-4 rounded shadow">
              <div className="h-40 w-full bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">No Photo</span>
              </div>

              <h2 className="font-semibold mt-2">{user.name}, {user.age}</h2>
              <p className="text-gray-600">{user.address}</p>

              {!user.fullAccess ? (
                <button onClick={() => requestAccess(user._id)} 
                className="mt-3 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">Request Access</button>
              ) : (
              <button onClick={() => navigate(`/profiles/${user._id}`)} 
              className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">View Profile</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}