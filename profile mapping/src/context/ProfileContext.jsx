import { createContext, useState, useEffect } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/profiles")
      .then((res) => res.json())
      .then(setProfiles)
      .catch(console.error);
  }, []);

  const addProfile = async (profile) => {
    const response = await fetch("http://localhost:5000/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });

    const newProfile = await response.json();
    setProfiles((prev) => [...prev, newProfile]);
  };

  const updateProfile = async (updatedProfile) => {
    const response = await fetch(`http://localhost:5000/profiles/${updatedProfile.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) return console.error("Failed to update profile");

    setProfiles((prev) =>
      prev.map((profile) => (profile.id === updatedProfile.id ? updatedProfile : profile))
    );
  };

  const deleteProfile = async (id) => {
    await fetch(`http://localhost:5000/profiles/${id}`, { method: "DELETE" });
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  return (
    <ProfileContext.Provider value={{ profiles, addProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}
