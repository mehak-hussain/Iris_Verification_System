import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box } from '@mui/material';

// Static data for demonstration. Replace with actual data fetch in a real app.
const feedbackResponses = [
  { id: 1, name: 'John Doe', email: 'john@example.com', message: 'Great application!' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', message: 'Needs some improvements.' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', message: 'Very user-friendly and intuitive.' },
];

export default function FeedbackResponsePage() {
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" gutterBottom>
          Feedback Responses
        </Typography>
        <Typography variant="body1">View all feedback responses submitted by users.</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="feedback responses table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbackResponses.map((response) => (
              <TableRow key={response.id}>
                <TableCell component="th" scope="row">
                  {response.id}
                </TableCell>
                <TableCell>{response.name}</TableCell>
                <TableCell>{response.email}</TableCell>
                <TableCell>{response.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
