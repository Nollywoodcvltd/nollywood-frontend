import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DashboardProvider } from './context/DashboardContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <DashboardProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <App />
          </Router>
        </QueryClientProvider>
      </DashboardProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
