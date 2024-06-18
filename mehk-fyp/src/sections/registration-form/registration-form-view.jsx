import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
// import { Link } from "react-router-dom";
import { getToken } from "../../utils/token-util";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const RegistrationForm = () => {
  // State variables to hold form data and validation errors
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cnic, setCnic] = useState("");
  const [nationality, setNationality] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [image, setImage] = useState(null);

  // State variables for validation errors
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [dobError, setDobError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [cnicError, setCnicError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [imageError, setImageError] = useState("");

  // Validation functions
  const validateFirstName = () => {
    if (!firstName.trim()) {
      setFirstNameError("First name is required");
      return false;
    } else {
      setFirstNameError("");
      return true;
    }
  };

  const validateLastName = () => {
    if (!lastName.trim()) {
      setLastNameError("Last name is required");
      return false;
    } else {
      setLastNameError("");
      return true;
    }
  };

  const validateEmail = () => {
    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address. Correct format is abc@gmail.com");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validateAddress = () => {
    if (!address.trim()) {
      setAddressError("Address is required");
      return false;
    } else {
      setAddressError("");
      return true;
    }
  };

  const validateDob = () => {
    if (!dob.trim()) {
      setDobError("Date of birth is required");
      return false;
    } else {
      setDobError("");
      return true;
    }
  };

  const validatePhoneNumber = () => {
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
      return false;
    } else if (!/^92\d{10}$/.test(phoneNumber)) {
      setPhoneNumberError("Correct format: 92XXXXXXXXX");
      return false;
    } else {
      setPhoneNumberError("");
      return true;
    }
  };

  const validateCnic = () => {
    // Regular expression for CNIC validation
    const cnicRegex = /^\d{5}-\d{7}-\d$/;

    if (!cnic.trim()) {
      setCnicError("CNIC number is required");
      return false;
    } else if (!cnicRegex.test(cnic)) {
      setCnicError(
        "Invalid CNIC number format. Correct format is XXXXX-XXXXXXX-X"
      );
      return false;
    } else {
      setCnicError("");
      return true;
    }
  };

  const validateNationality = () => {
    if (!nationality.trim()) {
      setNationalityError("Nationality is required");
      return false;
    } else {
      setNationalityError("");
      return true;
    }
  };

  const validateImage = () => {
    if (!image) {
      setImageError("Image is required");
      return false;
    } else if (!image.type.startsWith("image/")) {
      setImageError("Invalid image format. Only images are allowed.");
      return false;
    } else if (image.size > 2 * 1024 * 1024) {
      setImageError("Image size must be less than 2MB");
      return false;
    } else {
      setImageError("");
      return true;
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger validation for each field
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isAddressValid = validateAddress();
    const isDobValid = validateDob();
    const isPhoneNumberValid = validatePhoneNumber();
    const isCnicValid = validateCnic();
    const isNationalityValid = validateNationality();
    const isImageValid = validateImage();

    // If terms are not agreed, set an error message
    if (!termsAgreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // If all validations pass, proceed with form submission
    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isAddressValid &&
      isDobValid &&
      isPhoneNumberValid &&
      isCnicValid &&
      isNationalityValid &&
      isImageValid
    ) {
      register();
      // Submit the form
      console.log("Form submitted successfully");
    }
  };

  const register = () => {
    const token = getToken();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("dob", dob);
    formData.append("phone", phoneNumber);
    formData.append("cnic", cnic);
    formData.append("nationality", nationality);
    formData.append("gender", "male");
    formData.append("religion", "Islam");
    formData.append("iris", "iris");

    if (image) {
      formData.append("image", image);
    }

    console.log(formData);
    console.log(`---http://localhost:5000/api/v1/employee/person/register---`);
    fetch(`http://localhost:5000/api/v1/employee/person/register`, {
      headers: {
        Authorization: token,
      },
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((user) => console.log(user));
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Registration
        </Typography>
      </Stack>
      <Card>
        <Grid container spacing={2} sx={{ backgroundColor: "#F3F1F1" }}>
          {/* Left Side - Image */}
          <Grid item xs={12} sm={6}>
            <div
              style={{
                backgroundImage: 'url("/assets/register.png")',
                backgroundSize: "cover",
                height: "100%",
              }}
            />
          </Grid>

          {/* Right Side - Form */}
          <Grid item xs={12} sm={6} sx={{ my: 4, px: 3 }}>
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <Grid container spacing={2}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      First Name
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Last Name
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Email */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Email
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Address */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Address
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Date of Birth */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Date of Birth
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      onBlur={validateDob}
                      error={!!dobError}
                      helperText={dobError}
                      id="dob"
                    />
                  </Box>
                </Grid>
                {/* Phone Number */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Phone Number
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      onBlur={validatePhoneNumber}
                      error={!!phoneNumberError}
                      helperText={phoneNumberError}
                      id="phone-number"
                    />
                  </Box>
                </Grid>
                {/* CNIC Number */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      CNIC Number
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Nationality */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Nationality
                    </Typography>
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
                  </Box>
                </Grid>
                {/* Add Image */}
                <Grid item xs={12} sm={6}>
                  <Box sx={{ m: 2 }}>
                    <Typography variant="h6" sx={{ m: 1 }}>
                      Add Iris Image
                    </Typography>
                    <TextField
                      fullWidth
                      required
                      type="file"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        validateImage();
                      }}
                      error={!!imageError}
                      helperText={imageError}
                      id="image"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* Terms and Conditions */}
              <Grid container spacing={2} sx={{ my: 1, mx: 1 }}>
                <Checkbox
                  {...label}
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                />
                <Typography variant="h6" sx={{ m: 1 }}>
                  I agree to the terms and conditions
                </Typography>
              </Grid>

              {/* Next Button */}
              <Grid container spacing={2} sx={{ my: 1, mx: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="inherit"
                  sx={{ mt: 5 }}
                >
                  Next
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default RegistrationForm;
