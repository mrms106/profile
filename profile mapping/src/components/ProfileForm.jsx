import { useState, useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { TextField, Button, Container, Alert } from "@mui/material";

function AddProfileForm() {
  const { addProfile } = useContext(ProfileContext);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    description: "",
    address: "",
    contact: "",
    interests: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Convert Address to Latitude & Longitude using Google Geocoding API
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formData.address
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );

      const data = await response.json();
      if (data.status !== "OK") throw new Error("Invalid address!");

      const location = data.results[0].geometry.location;

      // Create new profile object
      const newProfile = {
        name: formData.name,
        photo: formData.photo || "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg", // Default photo
        description: formData.description,
        address: formData.address,
        contact: formData.contact,
        interests: formData.interests.split(",").map((interest) => interest.trim()), // Convert string to array
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      };

      await addProfile(newProfile);
      setFormData({
        name: "",
        photo: "",
        description: "",
        address: "",
        contact: "",
        interests: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleAddProfile}>
        <TextField fullWidth label="Name" name="name" required value={formData.name} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <TextField fullWidth label="Photo URL" name="photo" value={formData.photo} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <TextField fullWidth label="Description" name="description" required value={formData.description} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <TextField fullWidth label="Address" name="address" required value={formData.address} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <TextField fullWidth label="Contact Email" name="contact" required value={formData.contact} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <TextField fullWidth label="Interests (comma separated)" name="interests" required value={formData.interests} onChange={handleChange} style={{ marginBottom: "10px" }} />
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? "Adding..." : "Add Profile"}
        </Button>
      </form>
    </Container>
  );
}

export default AddProfileForm;
