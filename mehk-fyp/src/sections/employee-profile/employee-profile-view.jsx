import React, { useState, useEffect } from "react";
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

export default function EmployeeProfilePage() {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    nationality: "",
    religion: "",
    address: "",
    cnic: "",
    dob: null,
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const fetchEmployeeData = () => {
    const token = getToken();

    fetch(`http://localhost:5000/api/v1/employee/getEmployee/`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setEmployee(response.employee);
      })
      .catch((e) => console.log(e));
    // if (!response.ok) throw new Error("Failed to fetch employee data");
    // const data = await response.json();

    // console.error("Error:", error);
  };
  const validate = (field, value) => {
    let error = "";

    switch (field) {
      case "firstName":
      case "lastName":
      case "gender":
      case "nationality":
      case "religion":
      case "address":
        if (!value.trim()) error = `${field} is required`;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email address";
        break;
      case "phone":
        if (!/^92\d{10}$/.test(value))
          error = "Phone number must start with '92' followed by 10 digits";
        break;
      case "password":
        if (value.length < 6)
          error = "Password must be at least 6 characters long";
        break;
      case "cnic":
        if (!/^\d{5}-\d{7}-\d{1}$/.test(value)) error = "Invalid CNIC number";
        break;
      case "dob":
        if (!value) error = "Date of Birth is required";
        break;
      case "image":
        if (
          value &&
          (!value.type.startsWith("image/") || value.size > 2 * 1024 * 1024)
        ) {
          error = "Invalid image format or size > 2MB";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
    return error === "";
  };

  const handleChange = (field) => (e) => {
    const value = field === "image" ? e.target.files[0] : e.target.value;
    setEmployee((prevEmployee) => ({ ...prevEmployee, [field]: value }));
    validate(field, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    Object.keys(employee).forEach((field) => {
      if (!validate(field, employee[field])) isValid = false;
    });
    if (isValid) updateEmployee();
  };

  const updateEmployee = () => {
    const token = getToken();
    const formData = new FormData();
    Object.keys(employee).forEach((key) => {
      if (employee[key] !== null) formData.append(key, employee[key]);
    });

    fetch("http://localhost:5000/api/v1/admin/updateEmployee", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsEditing(false); // Switch back to profile view
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <Container>
      {!isEditing ? (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Employee Profile</Typography>
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">First Name:</Typography>
              <Typography>{employee.firstName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Last Name:</Typography>
              <Typography>{employee.lastName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Email:</Typography>
              <Typography>{employee.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Phone:</Typography>
              <Typography>{employee.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Gender:</Typography>
              <Typography>{employee.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Nationality:</Typography>
              <Typography>{employee.nationality}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Religion:</Typography>
              <Typography>{employee.religion}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Address:</Typography>
              <Typography>{employee.address}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">CNIC No.:</Typography>
              <Typography>{employee.cnic}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Date of Birth:</Typography>
              <Typography>{employee.dob}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Profile Image:</Typography>
              {employee.image && (
                <img
                  src={`http://localhost:5000/images/${employee.image}`}
                  alt="Employee"
                  width="100"
                />
              )}
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Edit Employee Details</Typography>
            <Button variant="contained" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Stack>
          <Stack direction="column" mb={5}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">First Name</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.firstName}
                    onChange={handleChange("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    id="first-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Last Name</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.lastName}
                    onChange={handleChange("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    id="last-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Email</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    id="email"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Phone</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.phone}
                    onChange={handleChange("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    id="phone"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Password</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.password}
                    onChange={handleChange("password")}
                    error={!!errors.password}
                    helperText={errors.password}
                    id="password"
                    type="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Gender</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.gender}
                    onChange={handleChange("gender")}
                    error={!!errors.gender}
                    helperText={errors.gender}
                    id="gender"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Nationality</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.nationality}
                    onChange={handleChange("nationality")}
                    error={!!errors.nationality}
                    helperText={errors.nationality}
                    id="nationality"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Religion</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.religion}
                    onChange={handleChange("religion")}
                    error={!!errors.religion}
                    helperText={errors.religion}
                    id="religion"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Address</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.address}
                    onChange={handleChange("address")}
                    error={!!errors.address}
                    helperText={errors.address}
                    id="address"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">CNIC No.</Typography>
                  <TextField
                    fullWidth
                    required
                    value={employee.cnic}
                    onChange={handleChange("cnic")}
                    error={!!errors.cnic}
                    helperText={errors.cnic}
                    id="cnic"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Date of Birth</Typography>
                  <Box sx={{ my: 2 }}>
                    <DatePicker
                      value={employee.dob}
                      onChange={(date) =>
                        setEmployee((prevEmployee) => ({
                          ...prevEmployee,
                          dob: date,
                        }))
                      }
                      error={!!errors.dob}
                    />
                  </Box>
                  {errors.dob && (
                    <Typography variant="body2" color="error">
                      {errors.dob}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Upload Image</Typography>
                  <Button variant="contained" component="label" sx={{ mt: 1 }}>
                    Upload File
                    <input
                      type="file"
                      hidden
                      onChange={handleChange("image")}
                      accept="image/*"
                    />
                  </Button>
                  {employee.image && (
                    <Box sx={{ mt: 2 }}>
                      <img
                        src={URL.createObjectURL(employee.image)}
                        alt="Employee"
                        width="100"
                      />
                    </Box>
                  )}
                  {errors.image && (
                    <Typography variant="body2" color="error">
                      {errors.image}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Stack>
        </Box>
      )}
    </Container>
  );
}
