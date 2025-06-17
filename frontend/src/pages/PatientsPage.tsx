import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Add,
  MoreVert,
  Visibility,
  Edit,
  Phone,
  Schedule,
  FilterList,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PatientsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [addPatientOpen, setAddPatientOpen] = useState(false);

  const patients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1985-06-15',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-02-15',
      status: 'active',
      treatmentPlan: 'Dental Cleaning',
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1990-03-22',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-02-20',
      status: 'active',
      treatmentPlan: 'Root Canal Treatment',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      dateOfBirth: '1978-11-08',
      lastVisit: '2023-12-20',
      nextAppointment: null,
      status: 'inactive',
      treatmentPlan: 'Routine Checkup',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 456-7890',
      dateOfBirth: '1995-09-12',
      lastVisit: '2024-01-18',
      nextAppointment: '2024-02-10',
      status: 'active',
      treatmentPlan: 'Dental Implant',
    },
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, patientId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleViewProfile = () => {
    if (selectedPatient) {
      navigate(`/patients/${selectedPatient}`);
    }
    handleMenuClose();
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'success' : 'default';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const patientStats = [
    { title: 'Total Patients', value: '1,234', change: '+45 this month' },
    { title: 'Active Patients', value: '856', change: '+12 this week' },
    { title: 'New Patients', value: '23', change: 'This month' },
    { title: 'Appointments Today', value: '18', change: '3 pending' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Patients
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage patient records and information
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setAddPatientOpen(true)}
        >
          Add New Patient
        </Button>
      </Box>

      {/* Patient Statistics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {patientStats.map((stat) => (
          <Box key={stat.title} sx={{ gridColumn: 'span 1' }}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1 }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Last Visit</TableCell>
                <TableCell>Next Appointment</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Treatment Plan</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{getInitials(patient.name)}</Avatar>
                      <Typography variant="subtitle2">{patient.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{patient.email}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {patient.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{patient.dateOfBirth}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>
                    {patient.nextAppointment ? (
                      patient.nextAppointment
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No appointment
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={patient.status}
                      color={getStatusColor(patient.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{patient.treatmentPlan}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" onClick={() => navigate(`/patients/${patient.id}`)}>
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Schedule />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, patient.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewProfile}>
          <Visibility sx={{ mr: 1 }} />
          View Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1 }} />
          Edit Patient
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Schedule sx={{ mr: 1 }} />
          Schedule Appointment
        </MenuItem>
      </Menu>

      {/* Add Patient Dialog */}
      <Dialog open={addPatientOpen} onClose={() => setAddPatientOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Patient registration form will be implemented here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddPatientOpen(false)}>Cancel</Button>
          <Button variant="contained">Add Patient</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PatientsPage;
