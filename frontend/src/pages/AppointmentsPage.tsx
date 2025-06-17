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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Avatar,
  Fab,
} from '@mui/material';
import {
  Schedule,
  Add,
  Edit,
  Delete,
  Person,
  AccessTime,
  CalendarToday,
  Phone,
  Email,
} from '@mui/icons-material';

interface Appointment {
  id: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  doctor: string;
  notes?: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      patientName: 'John Doe',
      patientPhone: '(555) 123-4567',
      patientEmail: 'john@email.com',
      date: '2024-01-15',
      time: '09:00',
      duration: 60,
      type: 'Cleaning',
      status: 'confirmed',
      doctor: 'Dr. Smith',
      notes: 'Regular checkup and cleaning',
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      patientPhone: '(555) 987-6543',
      patientEmail: 'sarah@email.com',
      date: '2024-01-15',
      time: '10:30',
      duration: 90,
      type: 'Root Canal',
      status: 'scheduled',
      doctor: 'Dr. Brown',
      notes: 'Follow-up for previous treatment',
    },
    {
      id: 3,
      patientName: 'Mike Wilson',
      patientPhone: '(555) 456-7890',
      patientEmail: 'mike@email.com',
      date: '2024-01-15',
      time: '14:00',
      duration: 45,
      type: 'Consultation',
      status: 'completed',
      doctor: 'Dr. Smith',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2024-01-15');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'completed':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'scheduled':
        return <Schedule />;
      case 'completed':
        return <Schedule />;
      case 'cancelled':
        return <Delete />;
      default:
        return <Schedule />;
    }
  };

  const filteredAppointments = appointments.filter(apt => apt.date === selectedDate);

  const handleAddAppointment = () => {
    setOpenDialog(true);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Appointments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your practice appointments and scheduling
          </Typography>
        </Box>
        <Fab color="primary" aria-label="add appointment" onClick={handleAddAppointment}>
          <Add />
        </Fab>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' }, gap: 3 }}>
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Date Selection
              </Typography>
              <TextField
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {filteredAppointments.length} appointments for this day
              </Typography>
            </CardContent>
          </Card>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Chip
                label={`${appointments.filter(a => a.status === 'scheduled').length} Scheduled`}
                color="warning"
                size="small"
              />
              <Chip
                label={`${appointments.filter(a => a.status === 'confirmed').length} Confirmed`}
                color="success"
                size="small"
              />
              <Chip
                label={`${appointments.filter(a => a.status === 'completed').length} Completed`}
                color="info"
                size="small"
              />
            </Box>
          </Paper>
        </Box>

        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday />
                Appointments for {selectedDate}
              </Typography>
              
              <List>
                {filteredAppointments.map((appointment) => (
                  <ListItem
                    key={appointment.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2,
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      <Person />
                    </Avatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                          <Typography variant="h6">
                            {appointment.patientName}
                          </Typography>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status) as any}
                            size="small"
                            icon={getStatusIcon(appointment.status)}
                          />
                          <Chip
                            label={appointment.type}
                            variant="outlined"
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTime fontSize="small" />
                              <Typography variant="body2">
                                {appointment.time} ({appointment.duration} min)
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              with {appointment.doctor}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Phone fontSize="small" />
                              <Typography variant="body2">
                                {appointment.patientPhone}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Email fontSize="small" />
                              <Typography variant="body2">
                                {appointment.patientEmail}
                              </Typography>
                            </Box>
                          </Box>
                          {appointment.notes && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              Notes: {appointment.notes}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" title="Edit">
                          <Edit />
                        </IconButton>
                        <IconButton size="small" title="Cancel" color="error">
                          <Delete />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
                
                {filteredAppointments.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No appointments scheduled for this date
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      sx={{ mt: 2 }}
                      onClick={handleAddAppointment}
                    >
                      Schedule New Appointment
                    </Button>
                  </Box>
                )}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Add Appointment Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule New Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 1 }}>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Patient Name"
                variant="outlined"
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <FormControl fullWidth>
                <InputLabel>Appointment Type</InputLabel>
                <Select label="Appointment Type">
                  <MenuItem value="cleaning">Cleaning</MenuItem>
                  <MenuItem value="consultation">Consultation</MenuItem>
                  <MenuItem value="filling">Filling</MenuItem>
                  <MenuItem value="root-canal">Root Canal</MenuItem>
                  <MenuItem value="extraction">Extraction</MenuItem>
                  <MenuItem value="orthodontics">Orthodontics</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                variant="outlined"
                defaultValue={60}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <FormControl fullWidth>
                <InputLabel>Doctor</InputLabel>
                <Select label="Doctor">
                  <MenuItem value="dr-smith">Dr. Smith</MenuItem>
                  <MenuItem value="dr-brown">Dr. Brown</MenuItem>
                  <MenuItem value="dr-johnson">Dr. Johnson</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: 'span 1' }}>
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={3}
                variant="outlined"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Schedule Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AppointmentsPage;
