import React, { useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './application/store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme/theme';
import AppRouter from './application/routes/AppRouter';
import { useAppDispatch } from './application/hooks/useAppSelector';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './persistence/api/firebase';
import { loginSuccess, logoutSuccess, setLoading } from './application/store/slices/authSlice';

// Componente para escuchar cambios de autenticación de Firebase
const AuthListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(loginSuccess({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          status: ''
        }));
      } else {
        dispatch(logoutSuccess());
      }
      dispatch(setLoading(false));
    });
    return unsubscribe;
  }, [dispatch]);
  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <AuthListener>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </AuthListener>
    </Provider>
  );
}

export default App;
