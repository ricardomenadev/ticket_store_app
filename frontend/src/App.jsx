// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/auth/AuthContext";
// import { StoreProvider } from "./context/store/StoreContext";

// Pages public
import WelcomePage from './pages/home/Welcome';
import HomePage from './pages/home/Home';
import StorePage from "./pages/store/StorePage";
import CheckoutPage from "./pages/store/CheckoutPage";
// import PurchaseConfirmationPage from "./pages/store/PurchaseConfirmationPage";

 //Zona admin
//  import AdminRoutes from "./components/admin/AdminRoutes";



// Components
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicLayout from "./components/layouts/PublicLayout";

// Configuración de toast
import { toastConfig } from "./config/toastConfig";

function App() {
  return (

    <BrowserRouter>
      {/* Configuración global de notificaciones */}
      <Toaster {...toastConfig} />

      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        {/* Rutas de la Tienda (públicas) */}
        <Route path="/store" element={<PublicLayout />}>
            <Route index element={<StorePage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>

        {/* Rutas Protegidas de Administración */}
        {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
      </Routes>
    </BrowserRouter>
  );

}

export default App;
