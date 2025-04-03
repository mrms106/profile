import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import ProfileForm from "../components/ProfileForm";
import ProfileCard from "../components/ProfileCard";
import { Container, Button, Typography } from "@mui/material";
import "./home.css"; // ✅ Uses homepage styles

function AdminDashboard() {
  const { profiles, addProfile, updateProfile, deleteProfile } = useContext(ProfileContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  return (
    <section className="main_container">
      <Typography variant="h3" className="username" style={{ textAlign: "center", marginBottom: "2rem" }}>
        🛠️ Admin Dashboard
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowForm(!showForm);
          setEditingProfile(null);
        }}
        style={{ fontSize: "1.6rem", padding: "1rem 2rem", marginBottom: "2rem" }}
      >
        {showForm ? "Hide Form" : "➕ Add Profile"}
      </Button>

      {/* Profile Form */}
      {showForm && (
        <ProfileForm
          onSubmit={editingProfile ? updateProfile : addProfile}
          initialData={editingProfile}
        />
      )}

      {/* Profile List */}
      <div className="main_container">
        {profiles.length === 0 ? (
          <Typography variant="h5" className="empty-msg">No profiles available.</Typography>
        ) : (
          profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onEdit={() => handleEdit(profile)}
              onDelete={() => deleteProfile(profile.id)}
              showActions={true} // ✅ Admin Dashboard shows edit/delete actions
            />
          ))
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
