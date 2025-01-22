// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/auth/AuthContext';
import { StoreProvider } from './context/store/StoreContext';

// Pages
import LoginPage from './pages/auth/LoginPage';
import StorePage from './pages/store/StorePage';
import DashboardPage from './pages/admin/DashboardPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Configuración de toast
import { toastConfig } from './config/toastConfig';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <StoreProvider>
                    {/* Configuración global de notificaciones */}
                    <Toaster {...toastConfig} />
                    
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/login" element={<LoginPage />} />
                        
                        {/* Rutas protegidas para clientes */}
                        <Route 
                            path="/store/*" 
                            element={
                                <ProtectedRoute allowedRoles={['CUSTOMER']}>
                                    <Layout>
                                        <StorePage />
                                    </Layout>
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Rutas protegidas para administración */}
                        <Route 
                            path="/dashboard/*" 
                            element={
                                <ProtectedRoute allowedRoles={['SUPER_ADMIN', 'ADMIN', 'STAFF']}>
                                    <Layout>
                                        <DashboardPage />
                                    </Layout>
                                </ProtectedRoute>
                            } 
                        />
                        
                        {/* Redirección por defecto */}
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Routes>
                </StoreProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;