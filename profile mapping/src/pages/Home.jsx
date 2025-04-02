import { useContext } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileCard from "../components/ProfileCard";
import { Container, Typography } from "@mui/material";

function Home() {
  const { profiles } = useContext(ProfileContext);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Profile Explorer
      </Typography>

      {profiles.length === 0 ? (
        <Typography variant="h6">No profiles found.</Typography>
      ) : (
        profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} showActions={false} />
        ))
      )}
    </Container>
  );
}

export default Home;
