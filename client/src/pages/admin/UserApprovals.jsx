import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UserApprovals() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await api.get("/admin/pending");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load pending users");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingUsers();
  }, []);

  const approveUser = async (id) => {
    try {
      await api.put(`/admin/approve/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      alert("Approval failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pending User Approvals</h1>

      {users.length === 0 ? (
        <p>No pending users</p>
      ) : (
        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>

              <button
                onClick={() => approveUser(user._id)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
