import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/users/login", { email, password });
      setUser(response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const registerUser = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/users/register", { email, password });
      setUser(response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

const logoutUser = () => {
    setUser(null);
};

return (
    <UserContext.Provider value={{ user, loginUser, registerUser, logoutUser }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
