import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
// import { styled } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { getToken } from "../../utils/token-util";

// Static data for demonstration. Replace with actual data fetch in a real app.
// const feedbackResponses = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     message: "Great application!",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     message: "Needs some improvements.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     email: "alice@example.com",
//     message: "Very user-friendly and intuitive.",
//   },
// ];

export default function FeedbackResponsePage() {
  const [feedbacks, setFeedbacks] = useState(null);

  const getFeedbackApi = () => {
    const token = getToken();

    fetch(`http://localhost:5000/api/v1/admin/getAllFeedback`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setFeedbacks(data.feedback);
        } else {
          console.error("Failed to fetch data");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    getFeedbackApi();
  }, []);

  if (!feedbacks) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Feedback Responses
        </Typography>
        <Typography variant="body1">
          View all feedback responses submitted by users.
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feedback responses table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((response) => (
              <TableRow key={response.id}>
                <TableCell component="th" scope="row">
                  {response.id}
                </TableCell>
                <TableCell>{response.email}</TableCell>
                <TableCell>{response.subject}</TableCell>
                <TableCell>{response.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
