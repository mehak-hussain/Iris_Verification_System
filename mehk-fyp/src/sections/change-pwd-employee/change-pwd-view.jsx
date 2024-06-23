import React, { useState } from 'react';
import '../change-pwd-employee/'; // Assuming you will create CSS file for styling

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Logic to send reset link to email
    setResetLinkSent(true);
    // Assume the backend handles sending an email with a reset link
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Logic to reset the password
    setPasswordReset(true);
    // Assume the backend handles password reset
  };

  return (
    <div className="reset-password-container">
      {!resetLinkSent ? (
        <form className="reset-password-form" onSubmit={handleEmailSubmit}>
          <h2>Change Password</h2>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" >Send Reset Link</button>
        </form>
      ) : (
        !passwordReset ? (
          <form className="new-password-form" onSubmit={handlePasswordSubmit}>
            <h2>Set New Password</h2>
            <div className="form-group">
              <label>New Password:</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" variant="contained" color="primary">Reset Password</Button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Password has been reset successfully!</h2>
          </div>
        )
      )}
    </div>
  );
};

export default ResetPassword;
