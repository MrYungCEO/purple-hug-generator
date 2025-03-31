
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  username: string;
  apiKey: string | null;
  createdAt: Date;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateApiKey: (apiKey: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database for demonstration
const USERS_STORAGE_KEY = "logoai_users";
const CURRENT_USER_KEY = "logoai_current_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      const foundUser = users.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error("User not found");
      }
      
      // In a real app, you'd compare hashed passwords
      // This is just for demonstration
      
      // Set the logged in user
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        username,
        apiKey: null,
        createdAt: new Date(),
      };
      
      // Save user
      saveUsers([...users, newUser]);
      
      // Log in the new user
      setUser(newUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      toast.success("Account created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast.info("Logged out successfully");
  };

  const updateApiKey = (apiKey: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, apiKey };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    // Also update in the users list
    const users = getUsers();
    const updatedUsers = users.map(u => 
      u.id === user.id ? updatedUser : u
    );
    saveUsers(updatedUsers);
    
    toast.success("API key updated successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateApiKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
