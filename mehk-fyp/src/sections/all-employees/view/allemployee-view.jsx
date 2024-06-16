import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Tooltip,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
// import { getToken } from "../../utils/token-util";

// Fetch employees data (replace with your API endpoint)
const fetchEmployees = async () => {
  const token = getToken();
  try {
    const response = await fetch("http://localhost:5000/api/v1/admin/employees", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default function AllEmployeePageView() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    };
    loadEmployees();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (employeeId) => {
    navigate(`/employee-profile/${employeeId}`);
  };

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Employee Details
        </Typography>
        <Typography variant="body1">View all employee details</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="employee details table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Religion</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.nationality}</TableCell>
                <TableCell>{employee.religion}</TableCell>
                <TableCell>{employee.address}</TableCell>
                <TableCell>{employee.cnic}</TableCell>
                <TableCell>{employee.dob}</TableCell>
                <TableCell>
                  {employee.image ? (
                    <Avatar alt={employee.firstName} src={employee.image} />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Edit">
                    <IconButton color="primary" onClick={() => handleEdit(employee.id)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}
