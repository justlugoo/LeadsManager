import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from 'components/layout/MainLayout';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { navigationItems } from 'config/navigation';
import { routes } from 'routes';
import LayoutDemo from 'components/layout/LayoutDemo';
import { LeadsList } from 'pages/leads/LeadsList';
import { LeadForm } from 'pages/leads/LeadForm';
import { LeadDetail } from 'pages/leads/LeadDetail';
import { Profile } from 'pages/profile';
import { Dashboard } from 'pages/dashboard/Dashboard';
import { AuthCard } from 'components/auth/AuthCard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/auth" element={<AuthCard />} />
        <Route path={routes.auth.login} element={<Navigate to="/auth" replace />} />
        <Route path={routes.auth.register} element={<Navigate to="/auth" replace />} />
        {/* Rutas protegidas */}
        <Route
          path={routes.app.dashboard}
          element={
            <ProtectedRoute>
              <MainLayout navigation={navigationItems}>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.app.leads}
          element={
            <ProtectedRoute>
              <MainLayout navigation={navigationItems}>
                <LeadsList />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.app.leadDetail()}
          element={
            <ProtectedRoute>
              <MainLayout navigation={navigationItems}>
                <LeadDetail />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.app.leadForm}
          element={
            <ProtectedRoute>
              <MainLayout navigation={navigationItems}>
                <LeadForm />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.app.profile}
          element={
            <ProtectedRoute>
              <MainLayout navigation={navigationItems}>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* Demo de layouts */}
        <Route path="/layout-demo" element={<LayoutDemo />} />
        {/* Redirecciones */}
        <Route path="/" element={<Navigate to={routes.app.dashboard} replace />} />
        <Route path="*" element={<Navigate to={routes.app.dashboard} replace />} />
      </Routes>
    </Router>
  );
}

export default App;