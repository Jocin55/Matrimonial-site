import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get('/requests');
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Access Requests</h1>
      {requests.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">You have not sent any access requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow">
              <p><strong>Bride:</strong> {req.bride.name}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><strong>Requested At:</strong> {new Date(req.createdAt).toLocaleDateString()}</p>
              {req.status === 'approved' && (
                <Link to={`/profile/${req.bride._id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  View Profile
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
