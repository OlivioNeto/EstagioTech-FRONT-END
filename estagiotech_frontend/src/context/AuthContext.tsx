import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
  } from "react";
  
  interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    status: string | null;
  }
  
  interface AuthContextProps {
    authState: AuthState;
    logout: () => void;
    setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
  }
  
  const AuthContext = createContext<AuthContextProps | undefined>(undefined);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>({
      isAuthenticated: false,
      token: null,
      status: null,
    });
  
    useEffect(() => {
      const auth = localStorage.getItem("authToken");
      if (auth) {
        setAuthState({
          isAuthenticated: true,
          token: auth,
          status: localStorage.getItem("authStatus"),
        });
      }
    }, []);
  
    const logout = () => {};
  
    return (
      <AuthContext.Provider value={{ authState, setAuthState, logout }}>
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