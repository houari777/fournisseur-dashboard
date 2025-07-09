import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Produits from "./Pages/Produits";
import Camions from "./Pages/Camions";
import Vendeurs from "./Pages/Vendeurs";
import PrivateRoute from "./components/PrivateRoute";
import Ventes from "./Pages/Ventes";
import StockCamions from "./Pages/StockCamions";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={
                    <PrivateRoute><Dashboard /></PrivateRoute>
                } />
                <Route path="/produits" element={
                    <PrivateRoute><Produits /></PrivateRoute>
                } />
                <Route path="/camions" element={
                    <PrivateRoute><Camions /></PrivateRoute>
                } />
                <Route path="/vendeurs" element={
                    <PrivateRoute><Vendeurs /></PrivateRoute>
                } />
                <Route path="/ventes" element={
                    <PrivateRoute><Ventes /></PrivateRoute>
                } />
                <Route path="/stocks" element={
                    <PrivateRoute><StockCamions /></PrivateRoute> // ✅ ici
                } />
            </Routes>
        </Router>
    );
}
