import { useState, useEffect } from "react";
import api from "../../api/adminAxios";

const AccessRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/access");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch access requests", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/access-approve/${id}`);
      setRequests(requests.filter((req) => req._id !== id));
    } catch (err) {
      alert("Approval failed");
    }
  };

  const handleDeny = async (id) => {
    try {
      await api.put(`/admin/deny-access/${id}`);
      setRequests(requests.filter((req) => req._id !== id));
    } catch (err) {
      alert("Deny failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Access Requests</h1>

      <div className="bg-white rounded shadow p-4">
        {requests.length === 0 && <p> No access requests.</p>}

        {requests.map((req) => (
          <div key={req._id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p className="font-semibold">
                {req.requester?.name} → {req.targetUser?.name}
              </p>
              <p className="text-sm text-gray-500">Status: Pending</p>
            </div>

            <div className="space-x-2">
              <button onClick={() => handleApprove(req._id)} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
                Approve
              </button>
              <button onClick={() => handleDeny(req._id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccessRequests;
