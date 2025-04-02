import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { Container, Typography, Card, CardContent } from "@mui/material";

function ProfileDetails() {
  const { id } = useParams();
  const { profiles } = useContext(ProfileContext);

  const profile = profiles.find((p) => p.id === parseInt(id));

  if (!profile) {
    return (
      <Container>
        <Typography variant="h5">Profile not found</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Card style={{ padding: "20px", marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h4">{profile.name}</Typography>
          <Typography variant="body1">{profile.description}</Typography>
          <Typography variant="body2">📍 Address: {profile.address}</Typography>
          <Typography variant="body2">📧 Contact: {profile.contact}</Typography>
        </CardContent>
      </Card>

      {/* Map Embed (Google Maps) */}
      <iframe
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(profile.address)}`}
      ></iframe>
    </Container>
  );
}

export default ProfileDetails;
