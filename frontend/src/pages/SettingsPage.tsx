import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  List,
  ListItem,
  ListItemText,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Person,
  Security,
  Notifications,
  Language,
  Save,
  PhotoCamera,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone_number || '',
    role: user?.role || '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
    darkMode: false,
    language: 'en',
    timezone: 'EST',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saveMessage, setSaveMessage] = useState('');

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean | string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    // Mock save functionality
    setSaveMessage('Profile updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSavePreferences = () => {
    // Mock save functionality
    setSaveMessage('Preferences updated successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleChangePassword = () => {
    // Mock password change functionality
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSaveMessage('Passwords do not match!');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    setSaveMessage('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Manage your profile and preferences
      </Typography>

      {saveMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {saveMessage}
        </Alert>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {/* Profile Information */}
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person />
                Profile Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2 }}>
                  {user?.first_name?.[0]}{user?.last_name?.[0]}
                </Avatar>
                <Button variant="outlined" startIcon={<PhotoCamera />}>
                  Change Photo
                </Button>
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={profileData.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  variant="outlined"
                  sx={{ gridColumn: 'span 1' }}
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={profileData.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  variant="outlined"
                  sx={{ gridColumn: 'span 1' }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  variant="outlined"
                  sx={{ gridColumn: '1 / -1' }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  variant="outlined"
                  sx={{ gridColumn: '1 / -1' }}
                />
                <TextField
                  fullWidth
                  label="Role"
                  value={profileData.role}
                  variant="outlined"
                  disabled
                  sx={{ gridColumn: '1 / -1' }}
                />
              </Box>

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSaveProfile}
                sx={{ mt: 2 }}
              >
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Security Settings */}
        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Security />
                Security Settings
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  variant="outlined"
                />
              </Box>

              <Button
                variant="contained"
                color="warning"
                onClick={handleChangePassword}
                sx={{ mt: 2 }}
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Notification Preferences & Application Settings */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
        {/* Notification Preferences */}
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Notifications />
                Notification Preferences
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <Switch
                    checked={preferences.emailNotifications}
                    onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive notifications via SMS"
                  />
                  <Switch
                    checked={preferences.smsNotifications}
                    onChange={(e) => handlePreferenceChange('smsNotifications', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Appointment Reminders"
                    secondary="Get reminded about upcoming appointments"
                  />
                  <Switch
                    checked={preferences.appointmentReminders}
                    onChange={(e) => handlePreferenceChange('appointmentReminders', e.target.checked)}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Marketing Emails"
                    secondary="Receive promotional content"
                  />
                  <Switch
                    checked={preferences.marketingEmails}
                    onChange={(e) => handlePreferenceChange('marketingEmails', e.target.checked)}
                  />
                </ListItem>
              </List>

              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSavePreferences}
                sx={{ mt: 2 }}
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Application Settings */}
        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Language />
                Application Settings
              </Typography>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={preferences.language}
                    label="Language"
                    onChange={(e) => handlePreferenceChange('language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={preferences.timezone}
                    label="Timezone"
                    onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                  >
                    <MenuItem value="EST">EST</MenuItem>
                    <MenuItem value="CST">CST</MenuItem>
                    <MenuItem value="MST">MST</MenuItem>
                    <MenuItem value="PST">PST</MenuItem>
                  </Select>
                </FormControl>
                <ListItem>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Enable dark theme for the application"
                  />
                  <Switch
                    checked={preferences.darkMode}
                    onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                  />
                </ListItem>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
