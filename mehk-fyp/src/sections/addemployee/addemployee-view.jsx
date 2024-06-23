import React, { useState } from "react";
import {
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getToken } from "../../utils/token-util";

export default function AddEmployeeView() {
  // State variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");
  const [address, setAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState(null);
  const [image, setImage] = useState(null);

  // State variables for validation errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [religionError, setReligionError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [dobError, setDobError] = useState("");
  const [imageError, setImageError] = useState("");

  // Validation functions
  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = () => {
    const phoneRegex = /^92\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Phone number must start with '92' followed by 10 digits");
    } else {
      setPhoneError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateGender = () => {
    if (!gender.trim()) {
      setGenderError("Gender is required");
    } else {
      setGenderError("");
    }
  };

  const validateNationality = () => {
    if (!nationality.trim()) {
      setNationalityError("Nationality is required");
    } else {
      setNationalityError("");
    }
  };

  const validateReligion = () => {
    if (!religion.trim()) {
      setReligionError("Religion is required");
    } else {
      setReligionError("");
    }
  };

  const validateAddress = () => {
    if (!address.trim()) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };

  const validateCnic = () => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicRegex.test(cnic)) {
      setCnicError("Invalid CNIC number");
    } else {
      setCnicError("");
    }
  };

  const validateDob = () => {
    if (!dob) {
      setDobError("Date of Birth is required");
    } else {
      setDobError("");
    }
  };

  const validateImage = () => {
    if (!image) {
      setImageError("Image is required");
    } else if (!image.type.startsWith("image/")) {
      setImageError("Invalid image format");
    } else if (image.size > 2 * 1024 * 1024) {
      setImageError("Image size must be less than 2MB");
    } else {
      setImageError("");
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation for each field
    validateFirstName();
    validateLastName();
    validateEmail();
    validatePhone();
    validatePassword();
    validateGender();
    validateNationality();
    validateReligion();
    validateAddress();
    validateCnic();
    validateDob();
    validateImage();

    // If there are no errors, proceed with form submission
    if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !phoneError &&
      !passwordError &&
      !genderError &&
      !nationalityError &&
      !religionError &&
      !addressError &&
      !cnicError &&
      !dobError &&
      !imageError
    ) {
      addEmployee();
      console.log("Form submitted successfully");
    }
  };

  const addEmployee = () => {
    const token = getToken();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("nationality", nationality);
    formData.append("religion", religion);
    formData.append("address", address);
    formData.append("cnic", cnic);
    formData.append("dob", dob);
    if (image) {
      formData.append("image", image);
    }

    fetch("http://localhost:5000/api/v1/admin/createEmployee", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clearForm();
      })
      .catch((error) => console.error("Error:", error));
  };

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setGender("");
    setNationality("");
    setReligion("");
    setAddress("");
    setCnic("");
    setDob(null);
    setImage(null);
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Add Employee</Typography>
      </Stack>
      <Stack direction="column" mb={5}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">First Name</Typography>
              <TextField
                fullWidth
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={validateFirstName}
                error={!!firstNameError}
                helperText={firstNameError}
                id="first-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Last Name</Typography>
              <TextField
                fullWidth
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={validateLastName}
                error={!!lastNameError}
                helperText={lastNameError}
                id="last-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email</Typography>
              <TextField
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
                error={!!emailError}
                helperText={emailError}
                id="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone</Typography>
              <TextField
                fullWidth
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={validatePhone}
                error={!!phoneError}
                helperText={phoneError}
                id="phone"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Password</Typography>
              <TextField
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
                error={!!passwordError}
                helperText={passwordError}
                id="password"
                type="password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Gender</Typography>
              <TextField
                fullWidth
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={validateGender}
                error={!!genderError}
                helperText={genderError}
                id="gender"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Nationality</Typography>
              <TextField
                fullWidth
                required
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                onBlur={validateNationality}
                error={!!nationalityError}
                helperText={nationalityError}
                id="nationality"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Religion</Typography>
              <TextField
                fullWidth
                required
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                onBlur={validateReligion}
                error={!!religionError}
                helperText={religionError}
                id="religion"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Address</Typography>
              <TextField
                fullWidth
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={validateAddress}
                error={!!addressError}
                helperText={addressError}
                id="address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">CNIC No.</Typography>
              <TextField
                fullWidth
                required
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                onBlur={validateCnic}
                error={!!cnicError}
                helperText={cnicError}
                id="cnic"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Date of Birth</Typography>
              <Box sx={{ my: 2 }}>
                <DatePicker
                  value={dob}
                  onChange={(date) => setDob(date)}
                  onBlur={validateDob}
                  error={!!dobError}
                />
              </Box>
              {dobError && (
                <Typography variant="body2" color="error">
                  {dobError}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Add Employee Image</Typography>
              <TextField
                fullWidth
                required
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                onBlur={validateImage}
                error={!!imageError}
                helperText={imageError}
                id="image"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Send Email
          </Button>
        </form>
      </Stack>
    </Container>
  );
}
