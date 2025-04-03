import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import "./home.css"; // Using the same CSS for consistency

function ProfileDetails() {
  const { id } = useParams();
  const { profiles } = useContext(ProfileContext);

  console.log("useParams id:", id);
  console.log("Profiles:", profiles);

  if (!profiles || profiles.length === 0) {
    return (
      <Container>
        <Typography variant="h5" className="empty-msg">Loading profiles...</Typography>
      </Container>
    );
  }

  const profile = profiles.find((p) => p.id === id); // Convert id to number

  console.log("Matched Profile:", profile);

  if (!profile) {
    return (
      <Container>
        <Typography variant="h5" className="empty-msg">Profile not found</Typography>
      </Container>
    );
  }

  return (
    <section className="main_container">
      <Card className="card" style={{ padding: "2rem", width: "40rem" }}>
        <img src={profile.photo} alt="profile-photo" />
        <hr />
        <CardContent className="card-footer">
          <Typography variant="h4" className="username" style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
            {profile.name}
          </Typography>
          <Typography variant="h6" style={{ fontSize: "1.8rem", color: "#81a7e0" }}>
            {profile.description}
          </Typography>
          <Typography variant="body1" style={{ fontSize: "1.5rem" }}>📍 {profile.location.address}</Typography>
          <Typography variant="body1" style={{ fontSize: "1.5rem" }}>📧 {profile.contact}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.history.back()}
            className="card-footer button"
            style={{ fontSize: "1.5rem", marginTop: "1rem" }}
          >
            Go Back
          </Button>
        </CardContent>
      </Card>

      {/* Google Maps Embed */}
      <div style={{ width: "100%", marginTop: "2rem", textAlign: "center" }}>
        <Typography variant="h5" style={{ color: "white", marginBottom: "1rem" }}>
          📍 Location Map
        </Typography>
        <iframe
          width="80%"
          height="400"
          style={{ borderRadius: "1rem", border: "none" }}
          loading="lazy"
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(profile.address)}`}
        ></iframe>
      </div>
    </section>
  );
}

export default ProfileDetails;
