import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import dayjs from "dayjs";
import { onSnapshot } from "firebase/firestore";
import {Sidebar} from "lucide-react";


export default function Ventes() {
    const [ventes, setVentes] = useState([]);

    const fetchVentes = async () => {
        const q = query(collection(db, "ventes"), orderBy("date", "desc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setVentes(list);
    };
    useEffect(() => {
        const q = query(collection(db, "ventes"), orderBy("date", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setVentes(list);
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        fetchVentes();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
    <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📊 Liste des ventes</h2>
            <div className="bg-gray-800 rounded p-4 shadow">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="text-gray-400 border-b border-gray-600">
                        <th className="p-2">Camion</th>
                        <th className="p-2">Produit</th>
                        <th className="p-2">Quantité</th>
                        <th className="p-2">Date</th>
                        <th className="p-2 text-right">#</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ventes.map((vente, index) => (
                        <tr
                            key={vente.id}
                            className="border-t border-gray-700 hover:bg-gray-700/30"
                        >
                            <td className="p-2">{vente.numeroCamion}</td>
                            <td className="p-2">{vente.produit}</td>
                            <td className="p-2">{vente.quantite}</td>
                            <td className="p-2">
                                {dayjs(vente.date?.toDate?.() || vente.date).format(
                                    "DD/MM/YYYY HH:mm"
                                )}
                            </td>
                            <td className="p-2 text-right text-xs text-gray-500">{vente.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {ventes.length === 0 && (
                    <p className="text-gray-400 text-center mt-4">
                        Aucune vente enregistrée.
                    </p>
                )}
            </div>
        </div>
</div>
</>
    );
}
