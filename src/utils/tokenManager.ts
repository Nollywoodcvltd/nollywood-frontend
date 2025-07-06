import { jwtDecode } from 'jwt-decode';

let logoutTimer: ReturnType<typeof setTimeout> | null = null;

interface JWTPayload {
  exp: number;
}

export const setupAutoLogout = (token: string, onLogout: () => void) => {
  try {
    const decoded: JWTPayload = jwtDecode(token);

    if (!decoded.exp) return;

    const expirationTime = decoded.exp * 1000 - Date.now(); // convert exp to ms

    if (expirationTime <= 0) {
      onLogout(); // Token already expired
    } else {
      logoutTimer = setTimeout(onLogout, expirationTime);
    }
  } catch (error) {
    console.error('Invalid token format:', error);
  }
};

export const clearAutoLogout = () => {
  if (logoutTimer) clearTimeout(logoutTimer);
};
