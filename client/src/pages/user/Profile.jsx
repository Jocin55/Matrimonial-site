export default function Profile() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-3">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Phone:</strong> 9876543210</p>
        <p><strong>Age:</strong> 28</p>
        <p><strong>Profession:</strong> Software Engineer</p>
        <p><strong>Marital Status:</strong> Never Married</p>

        <button className="mt-4 bg-black text-white px-4 py-2 rounded">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
