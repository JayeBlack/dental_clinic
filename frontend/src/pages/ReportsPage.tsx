import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Assessment,
  TrendingUp,
  Download,
  DateRange,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ReportsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('overview');

  // Mock data for charts
  const appointmentData = [
    { month: 'Jan', appointments: 120, revenue: 15000 },
    { month: 'Feb', appointments: 135, revenue: 18000 },
    { month: 'Mar', appointments: 140, revenue: 19500 },
    { month: 'Apr', appointments: 155, revenue: 22000 },
    { month: 'May', appointments: 165, revenue: 24500 },
    { month: 'Jun', appointments: 180, revenue: 27000 },
  ];

  const treatmentData = [
    { name: 'Cleaning', value: 45, color: '#1976d2' },
    { name: 'Fillings', value: 25, color: '#2e7d32' },
    { name: 'Root Canal', value: 15, color: '#ed6c02' },
    { name: 'Extractions', value: 10, color: '#9c27b0' },
    { name: 'Orthodontics', value: 5, color: '#d32f2f' },
  ];

  const patientStats = [
    { label: 'New Patients This Month', value: 45, change: '+12%', trend: 'up' },
    { label: 'Returning Patients', value: 120, change: '+8%', trend: 'up' },
    { label: 'Cancelled Appointments', value: 12, change: '-5%', trend: 'down' },
    { label: 'No-Shows', value: 8, change: '-15%', trend: 'down' },
  ];

  const recentReports = [
    { name: 'Monthly Revenue Report', date: '2024-01-01', type: 'Financial' },
    { name: 'Patient Demographics', date: '2023-12-28', type: 'Patients' },
    { name: 'Treatment Analysis', date: '2023-12-25', type: 'Clinical' },
    { name: 'Appointment Trends', date: '2023-12-20', type: 'Operations' },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track your practice performance and insights
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Download />}>
          Export Reports
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ gridColumn: 'span 1' }}>
            <FormControl fullWidth>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: 'span 1' }}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={reportType}
                label="Report Type"
                onChange={(e) => setReportType(e.target.value)}
              >
                <MenuItem value="overview">Overview</MenuItem>
                <MenuItem value="financial">Financial</MenuItem>
                <MenuItem value="patients">Patients</MenuItem>
                <MenuItem value="appointments">Appointments</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ gridColumn: 'span 1' }}>
            <Button variant="outlined" startIcon={<DateRange />} fullWidth>
              Custom Date Range
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
        {/* Revenue & Appointments Chart */}
        <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Assessment />
                Revenue & Appointments Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="appointments" stroke="#1976d2" strokeWidth={2} name="Appointments" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#2e7d32" strokeWidth={2} name="Revenue ($)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
        {/* Treatment Types Distribution */}
        <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Treatment Types Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={treatmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {treatmentData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {treatmentData.map((entry) => (
                  <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ width: 16, height: 16, backgroundColor: entry.color, borderRadius: '50%', mr: 1 }} />
                    <Typography variant="body2">{entry.name}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Typography variant="h6" gutterBottom>
        Key Metrics
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2, mb: 3 }}>
        {patientStats.map((stat) => (
          <Box key={stat.label} sx={{ gridColumn: 'span 1' }}>
            <Card>
              <CardContent>
                <Typography variant="h4" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUp 
                    color={stat.trend === 'up' ? 'success' : 'error'} 
                    fontSize="small" 
                  />
                  <Typography 
                    variant="body2" 
                    color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                    sx={{ ml: 0.5 }}
                  >
                    {stat.change}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Recent Reports */}
      <Box sx={{ gridColumn: '1 / -1', mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Reports
            </Typography>
            <List>
              {recentReports.map((report) => (
                <ListItem
                  key={report.name}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1">
                          {report.name}
                        </Typography>
                        <Chip
                          label={report.type}
                          size="small"
                          color="primary"
                        />
                      </Box>
                    }
                    secondary={report.date}
                  />
                  <Button variant="outlined" size="small" startIcon={<Download />}>
                    Download
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ReportsPage;
