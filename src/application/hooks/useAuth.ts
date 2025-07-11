
import { useAppSelector } from '../hooks/useAppSelector';

export const useAuth = () => {
  const { isAuthenticated, user, loading, error } = useAppSelector((state) => state.auth);
  return { isAuthenticated, user, loading, error };
};
