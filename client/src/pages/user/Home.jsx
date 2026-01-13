import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    api
      .get("/profiles/dashboard") // ✅ correct endpoint
      .then(res => setProfiles(res.data))
      .catch(err => console.log(err.response?.data));
  }, []);

  const requestAccess = async (id) => {
    try {
      await api.post("/profiles/request-access", {
        targetUserId: id,
      });
      alert("Access request sent");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Profiles</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {profiles.map(user => (
          <div key={user._id} className="bg-white p-4 rounded shadow">
            <img
              src={user.photo}
              className="h-40 w-full object-cover rounded"
              alt={user.name}
            />

            <h2 className="font-semibold mt-2">
              {user.name}, {user.age}
            </h2>
            <p className="text-gray-600">{user.city}</p>

            <button
              onClick={() => requestAccess(user._id)}
              className="mt-3 bg-pink-500 text-white px-4 py-2 rounded"
            >
              Request Access
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
