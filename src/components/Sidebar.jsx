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
    { label: "لوحة القيادة", icon: <LayoutDashboard />, path: "/dashboard" },
    { label: "المنتجات", icon: <Package />, path: "/produits" },
    { label: "الشاحنات", icon: <Truck />, path: "/camions" },
    { label: "البائعين", icon: <User />, path: "/vendeurs" },
    { label: "المبيعات", icon: <ShoppingCart />, path: "/ventes" },
    { label: "المخزون", icon: <Layers />, path: "/stocks" },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white shadow-lg z-20 hidden md:block">
            <div className="text-2xl font-bold px-6 py-4 border-b border-gray-700">
                🛻 كاميون فيزيون
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
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                        className="flex items-center gap-2 px-6 py-3 text-red-400 hover:text-red-500"
                    >
                        <LogOut size={18} />
                        تسجيل الخروج
                    </button>
                </div>
            </nav>
        </aside>
    );
}
