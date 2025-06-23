import React, { createContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { apiService } from "../services/api";
import type { User } from "types";

// El contexto ahora compartirá el usuario y el token
export interface UserContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  token: null,
  setToken: () => {},
  user: null,
  setUser: () => {},
});

// Creamos el componente "Proveedor" que envolverá nuestra aplicación.
export const UserProvider = ({ children }: PropsWithChildren) => {
  // Creamos el estado para el token.
  // Su valor inicial se intenta cargar desde localStorage para mantener la sesión.
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("leadsManagerToken")
  );
  const [user, setUser] = useState<User | null>(null);

  // Este efecto se ejecuta cada vez que el valor del 'token' cambia.
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await apiService.getCurrentUser();
          setUser(res.data);
        } catch (error) {
          setToken(null);
          setUser(null);
        }
      } else {
        setUser(null);
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
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}; 