import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from 'react';

import authService from '../services/authService';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  loading: true,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {

  switch (action.type) {

    case 'INIT':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        loading: false,
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        error: action.payload,
        isAuthenticated: false,
        loading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
        loading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {

  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {

    const token = localStorage.getItem('token');

    const user = localStorage.getItem('user');

    dispatch({
      type: 'INIT',
      payload: {
        token,
        user: user ? JSON.parse(user) : null,
      },
    });

  }, []);

  // LOGIN
  const login = async (email, password) => {

    try {

      dispatch({
        type: 'CLEAR_ERROR',
      });

      const response = await authService.login(
        email,
        password
      );

      const { token, user } = response;

      localStorage.setItem('token', token);

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user,
        },
      });

      return {
        success: true,
      };

    } catch (error) {

      const errorMessage =
        error.response?.data?.message ||
        'Login failed';

      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // REGISTER
  const register = async (
    email,
    password,
    name
  ) => {

    try {

      dispatch({
        type: 'CLEAR_ERROR',
      });

      const response = await authService.register(
        email,
        password,
        name
      );

      const { token, user } = response;

      localStorage.setItem('token', token);

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          token,
          user,
        },
      });

      return {
        success: true,
      };

    } catch (error) {

      const errorMessage =
        error.response?.data?.message ||
        'Registration failed';

      dispatch({
        type: 'LOGIN_FAILURE',
        payload: errorMessage,
      });

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // LOGOUT
  const logout = () => {

    authService.logout();

    dispatch({
      type: 'LOGOUT',
    });
  };

  const clearError = () => {

    dispatch({
      type: 'CLEAR_ERROR',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within AuthProvider'
    );
  }

  return context;
};