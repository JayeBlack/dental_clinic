import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { theme } from './theme/theme';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFound from "./pages/NotFound";
import BillingPage from './pages/BillingPage';
import NotificationsPage from './pages/NotificationsPage';
import PatientProfilePage from './pages/PatientProfilePage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsPage from './pages/PatientsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            {/* Patients */}
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse']}>
                <DashboardLayout>
                  <PatientsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Patient Profile */}
            <Route path="/patients/:id" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse']}>
                <DashboardLayout>
                  <PatientProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Appointments */}
            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                <DashboardLayout>
                  <AppointmentsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Billing */}
            <Route path="/billing" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <BillingPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Notifications */}
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                <DashboardLayout>
                  <NotificationsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Reports */}
            <Route path="/reports" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                <DashboardLayout>
                  <ReportsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            {/* Settings */}
            <Route path="/settings" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                <DashboardLayout>
                  <SettingsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
