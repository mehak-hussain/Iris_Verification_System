import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validateName = (name) => {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).length;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};
    if (!name) {
      formErrors.name = 'Name is required';
    } else if (!validateName(name)) {
      formErrors.name = 'Name can only contain letters and spaces';
    }

    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Invalid email format';
    }

    if (!message) {
      formErrors.message = 'Message is required';
    } else if (getWordCount(message) < 10) {
      formErrors.message = 'Message must be at least 10 words long';
    }

    if (Object.keys(formErrors).length === 0) {
      console.log({ name, email, message });
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <Container>
        <Card 
        sx={{
          p: 5,
          borderRadius: 2,
          boxShadow: 0,
        }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h2">Feedback</Typography>
            <Typography variant="body1">Submit your feedback for the desktop application use</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Name</Typography>
            <TextField
              fullWidth
              required
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              sx={{ my: 1 }} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Email</Typography>
            <TextField
              fullWidth
              required
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ my: 1 }} 
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Message</Typography>
            <Textarea
              minRows={10}
              maxRows={20}
              aria-label="Message"
              placeholder="Your feedback"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ width: '100%', my: 1, '& > textarea': { width: '100%' } }}
            />
            {errors.message && <Typography variant="body2" color="error">{errors.message}</Typography>}
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      </Container>
    </>
  );
}
