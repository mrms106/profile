import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProfileContext } from "../context/ProfileContext";
import { Container, Typography, Card, CardContent, Button } from "@mui/material";
import "./home.css"; // Use the same CSS as Home page

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
      <Card className="card">
        <img src={profile.photo} alt="profile-photo" />
        <hr />
        <CardContent className="card-footer">
          <Typography variant="h5" className="username">{profile.name}</Typography>
          <Typography variant="body2">📍 {profile.location.address}</Typography>
          <Typography variant="body1">{profile.description}</Typography>
          <Typography variant="body2">📧 {profile.contact}</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => window.history.back()}
            className="card-footer button"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default ProfileDetails;
