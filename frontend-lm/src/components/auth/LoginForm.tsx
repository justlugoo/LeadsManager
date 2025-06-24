import React, { useState } from 'react';
import { Input } from 'components/ui/Input';
import { Button } from 'components/ui/Button';
import { Alert } from 'components/ui/Alert';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { useLoginLogic } from 'pages/auth/Login';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface LoginFormProps {
  onToggle: () => void;
  isVisible?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onToggle, isVisible = true }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error, setError } = useLoginLogic();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    await handleLogin(email, password);
  };

  if (!isVisible) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8 w-full">
      <div
        className="group relative flex items-center justify-center gap-3 w-full mb-6 p-4 cursor-pointer select-none
          bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl
          hover:bg-white/20 hover:border-primary-start/30 hover:shadow-xl hover:shadow-primary-start/20
          transition-all duration-300 ease-out hover:-translate-y-1"
        onClick={onToggle}
        tabIndex={0}
        role="button"
        title="Cambiar a registro"
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-start/5 to-primary-end/5 
          opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
        <h2 className="relative z-10 text-2xl font-bold text-gray-800 group-hover:text-gray-900 
          tracking-tight transition-colors duration-200 text-center w-full">
          Iniciar sesión
        </h2>
        <div className="relative z-10 p-2 rounded-xl bg-gradient-to-br from-primary-start/20 to-primary-end/20
          group-hover:from-primary-start/30 group-hover:to-primary-end/30 transition-colors duration-200">
          <ArrowRightIcon
            className="w-5 h-5 text-primary-start group-hover:text-white transition-all duration-200 
              group-hover:translate-x-1 group-hover:rotate-12"
          />
        </div>
      </div>
      <Input
        label="Email"
        type="email"
        placeholder="Introduce tu email"
        value={email}
        onChange={setEmail}
        required
        className="w-full"
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="Introduce tu contraseña"
        value={password}
        onChange={setPassword}
        required
        className="w-full"
      />
      {error && <Alert type="error">{error}</Alert>}
      <Button type="submit" variant="primary" className="w-full" loading={loading}>
        {loading ? <LoadingSpinner size="sm" /> : 'Iniciar Sesión'}
      </Button>
      <div className="text-center mt-4 w-full">
        <span className="text-light-300">¿No tienes cuenta?</span>{' '}
        <button type="button" className="text-primary-start font-semibold hover:underline" onClick={onToggle}>
          Regístrate
        </button>
      </div>
    </form>
  );
}; 