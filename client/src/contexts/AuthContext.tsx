import { createContext, ReactNode, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const enum AuthStateEnum {
  SIGNED_IN,
  SIGNED_OUT,
  UNKNOWN,
}

type AuthState = {
  state: AuthStateEnum;
  token?: string;
};

type Auth = {
  auth: AuthState;
  signIn: (token: string) => void;
  signOut: () => void;
};

const getAuth = (): AuthState => {
  const currentTime = Math.floor(Date.now() / 1000);
  const token = localStorage.getItem('token');
  const expiration = (token && jwtDecode(token).exp) || 0;
  const isExpiredToken = expiration < currentTime;

  if (token && !isExpiredToken) {
    return { state: AuthStateEnum.SIGNED_IN, token };
  } else {
    localStorage.removeItem('token');
    return { state: AuthStateEnum.UNKNOWN };
  }
};

const INITIAL_AUTH_STATE: AuthState = getAuth();

const INITIAL_CONTEXT_STATE: Auth = {
  auth: getAuth(),
  signIn: () => {},
  signOut: () => {},
};

export const AuthContext = createContext<Auth>(INITIAL_CONTEXT_STATE);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(INITIAL_AUTH_STATE);

  const signIn = (token: string) => {
    localStorage.setItem('token', token);
    setAuth({ state: AuthStateEnum.SIGNED_IN, token });
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setAuth({ state: AuthStateEnum.SIGNED_OUT });
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
