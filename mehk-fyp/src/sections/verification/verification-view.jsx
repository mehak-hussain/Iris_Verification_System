import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const VerificationPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Choose an image for verification.
          </DialogContentText>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
              Upload
            </Button>
          </label>
          {selectedImage && (
            <div style={{ marginTop: '20px' }}>
              <img src={selectedImage} alt="Selected" style={{ width: '100%', maxHeight: '300px' }} />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Here you can handle the verification process
              console.log('Verification process started with image:', selectedImage);
              handleClose();
            }}
            color="primary"
            disabled={!selectedImage}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VerificationPage;
