export default function BrowseProfiles() {
  const profiles = [
    { id: 1, name: "Anjali", age: 26, location: "Chennai" },
    { id: 2, name: "Priya", age: 27, location: "Bangalore" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Profiles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg">{profile.name}</h2>
            <p>Age: {profile.age}</p>
            <p>Location: {profile.location}</p>

            <button className="mt-3 bg-black text-white px-4 py-1 rounded">Request Access</button>
          </div>
        ))}
      </div>
    </div>
  );
}
