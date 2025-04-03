import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const { profiles } = useContext(ProfileContext);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  // Filter profiles based on search input (name or address)
  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    profile.address.toLowerCase().includes(searchTerm.toLowerCase()) // Address search
  );

  return (
    <>
      <section>
        {/* Search Input */}
        <div className="search-input">
          <form id="form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              id="user"
              placeholder="Search by name or address"
              autoComplete="off"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            />
            <button type="submit">Search</button>
          </form>
        </div>

        {/* Profiles Display */}
        <div className="main_container">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <div className="card" key={profile.id}>
                <img src={profile.photo} alt="profile-photo" />
                <hr />
                <div className="card-footer">
                  <span>Name: &nbsp;{profile.name}</span>
                  <span>📍 {profile.location.address}</span> <br />
                  <button onClick={() => navigate(`/profile/${profile.id}`)}>Summary</button>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h6" style={{ textAlign: "center", marginTop: "20px" }}>
              No profiles found.
            </Typography>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
