import React, { createContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { apiService } from "../services/api";

// Definimos el tipo de dato que compartirá nuestro contexto.
// Será un array con el token (string o null) y la función para actualizarlo.
type UserContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
];

// Creamos el contexto con un valor inicial por defecto.
// El valor inicial es un array con `null` (sin token) y una función vacía.
export const UserContext = createContext<UserContextType>([null, () => {}]);

// Creamos el componente "Proveedor" que envolverá nuestra aplicación.
export const UserProvider = ({ children }: PropsWithChildren) => {
  // Creamos el estado para el token.
  // Su valor inicial se intenta cargar desde localStorage para mantener la sesión.
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("leadsManagerToken")
  );

  // Este efecto se ejecuta cada vez que el valor del 'token' cambia.
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // El interceptor se encarga de leer el token desde localStorage.
          // Como ahora guardamos el token en `useAuth` antes de llegar aquí,
          // la validación usará el token correcto.
          await apiService.getCurrentUser();
          // Ya no es necesario guardar el token aquí.
        } catch (error) {
          setToken(null);
        }
      }
    };
    fetchUser();
  }, [token]);

  // Este efecto secundario se encarga de limpiar localStorage si el token se elimina.
  useEffect(() => {
    if (token === null) {
      localStorage.removeItem("leadsManagerToken");
    }
  }, [token]);

  // El proveedor comparte el valor actual del token y la función para poder cambiarlo.
  return (
    <UserContext.Provider value={[token, setToken]}>
      {children}
    </UserContext.Provider>
  );
}; 