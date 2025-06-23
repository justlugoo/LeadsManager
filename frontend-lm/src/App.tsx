import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from 'components/layout/MainLayout';
import { AuthLayout } from 'components/layout/AuthLayout';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { navigationItems } from 'config/navigation';
import { routes } from 'routes';
import { Register } from 'pages/auth/Register';
import { Login } from 'pages/auth/Login';
import LayoutDemo from 'components/layout/LayoutDemo';
import { LeadsList } from 'pages/leads/LeadsList';
import { LeadForm } from 'pages/leads/LeadForm';
import { LeadDetail } from 'pages/leads/LeadDetail';
import { Profile } from 'pages/profile';
import { Dashboard } from 'pages/dashboard/Dashboard';
// Dummy pages
// const Login = () => (
//   <AuthLayout title="Iniciar Sesión">
//     <div className="text-light-100">Login Page (formulario aquí)</div>
//   </AuthLayout>
// );

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.register} element={<AuthLayout title="Crear Cuenta"><Register /></AuthLayout>} />
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