import { RouterProvider } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { router } from './routes';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <AuthProvider>
      <CategoriesProvider>
        <RouterProvider router={router} />
        <Toaster />
      </CategoriesProvider>
    </AuthProvider>
  );
}
