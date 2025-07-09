import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Sidebar onLogout={handleLogout} />
            <Topbar user={user} />
            <main className="ml-64 mt-16 p-6 text-white">
                <h2 className="text-2xl font-bold mb-4">Bienvenue, {user?.email}</h2>
                <p>Statistiques générales ici (à venir...)</p>
            </main>
        </div>
    );
}
