import { Toaster } from 'react-hot-toast';
import { toastConfig } from './config/toastConfig';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <Toaster {...toastConfig} />
      <AuthProvider>
        {/* Resto de tu aplicación */}
      </AuthProvider>
    </>
  );
}