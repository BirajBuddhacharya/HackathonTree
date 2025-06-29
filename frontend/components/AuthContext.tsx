'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";

// Axios instance for API requests
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a User type. You cafxpand this as needed.
export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as needed
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<User>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Optionally, load user from localStorage or API here
    // For now, just set to null
    setUser(null);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // Optionally, persist user to localStorage or cookie
  };

  const logout = () => {
    setUser(null);
    // Optionally, remove user from localStorage or cookie
  };

  // Register function using axios instance
  const register = async (payload: RegisterPayload): Promise<User> => {
    try {
      const apiBaseUrl = "http://26.185.61.251:8000";

      const response = await axios.post(`${apiBaseUrl}/auth/v1/user/auth/register`, payload);
      // Assuming the API returns the created user object
      const registeredUser: User = response.data.user || response.data;
      setUser(registeredUser);
      // Optionally, persist user to localStorage or cookie
      return registeredUser;
    } catch (error) {
      // Optionally, handle error more gracefully
      throw error;
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;