import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

export default function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/profiles/${id}`);
        console.log(res.data);
        setProfile(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Access denied or session expired"
        );
      }
    };

    fetchProfile();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{profile.name}'s Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-3">
        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Work:</strong> {profile.work}</p>
        <p><strong>Salary:</strong> {profile.salary}</p>
        <p><strong>Marital Status:</strong> {profile.married}</p>
        <p><strong>Address:</strong> {profile.address}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        <p><strong>Religion:</strong> {profile.religion}</p>
        <p><strong>Horoscope:</strong> {profile.horoscope}</p>

      </div>
    </div>
  );
}
