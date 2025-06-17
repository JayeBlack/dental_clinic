import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  TextField,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Payment,
  Receipt,
  Download,
  Send,
  TrendingUp,
  AttachMoney,
  Schedule,
  People,
  Visibility,
  Edit,
} from '@mui/icons-material';

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
      id={`billing-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const BillingPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeFilter, setTimeFilter] = useState('month');

  const revenueStats = [
    { title: 'Monthly Revenue', value: '$45,678', change: '+12%', icon: <AttachMoney />, color: '#2e7d32' },
    { title: 'Pending Payments', value: '$8,950', change: '-5%', icon: <Schedule />, color: '#ed6c02' },
    { title: 'Completed Treatments', value: '156', change: '+8%', icon: <People />, color: '#1976d2' },
    { title: 'Collection Rate', value: '94%', change: '+3%', icon: <TrendingUp />, color: '#9c27b0' },
  ];

  const invoices = [
    {
      id: 'INV-001',
      patient: 'John Doe',
      treatment: 'Dental Cleaning',
      amount: 150,
      status: 'paid',
      date: '2024-01-15',
      dueDate: '2024-01-30',
    },
    {
      id: 'INV-002',
      patient: 'Sarah Smith',
      treatment: 'Root Canal',
      amount: 800,
      status: 'pending',
      date: '2024-01-14',
      dueDate: '2024-01-29',
    },
    {
      id: 'INV-003',
      patient: 'Mike Johnson',
      treatment: 'Tooth Extraction',
      amount: 250,
      status: 'overdue',
      date: '2024-01-10',
      dueDate: '2024-01-25',
    },
    {
      id: 'INV-004',
      patient: 'Emily Davis',
      treatment: 'Dental Implant',
      amount: 1200,
      status: 'paid',
      date: '2024-01-12',
      dueDate: '2024-01-27',
    },
  ];

  const payments = [
    {
      id: 'PAY-001',
      patient: 'John Doe',
      amount: 150,
      method: 'Credit Card',
      date: '2024-01-16',
      status: 'completed',
    },
    {
      id: 'PAY-002',
      patient: 'Emily Davis',
      amount: 1200,
      method: 'Bank Transfer',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: 'PAY-003',
      patient: 'Sarah Smith',
      amount: 400,
      method: 'Cash',
      date: '2024-01-14',
      status: 'pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'overdue':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Billing & Payments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage invoices, payments, and financial reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            size="small"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </TextField>
          <Button variant="contained" startIcon={<Download />}>
            Export Report
          </Button>
        </Box>
      </Box>

      {/* Revenue Statistics */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {revenueStats.map((stat, index) => (
          <Box key={stat.title} sx={{ gridColumn: 'span 1' }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color={stat.change.startsWith('+') ? 'success.main' : 'error.main'}>
                      {stat.change} from last period
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Tabs for different sections */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Invoices" />
            <Tab label="Payments" />
            <Tab label="Reports" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 3 }}>
            <Typography variant="h6">Recent Invoices</Typography>
            <Button variant="contained" startIcon={<Receipt />}>
              Create Invoice
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice ID</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Treatment</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>{invoice.id}</TableCell>
                    <TableCell>{invoice.patient}</TableCell>
                    <TableCell>{invoice.treatment}</TableCell>
                    <TableCell>${invoice.amount}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        color={getStatusColor(invoice.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small">
                        <Edit />
                      </IconButton>
                      <IconButton size="small">
                        <Send />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 3 }}>
            <Typography variant="h6">Payment History</Typography>
            <Button variant="contained" startIcon={<Payment />}>
              Record Payment
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Patient</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Method</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.patient}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Chip
                        label={payment.status}
                        color={getStatusColor(payment.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Receipt />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Financial Reports
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Generate detailed financial reports for your practice
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <Box sx={{ gridColumn: 'span 1' }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Revenue Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Monthly revenue breakdown and trends
                  </Typography>
                  <Button variant="outlined" startIcon={<Download />} fullWidth>
                    Generate Revenue Report
                  </Button>
                </Paper>
              </Box>
              <Box sx={{ gridColumn: 'span 1' }}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Outstanding Invoices
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    List of pending and overdue payments
                  </Typography>
                  <Button variant="outlined" startIcon={<Download />} fullWidth>
                    Generate Outstanding Report
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default BillingPage;
