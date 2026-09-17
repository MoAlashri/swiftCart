import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function init() {
  try {
    const saved = localStorage.getItem('authUser');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to parse auth user from localStorage', error);
    return null;
  }
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const login = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      });

      if (!res.ok) {
        throw new Error(res.status === 400 ? 'Invalid username or password' : 'Login failed');
      }

      const data = await res.json();
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        accessToken: data.accessToken,
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  
  const register = async ({ firstName, lastName, email, username, password }) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!firstName || !username || !password || !email) {
        throw new Error('Please fill in all required fields');
      }

      
      await new Promise((resolve) => setTimeout(resolve, 600));

      const fakeUser = {
        id: Date.now(),
        username,
        email,
        firstName,
        lastName,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}${lastName}`,
        accessToken: null, 
      };

      setUser(fakeUser);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };