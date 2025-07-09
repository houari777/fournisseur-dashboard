import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import {Sidebar} from "lucide-react";


export default function Camions() {
    const [camions, setCamions] = useState([]);

    useEffect(() => {
        const fetchCamions = async () => {
            const q = query(collection(db, "users"), where("role", "==", "camion"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCamions(data);
        };

        fetchCamions();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🚛 Liste des camions</h2>
            <div className="bg-gray-800 rounded-lg shadow p-4">
                <table className="w-full text-left">
                    <thead>
                    <tr className="text-gray-400">
                        <th className="p-2">#</th>
                        <th className="p-2">Numéro de camion</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Connecté</th>
                        <th className="p-2">UID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {camions.map((camion, index) => (
                        <tr key={camion.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2 font-medium">{camion.numeroCamion}</td>
                            <td className="p-2">{camion.email}</td>
                            <td className="p-2">
                                {camion.connected ? (
                                    <span className="text-green-400 font-semibold">🟢 Oui</span>
                                ) : (
                                    <span className="text-red-400 font-semibold">🔴 Non</span>
                                )}
                            </td>
                            <td className="p-2 text-xs">{camion.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {camions.length === 0 && (
                    <div className="text-gray-400 text-sm text-center mt-6">
                        Aucun camion trouvé.
                    </div>
                )}
            </div>
        </div>
            </div>
        </>
    );
}
