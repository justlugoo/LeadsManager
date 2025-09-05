import React, { useState, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { PageHeader } from 'components/layout/PageHeader';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { Alert } from 'components/ui/Alert';
import { Badge } from 'components/ui/Badge';
import { routes } from 'routes';
import { apiService } from 'services/api';
import {
  UserIcon, 
  EnvelopeIcon, 
  KeyIcon, 
  ShieldCheckIcon,
  DocumentTextIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

interface ProfileForm {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  
  const [form, setForm] = useState<ProfileForm>({
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    lastLogin: new Date().toLocaleDateString()
  });

  useEffect(() => {
    loadUserStats();
  }, []);

  const loadUserStats = async () => {
    try {
      // Simulamos estadísticas del usuario
      const leads = await apiService.get('/leads/');
      const totalLeads = leads.data.length;
      const activeLeads = leads.data.filter((lead: any) => lead.status !== 'won' && lead.status !== 'lost').length;
      const convertedLeads = leads.data.filter((lead: any) => lead.status === 'won').length;
      
      setStats({
        totalLeads,
        activeLeads,
        convertedLeads,
        lastLogin: new Date().toLocaleDateString()
      });
    } catch (err) {
      console.error('Error loading user stats:', err);
    }
  };

  const handleInputChange = (field: keyof ProfileForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Aquí iría la llamada real a la API para actualizar el perfil
      // await apiService.put('/users/me', { email: form.email });
      
      setSuccess('Perfil actualizado correctamente');
      setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (form.newPassword !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (form.newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // Aquí iría la llamada real a la API para cambiar la contraseña
      // await apiService.put('/users/me/password', { 
      //   current_password: form.currentPassword,
      //   new_password: form.newPassword 
      // });
      
      setSuccess('Contraseña actualizada correctamente');
      setForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cambiar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi Perfil"
        subtitle="Gestiona tu cuenta y preferencias"
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Perfil' },
        ]}
      />

      {error && (
        <Alert type="error">{error}</Alert>
      )}

      {success && (
        <Alert type="success">{success}</Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información del Usuario */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary-start bg-opacity-10 rounded-full flex items-center justify-center">
                  <UserIcon className="w-8 h-8 text-primary-start" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-light-100">
                    {user.full_name || user.email}
                  </h2>
                  <p className="text-light-300">Miembro desde {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Estadísticas del Usuario */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-light-100">{stats.totalLeads}</div>
                  <div className="text-sm text-light-300">Total de Leads</div>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-light-100">{stats.activeLeads}</div>
                  <div className="text-sm text-light-300">Leads Activos</div>
                </div>
                <div className="text-center p-4 bg-dark-800 rounded-lg">
                  <div className="text-2xl font-bold text-light-100">{stats.convertedLeads}</div>
                  <div className="text-sm text-light-300">Convertidos</div>
                </div>
              </div>

              {/* Información de la Cuenta */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-light-300" />
                  <div>
                    <p className="text-sm text-light-300">Email</p>
                    <p className="text-light-100 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="w-5 h-5 text-light-300" />
                  <div>
                    <p className="text-sm text-light-300">Estado de la Cuenta</p>
                    <Badge variant="success">Activa</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-light-300" />
                  <div>
                    <p className="text-sm text-light-300">Último Acceso</p>
                    <p className="text-light-100 font-medium">{stats.lastLogin}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs de Configuración */}
          <Card>
            <div className="p-6">
              {/* Navegación de Tabs */}
              <div className="flex border-b border-dark-700 mb-6">
                <button
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'text-primary-start border-b-2 border-primary-start'
                      : 'text-light-300 hover:text-light-100'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  Perfil
                </button>
                <button
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'security'
                      ? 'text-primary-start border-b-2 border-primary-start'
                      : 'text-light-300 hover:text-light-100'
                  }`}
                  onClick={() => setActiveTab('security')}
                >
                  Seguridad
                </button>
                <button
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === 'preferences'
                      ? 'text-primary-start border-b-2 border-primary-start'
                      : 'text-light-300 hover:text-light-100'
                  }`}
                  onClick={() => setActiveTab('preferences')}
                >
                  Preferencias
                </button>
              </div>

              {/* Contenido de los Tabs */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <h3 className="text-lg font-semibold text-light-100 mb-4">Información del Perfil</h3>
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(value) => handleInputChange('email', value)}
                    required
                  />
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" variant="primary" loading={loading}>
                      Actualizar Perfil
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'security' && (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <h3 className="text-lg font-semibold text-light-100 mb-4">Cambiar Contraseña</h3>
                  <Input
                    label="Contraseña Actual"
                    type="password"
                    value={form.currentPassword}
                    onChange={(value) => handleInputChange('currentPassword', value)}
                    required
                  />
                  <Input
                    label="Nueva Contraseña"
                    type="password"
                    value={form.newPassword}
                    onChange={(value) => handleInputChange('newPassword', value)}
                    required
                  />
                  <Input
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    value={form.confirmPassword}
                    onChange={(value) => handleInputChange('confirmPassword', value)}
                    required
                  />
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" variant="primary" loading={loading}>
                      Cambiar Contraseña
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-light-100 mb-4">Preferencias</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                      <div>
                        <p className="font-medium text-light-100">Notificaciones por Email</p>
                        <p className="text-sm text-light-300">Recibe notificaciones sobre nuevos leads</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-start"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-dark-800 rounded-lg">
                      <div>
                        <p className="font-medium text-light-100">Modo Oscuro</p>
                        <p className="text-sm text-light-300">Activar tema oscuro</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-dark-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-start"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Acciones Rápidas */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-4">Acciones</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('mailto:soporte@leadsmanager.com', '_blank')}
                  icon={<EnvelopeIcon className="w-4 h-4" />}
                >
                  Contactar Soporte
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open('/docs', '_blank')}
                  icon={<DocumentTextIcon className="w-4 h-4" />}
                >
                  Documentación
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleLogout}
                  icon={<KeyIcon className="w-4 h-4" />}
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </Card>

          {/* Información del Sistema */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-4">Información del Sistema</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-light-300">ID de Usuario:</span>
                  <span className="text-light-100 font-mono">#{user.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-300">Plan:</span>
                  <Badge variant="primary">Gratuito</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-300">Versión:</span>
                  <span className="text-light-100">1.0.0</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 