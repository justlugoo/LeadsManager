import { useAuth } from "hooks/useAuth";
import { useState } from "react";

// Exporta solo la lógica de login para ser usada en LoginForm
export const useLoginLogic = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };
  return { handleLogin, loading, error, setError };
}; 