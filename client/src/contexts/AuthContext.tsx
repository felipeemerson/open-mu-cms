import { createContext, ReactNode, useEffect, useState } from 'react';

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
  const token = localStorage.getItem('token');

  if (token) {
    return { state: AuthStateEnum.SIGNED_IN, token };
  } else {
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
