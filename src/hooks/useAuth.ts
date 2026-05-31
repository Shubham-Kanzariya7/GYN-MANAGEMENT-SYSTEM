import { useEffect, useState } from 'react';
import { getAuthUser, isAuthenticated } from '../api/authService';

export function useAuth() {
  const [user, setUser] = useState(() => getAuthUser());
  const [isLoggedIn, setIsLoggedIn] = useState(() => isAuthenticated());

  useEffect(() => {
    setUser(getAuthUser());
    setIsLoggedIn(isAuthenticated());
  }, []);

  return { user, isLoggedIn };
}
