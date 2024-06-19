import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Box,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getToken } from "../../utils/token-util";

const ProfileCard = () => {
  const [cnic, setCnic] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState({});
  const [hasChanges, setHasChanges] = useState(false);
  const token = getToken();

  const handleSearch = () => {
    fetch(`http://localhost:5000/api/v1/employee/person/cnic/${cnic}`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data.person);
        setError("");
      })
      .catch((error) => {
        console.error("Error:", error);

        setProfile(null);
        setError("No profile found with this CNIC");
      });
  };
  // Dummy data for testing
  // const dummyProfileData = {
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   email: 'john.doe@example.com',
  //   phone: '921234567890',
  //   gender: 'Male',
  //   nationality: 'Pakistani',
  //   religion: 'Islam',
  //   address: '123 Main St, Karachi, Pakistan',
  //   cnic: '12345-1234567-1',
  //   dob: '1990-01-01',
  //   image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
  //   irisImage: 'https://bootdey.com/img/Content/avatar/avatar1.png', // Replace with URL to a dummy iris image if needed
  //   verificationCount: 5,
  // };
  // const handleSearch = () => {
  //   if (cnic === "12345-1234567-1") {
  //     setProfile(dummyProfileData);
  //     setError("");
  //   } else {
  //     setProfile(null);
  //     setError("No profile found with this CNIC");
  //   }
  // };

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
    setHasChanges(true);
  };

  const handleInputChange = (e, field) => {
    setProfile((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    // Save changes logic here
    setHasChanges(false);
    setIsEditing({});
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search Profile by CNIC
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="CNIC Number"
              variant="outlined"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>

      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {profile && (
        <Grid container spacing={5} sx={{ mt: 6 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <Box
                sx={{ textAlign: "center", p: 7 }}
                style={{ marginBottom: "50px" }}
              >
                <Avatar
                  alt="Iris Image"
                  src={profile.irisImage}
                  sx={{ width: 100, height: 100, margin: "0 auto" }}
                />
                <Typography variant="h5" sx={{ mt: 2 }}>
                  {profile.firstName} {profile.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.cnic}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.address}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  DOB: {new Date(profile.dob).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  +{profile.phone}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {profile.nationality}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card style={{ paddingTop: "30px", paddingBottom: "30px" }}>
              <CardContent>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      variant="outlined"
                      value={`${profile.firstName} ${profile.lastName}`}
                      InputProps={{
                        readOnly: !isEditing.fullName,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleEditToggle("fullName")}
                            >
                              <Edit />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, "fullName")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      value={profile.email}
                      InputProps={{
                        readOnly: !isEditing.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleEditToggle("email")}
                            >
                              <Edit />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, "email")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      variant="outlined"
                      value={profile.phone}
                      InputProps={{
                        readOnly: !isEditing.phone,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleEditToggle("phone")}
                            >
                              <Edit />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, "phone")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Nationality"
                      variant="outlined"
                      value={profile.nationality}
                      InputProps={{
                        readOnly: !isEditing.nationality,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleEditToggle("nationality")}
                            >
                              <Edit />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, "nationality")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      variant="outlined"
                      value={profile.address}
                      InputProps={{
                        readOnly: !isEditing.address,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleEditToggle("address")}
                            >
                              <Edit />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => handleInputChange(e, "address")}
                    />
                  </Grid>
                </Grid>
                {hasChanges && (
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProfileCard;
