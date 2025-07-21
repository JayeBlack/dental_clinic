
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LocalHospital,
  Schedule,
  People,
  Payment,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <LocalHospital fontSize="large" />,
      title: 'Expert Dental Care',
      description: 'Professional dental services with modern equipment and experienced staff',
    },
    {
      icon: <Schedule fontSize="large" />,
      title: 'Easy Scheduling',
      description: 'Book appointments online with our convenient scheduling system',
    },
    {
      icon: <People fontSize="large" />,
      title: 'Patient Management',
      description: 'Comprehensive patient records and treatment history tracking',
    },
    {
      icon: <Payment fontSize="large" />,
      title: 'Insurance Support',
      description: 'We work with most insurance providers for your convenience',
    },
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: 'primary.main' }}>
        <Toolbar>
          <LocalHospital sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            DentalCare Pro
          </Typography>
          <Button component={Link} to="/login" color="primary" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/signup" variant="contained" color="primary">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant={isMobile ? 'h3' : 'h2'}
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Modern Dental Care Management
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Streamline your dental practice with our comprehensive management system.
                Better care, better experience, better outcomes.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: 'white',
                    color: 'primary.main',
                    '&:hover': { backgroundColor: 'grey.100' },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
                    py: 1.5,
                    px: 4,
                  }}
                >
                  Login Here
                </Button>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <LocalHospital sx={{ fontSize: { xs: 200, md: 300 }, opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
          Why Choose DentalCare Pro?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 6 }}>
            Contact Us
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Phone sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body1" color="text.secondary">
                (555) 123-4567
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" color="text.secondary">
                contact@dentalcarepro.com
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
              <LocationOn sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1" color="text.secondary">
                123 Dental Street<br />
                Healthcare City, HC 12345
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocalHospital />
                <Typography variant="h6" component="div">
                  DentalCare Pro
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                Modern dental practice management for better patient care.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: isMobile ? 'left' : 'right' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                © 2025 DentalCare Pro. All rights reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
