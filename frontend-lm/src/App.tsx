import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from 'components/layout/MainLayout';
import { AuthLayout } from 'components/layout/AuthLayout';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { navigationItems } from 'config/navigation';
import { routes } from 'routes';
import { Register } from 'pages/auth/Register';
import { Login } from 'pages/auth/Login';
import LayoutDemo from 'components/layout/LayoutDemo';
// Dummy pages
// const Login = () => (
//   <AuthLayout title="Iniciar Sesión">
//     <div className="text-light-100">Login Page (formulario aquí)</div>
//   </AuthLayout>
// );
const Dashboard = () => <div className="text-light-100">Dashboard Page</div>;
const Leads = () => <div className="text-light-100">Leads List Page</div>;
const LeadDetail = () => <div className="text-light-100">Lead Detail Page</div>;
const Profile = () => <div className="text-light-100">Profile Page</div>;

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
                <Leads />
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