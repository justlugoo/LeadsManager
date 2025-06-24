import { useAuth } from "hooks/useAuth";
import { useState } from "react";

// Exporta solo la lógica de registro para ser usada en RegisterForm
export const useRegisterLogic = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string) => {
    setError('');
    setLoading(true);
    const result = await register({ email, password });
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
    return result;
  };
  return { handleRegister, loading, error, setError };
}; 