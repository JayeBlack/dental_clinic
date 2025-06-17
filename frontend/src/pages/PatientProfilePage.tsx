import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tab,
  Tabs,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Phone,
  Email,
  LocationOn,
  CalendarToday,
  Person,
  LocalHospital,
  Receipt,
  Schedule,
  Medication,
  Warning,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const PatientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

  // Mock patient data - in real app, fetch based on ID
  const patient = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    address: '123 Main St, City, State 12345',
    emergencyContact: 'Jane Doe - (555) 987-6543',
    registrationDate: '2023-01-15',
    status: 'active',
    insurance: 'Blue Cross Blue Shield',
    policyNumber: 'BC123456789',
  };

  const appointments = [
    {
      id: 1,
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Routine Checkup',
      doctor: 'Dr. Smith',
      status: 'scheduled',
    },
    {
      id: 2,
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'Dental Cleaning',
      doctor: 'Dr. Johnson',
      status: 'completed',
    },
    {
      id: 3,
      date: '2023-12-10',
      time: '11:30 AM',
      type: 'Consultation',
      doctor: 'Dr. Smith',
      status: 'completed',
    },
  ];

  const treatments = [
    {
      id: 1,
      date: '2024-01-15',
      treatment: 'Dental Cleaning',
      doctor: 'Dr. Johnson',
      notes: 'Regular cleaning completed. Good oral hygiene.',
      cost: 150,
    },
    {
      id: 2,
      date: '2023-12-10',
      treatment: 'Initial Consultation',
      doctor: 'Dr. Smith',
      notes: 'Initial examination. Recommended regular cleanings.',
      cost: 75,
    },
  ];

  const medications = [
    {
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      prescribed: '2024-01-15',
      duration: '7 days',
    },
  ];

  const allergies = ['Penicillin', 'Latex'];

  const medicalConditions = ['Hypertension', 'Diabetes Type 2'];

  const invoices = [
    {
      id: 'INV-001',
      date: '2024-01-15',
      amount: 150,
      status: 'paid',
      description: 'Dental Cleaning',
    },
    {
      id: 'INV-002',
      date: '2023-12-10',
      amount: 75,
      status: 'paid',
      description: 'Initial Consultation',
    },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'primary';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/patients')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Patient Profile
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete patient information and medical history
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Edit />}>
          Edit Profile
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Patient Info Card */}
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ width: 80, height: 80, mb: 2, fontSize: '2rem' }}>
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {patient.name}
                </Typography>
                <Chip
                  label={patient.status}
                  color={getStatusColor(patient.status) as any}
                  size="small"
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={patient.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={patient.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date of Birth"
                    secondary={patient.dateOfBirth}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary="Gender"
                    secondary={patient.gender}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={patient.address}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Emergency Contact
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.emergencyContact}
              </Typography>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Insurance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {patient.insurance}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Policy: {patient.policyNumber}
              </Typography>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button variant="outlined" startIcon={<Schedule />} fullWidth>
                  Schedule Appointment
                </Button>
                <Button variant="outlined" startIcon={<Receipt />} fullWidth>
                  Create Invoice
                </Button>
                <Button variant="outlined" startIcon={<Phone />} fullWidth>
                  Call Patient
                </Button>
                <Button variant="outlined" startIcon={<Email />} fullWidth>
                  Send Email
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Main Content */}
        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Appointments" />
                <Tab label="Treatment History" />
                <Tab label="Medical Info" />
                <Tab label="Billing" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Appointment History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Doctor</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {appointments.map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>{appointment.date}</TableCell>
                        <TableCell>{appointment.time}</TableCell>
                        <TableCell>{appointment.type}</TableCell>
                        <TableCell>{appointment.doctor}</TableCell>
                        <TableCell>
                          <Chip
                            label={appointment.status}
                            color={getStatusColor(appointment.status) as any}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Treatment History
              </Typography>
              {treatments.map((treatment) => (
                <Paper key={treatment.id} sx={{ p: 3, mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {treatment.treatment}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {treatment.date} • {treatment.doctor}
                      </Typography>
                    </Box>
                    <Typography variant="h6" color="primary">
                      ${treatment.cost}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {treatment.notes}
                  </Typography>
                </Paper>
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                <Box sx={{ gridColumn: 'span 1' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning color="error" />
                    Allergies
                  </Typography>
                  <Paper sx={{ p: 2, mb: 3 }}>
                    {allergies.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {allergies.map((allergy) => (
                          <Chip key={allergy} label={allergy} color="error" variant="outlined" />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No known allergies
                      </Typography>
                    )}
                  </Paper>

                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocalHospital />
                    Medical Conditions
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    {medicalConditions.length > 0 ? (
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {medicalConditions.map((condition) => (
                          <Chip key={condition} label={condition} color="warning" variant="outlined" />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No medical conditions
                      </Typography>
                    )}
                  </Paper>
                </Box>

                <Box sx={{ gridColumn: 'span 1' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Medication />
                    Current Medications
                  </Typography>
                  <Paper sx={{ p: 2 }}>
                    {medications.length > 0 ? (
                      medications.map((medication) => (
                        <Box key={medication.name + medication.dosage} sx={{ mb: 2 }}>
                          <Typography variant="subtitle2">
                            {medication.name} {medication.dosage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {medication.frequency}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No current medications
                      </Typography>
                    )}
                  </Paper>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                Billing History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Invoice ID</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.description}</TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>
                          <Chip
                            label={invoice.status}
                            color={getStatusColor(invoice.status) as any}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default PatientProfilePage;
