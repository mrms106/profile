import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ProfileCard({ profile, onEdit, onDelete, showActions = false }) {
  const navigate = useNavigate();

  return (
    <Card style={{ marginBottom: "10px", padding: "10px" }}>
      <CardContent>
        <Typography variant="h6">{profile.name}</Typography>
        <Typography variant="body2">{profile.description}</Typography>
        <Typography variant="body2">📍 {profile.address}</Typography>
        <Typography variant="body2">📧 {profile.contact}</Typography>

        {/* Summary Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate(`/profile/${profile.id}`)}
          style={{ marginTop: "10px" }}
        >
          Summary
        </Button>

        {/* Edit/Delete Buttons (Only in Admin Dashboard) */}
        {showActions && (
          <>
            <Button variant="contained" color="secondary" onClick={onEdit} style={{ marginLeft: "10px" }}>
              Edit
            </Button>
            <Button variant="contained" color="error" onClick={onDelete} style={{ marginLeft: "10px" }}>
              Delete
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
