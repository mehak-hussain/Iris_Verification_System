import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from '@mui/material';

const VerificationPage = () => {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchImages();
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImages([]);
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT'); // Replace with your API endpoint
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageSelect = (image) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(image)) {
        return prevSelectedImages.filter((img) => img !== image);
      } else {
        return [...prevSelectedImages, image];
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Steps to follow:</h1>
      <p>If you have not registered, then register your account first.</p>
      <p>Already registered, then start verification process.</p>
      <p>Make sure you have opened the camera for scanning your eyes.</p>
      <p>Don't forget to give feedback about your experience.</p>
      <p>If you are facing any issue, then contact us.</p>
      <p>Already registered, then click here for verification process.</p>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Start Verification Process
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Select Images</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose images for verification from the library.
          </DialogContentText>
          <Grid container spacing={2}>
            {images.map((image) => (
              <Grid item xs={4} key={image.id}>
                <img
                  src={image.url}
                  alt={image.name}
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                    border: selectedImages.includes(image) ? '2px solid blue' : '2px solid transparent'
                  }}
                  onClick={() => handleImageSelect(image)}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Here you can handle the verification process
              console.log('Verification process started with images:', selectedImages);
              handleClose();
            }}
            color="primary"
            disabled={selectedImages.length === 0}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerificationPage;
