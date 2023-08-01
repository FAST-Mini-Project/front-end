import { useState, useEffect } from 'react';

export const useUserToken = () => {
  const [token, setToken] = useState<string>(
    JSON.parse(window.localStorage.getItem('token') || 'null')
  );

  useEffect(() => {
    window.localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  return [token, setToken];
};

export const useUserRole = () => {
  const [role, setRole] = useState<string>(
    JSON.parse(window.localStorage.getItem('role') || 'null')
  );

  useEffect(() => {
    window.localStorage.setItem('role', JSON.stringify(role));
    console.log("하이")
  }, [role]);

  return [role, setRole];
};
