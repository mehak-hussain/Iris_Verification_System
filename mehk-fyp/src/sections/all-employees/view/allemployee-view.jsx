import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Avatar,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../utils/token-util";

export default function AllEmployeePageView() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const token = getToken();
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/admin/getEmployees",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setEmployees(data.employee);
      } else {
        throw new Error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectEmployee = (event, employeeId) => {
    if (event.target.checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenDeleteDialog(false);
    const token = getToken();
    try {
      await Promise.all(
        selectedEmployees.map((employeeId) =>
          fetch(
            `http://localhost:5000/api/v1/admin/delEmployee/${employeeId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: token,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => console.log(data))
        )
      );
      setEmployees(
        employees.filter((employee) => !selectedEmployees.includes(employee.id))
      );
      setSelectedEmployees([]);
    } catch (error) {
      console.error("Error deleting employees:", error);
    }
  };

  const handleView = () => {
    navigate(`/employee-profile`, { state: { selectedEmployees } });
  };

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Employee Details
        </Typography>
        <Typography variant="body1">View all employee details</Typography>
      </Box>
      {selectedEmployees.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleView}>
            View
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            sx={{ ml: 2 }}
          >
            Delete
          </Button>
        </Box>
      )}
      <TableContainer component={Paper}>
        <Table aria-label="employee details table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedEmployees.length > 0 &&
                    selectedEmployees.length < employees.length
                  }
                  checked={
                    employees.length > 0 &&
                    selectedEmployees.length === employees.length
                  }
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelectedEmployees(
                        employees.map((employee) => employee.id)
                      );
                    } else {
                      setSelectedEmployees([]);
                    }
                  }}
                />
              </TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow
                  key={employee.id}
                  selected={selectedEmployees.includes(employee.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={(event) =>
                        handleSelectEmployee(event, employee.id)
                      }
                    />
                  </TableCell>
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
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the selected employees? This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
