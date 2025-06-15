
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
            
            {/* Placeholder routes for future implementation */}
            <Route path="/patients" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse']}>
                <DashboardLayout>
                  <div>Patients page - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/appointments" element={
              <ProtectedRoute allowedRoles={['admin', 'doctor', 'nurse', 'receptionist']}>
                <DashboardLayout>
                  <div>Appointments page - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/billing" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <div>Billing page - Coming soon</div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
            
            <Route path="/notifications" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardLayout>
                  <div>Notifications page - Coming soon</div>
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
