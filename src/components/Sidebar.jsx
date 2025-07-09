// src/Components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Truck,
    Package,
    User,
    ShoppingCart,
    Layers,
    LogOut,
} from "lucide-react";

const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "Produits", icon: <Package size={18} />, path: "/produits" },
    { label: "Camions", icon: <Truck size={18} />, path: "/camions" },
    { label: "Vendeurs", icon: <User size={18} />, path: "/vendeurs" },
    { label: "Ventes", icon: <ShoppingCart size={18} />, path: "/ventes" },
    { label: "Stock", icon: <Layers size={18} />, path: "/stocks" },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg">
            <div className="text-2xl font-bold px-6 py-4 border-b border-gray-700">
                🛻 Camion Vision
            </div>
            <nav className="mt-4 flex flex-col gap-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-700 transition ${
                            location.pathname === item.path ? "bg-gray-800" : ""
                        }`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Link>
                ))}

                <div className="mt-auto">
                    <button
                        onClick={() => {
                            localStorage.clear(); // ou auth.signOut() selon ton cas
                            window.location.href = "/";
                        }}
                        className="flex items-center gap-2 px-6 py-3 text-red-400 hover:text-red-500"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </nav>
        </aside>
    );
}
