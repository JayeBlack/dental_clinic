import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Paper,
  Divider,
  Badge,
} from '@mui/material';
import {
  Notifications,
  NotificationsActive,
  Email,
  Sms,
  Schedule,
  Payment,
  Delete,
  Settings,
  Check,
} from '@mui/icons-material';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Patient John Doe has an appointment tomorrow at 10:00 AM',
      type: 'appointment',
      time: '2 hours ago',
      read: false,
    },
    {
      id: 2,
      title: 'Payment Received',
      message: 'Payment of $250 received from Sarah Smith',
      type: 'payment',
      time: '4 hours ago',
      read: true,
    },
    {
      id: 3,
      title: 'New Patient Registration',
      message: 'New patient Mike Johnson has registered',
      type: 'patient',
      time: '1 day ago',
      read: false,
    },
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    paymentAlerts: true,
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Schedule color="primary" />;
      case 'payment':
        return <Payment color="success" />;
      case 'patient':
        return <Notifications color="info" />;
      default:
        return <Notifications />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'primary';
      case 'payment':
        return 'success';
      case 'patient':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Notifications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your practice notifications and alerts
          </Typography>
        </Box>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsActive fontSize="large" />
        </Badge>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Notifications
              </Typography>
              <List>
                {notifications.map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      sx={{
                        backgroundColor: notification.read ? 'transparent' : 'action.hover',
                        borderRadius: 1,
                        mb: 1,
                      }}
                    >
                      <Box sx={{ mr: 2 }}>
                        {getNotificationIcon(notification.type)}
                      </Box>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1">
                              {notification.title}
                            </Typography>
                            <Chip
                              label={notification.type}
                              size="small"
                              color={getNotificationColor(notification.type) as any}
                              variant="outlined"
                            />
                            {!notification.read && (
                              <Chip label="New" size="small" color="error" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {notification.message}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {notification.time}
                            </Typography>
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {!notification.read && (
                            <IconButton
                              size="small"
                              onClick={() => markAsRead(notification.id)}
                              title="Mark as read"
                            >
                              <Check />
                            </IconButton>
                          )}
                          <IconButton
                            size="small"
                            onClick={() => deleteNotification(notification.id)}
                            title="Delete"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Settings />
                Notification Settings
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="SMS Notifications"
                    secondary="Receive notifications via SMS"
                  />
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Appointment Reminders"
                    secondary="Get notified about upcoming appointments"
                  />
                  <Switch
                    checked={settings.appointmentReminders}
                    onChange={(e) => setSettings({ ...settings, appointmentReminders: e.target.checked })}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText
                    primary="Payment Alerts"
                    secondary="Get notified about payments and billing"
                  />
                  <Switch
                    checked={settings.paymentAlerts}
                    onChange={(e) => setSettings({ ...settings, paymentAlerts: e.target.checked })}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="outlined" startIcon={<Email />} fullWidth>
                Send Email Notification
              </Button>
              <Button variant="outlined" startIcon={<Sms />} fullWidth>
                Send SMS Alert
              </Button>
              <Button variant="outlined" startIcon={<Check />} fullWidth>
                Mark All as Read
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationsPage;
