import React, { useState } from "react";

const AccessRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, user: "Charlie", request: "Premium access" },
    { id: 2, user: "Diana", request: "Profile highlight" },
  ]);

  const handleGrant = (id) => {
    console.log("Granted access for", id);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleDeny = (id) => {
    console.log("Denied access for", id);
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Access Requests</h1>

      <div className="bg-white rounded shadow p-4">
        {requests.length === 0 && <p>No access requests.</p>}
        {requests.map((req) => (
          <div key={req.id} className="flex justify-between items-center p-2 border-b">
            <div>
              <p className="font-semibold">{req.user}</p>
              <p className="text-sm text-gray-500">{req.request}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleGrant(req.id)}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Grant
              </button>
              <button
                onClick={() => handleDeny(req.id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
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