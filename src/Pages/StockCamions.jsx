import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {Sidebar} from "lucide-react";


export default function StockCamions() {
    const [stocks, setStocks] = useState([]);

    const fetchStocks = async () => {
        const snap = await getDocs(collection(db, "camions"));
        const result = [];

        snap.docs.forEach((doc) => {
            const data = doc.data();
            const camion = data.numeroCamion;
            const stock = data.stock || {};
            for (const [produit, quantite] of Object.entries(stock)) {
                result.push({ camion, produit, quantite });
            }
        });

        setStocks(result);
    };

    useEffect(() => {
        fetchStocks();
    }, []);

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📦 Stock par camion</h2>

            <div className="bg-gray-800 rounded p-4 shadow">
                <table className="w-full text-left text-sm">
                    <thead>
                    <tr className="text-gray-400 border-b border-gray-600">
                        <th className="p-2">Camion</th>
                        <th className="p-2">Produit</th>
                        <th className="p-2">Quantité</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stocks.map((s, index) => (
                        <tr
                            key={`${s.camion}-${s.produit}-${index}`}
                            className="border-t border-gray-700 hover:bg-gray-700/20"
                        >
                            <td className="p-2">{s.camion}</td>
                            <td className="p-2">{s.produit}</td>
                            <td className="p-2">{s.quantite}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {stocks.length === 0 && (
                    <p className="text-gray-400 text-center mt-4">
                        Aucun stock trouvé.
                    </p>
                )}
            </div>
        </div>
</div>
</>
    );
}
