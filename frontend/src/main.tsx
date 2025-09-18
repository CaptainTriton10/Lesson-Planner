import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Today from './pages/Today.tsx';
import { Toaster } from './components/ui/sonner.tsx';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/today', element: <Today /> },
  { path: '/', element: <Navigate to={'/home'} /> },
]);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark">
    <RouterProvider router={router} />
    <Toaster position="bottom-center" />
  </ThemeProvider>,
);
