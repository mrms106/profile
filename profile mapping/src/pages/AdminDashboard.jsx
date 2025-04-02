import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";
import { Container, Button, Typography } from "@mui/material";

function AdminDashboard() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button onClick={() => {
        setShowForm(!showForm);
        setEditingProfile(null);
      }} variant="contained" color="primary" style={{ marginBottom: "10px" }}>
        {showForm ? "Hide Form" : "Add Profile"}
      </Button>

      {/* Add/Edit Profile Form */}
      {showForm && (
        <ProfileForm
          onSubmit={editingProfile ? updateProfile : addProfile}
          initialData={editingProfile}
        />
      )}

      {/* Profile List */}
      {profiles.length === 0 ? (
        <Typography variant="h6">No profiles available.</Typography>
      ) : (
        profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onEdit={() => handleEdit(profile)}
            onDelete={() => deleteProfile(profile.id)}
            showActions={true}  // 🔥 Only Admin Dashboard shows actions
          />
        ))
      )}
    </Container>
  );
}

export default AdminDashboard;
