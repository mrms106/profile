import { useState, useEffect } from "react";

export function useProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("http://localhost:5000/profiles");
        if (!response.ok) throw new Error("Failed to fetch profiles");
        
        const data = await response.json();
        setProfiles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const addProfile = async (profile) => {
    try {
      const response = await fetch("http://localhost:5000/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
  
      if (!response.ok) throw new Error("Failed to add profile");
  
      const newProfile = await response.json();
      setProfiles((prev) => [...prev, newProfile]);
    } catch (err) {
      setError(err.message);
    }
  };
  
  

  return { profiles, loading, error, addProfile };
}
