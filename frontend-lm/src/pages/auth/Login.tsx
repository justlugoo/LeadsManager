import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import { Input } from "components/ui/Input";
import { Button } from "components/ui/Button";
import { Alert } from "components/ui/Alert";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const result = await login(email, password);
    if (!result.success) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-dark-800 border border-dark-700 rounded-xl p-8 mt-12">
      <h2 className="text-2xl font-bold text-center text-light-100 mb-8">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email"
          type="email"
          placeholder="Introduce tu email"
          value={email}
          onChange={setEmail}
          required
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={setPassword}
          required
        />
        {errorMessage && (
          <Alert type="error">{errorMessage}</Alert>
        )}
        <Button type="submit" variant="primary" className="w-full">
          Iniciar Sesión
        </Button>
      </form>
    </div>
  );
};

export default Login; 