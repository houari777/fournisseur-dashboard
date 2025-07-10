import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { RtlProvider } from "./context/RtlContext";
import ToastContainer from "./components/ToastContainer";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Produits from "./Pages/Produits";
import Camions from "./Pages/Camions";
import Vendeurs from "./Pages/Vendeurs";
import Ventes from "./Pages/Ventes";
import StockCamions from "./Pages/StockCamions";
import AjouterCamion from "./Pages/AjouterCamion";
import Rapports from "./Pages/Rapports";
import Layout from "./components/Layout";

// Wrapper pour les routes protégées avec mise en page
const ProtectedRoute = ({ children }) => (
  <PrivateRoute>
    <Layout>{children}</Layout>
  </PrivateRoute>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/produits" element={
        <ProtectedRoute><Produits /></ProtectedRoute>
      } />
      <Route path="/camions" element={
        <ProtectedRoute><Camions /></ProtectedRoute>
      } />
      <Route path="/vendeurs" element={
        <ProtectedRoute><Vendeurs /></ProtectedRoute>
      } />
      <Route path="/ventes" element={
        <ProtectedRoute><Ventes /></ProtectedRoute>
      } />
      <Route path="/stocks" element={
        <ProtectedRoute><StockCamions /></ProtectedRoute>
      } />
      <Route path="/ajouter-camion" element={
        <ProtectedRoute><AjouterCamion /></ProtectedRoute>
      } />
      <Route path="/rapports" element={
        <ProtectedRoute><Rapports /></ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <RtlProvider>
        <ThemeProvider>
          <AppRoutes />
          <ToastContainer />
        </ThemeProvider>
      </RtlProvider>
    </Router>
  );
}

export default App;
