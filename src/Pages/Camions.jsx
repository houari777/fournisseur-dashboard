import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../firebase";

export default function Camions() {
    const navigate = useNavigate();
    const [camions, setCamions] = useState([]);

    useEffect(() => {
        const fetchCamions = async () => {
            const snapshot = await getDocs(collection(db, "camions"));
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCamions(data);
        };

        fetchCamions();
    }, []);
    const rechargerStock = async (camionId) => {
        const camionRef = doc(db, "camions", camionId);
        await updateDoc(camionRef, {
            stock: {
                "Huile 5L": 20,
                "Savon": 15,
                "Lait": 10,
            }
        });
        alert("Stock rechargé ✅");
        window.location.reload();
    };

// Modifier le vendeur (prompt simplifié)
    const modifierVendeur = async (camion) => {
        const nouveauNom = prompt("Nouveau nom du vendeur :", camion.vendeur);
        if (!nouveauNom) return;

        await updateDoc(doc(db, "camions", camion.id), {
            vendeur: nouveauNom
        });

        alert("Vendeur modifié ✅");
        window.location.reload();
    };

// Supprimer le camion
    const supprimerCamion = async (camionId) => {
        if (!window.confirm("Supprimer ce camion ?")) return;
        await deleteDoc(doc(db, "camions", camionId));
        alert("Camion supprimé ✅");
        setCamions(camions.filter((c) => c.id !== camionId));
    };
    return (
        <div className="ml-64 mt-16 p-6 text-white">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">🚚 Liste des Camions</h2>
                <button
                    onClick={() => navigate("/ajouter-camion")}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                    ➕ Ajouter Camion
                </button>
            </div>

            <table className="w-full bg-gray-800 rounded shadow text-left">
                <thead className="bg-gray-700 text-white">
                <tr>
                    <th className="p-3">🚛 Camion</th>
                    <th className="p-3">👤 Vendeur</th>
                    <th className="p-3">📦 Stock</th>
                </tr>
                </thead>
                <tbody>
                {camions.map((camion) => (
                    <tr key={camion.id} className="border-t border-gray-700">
                        <td className="p-3">{camion.numero}</td>
                        <td className="p-3">{camion.vendeur}</td>
                        <td className="p-3">
                            {camion.stock
                                ? Object.entries(camion.stock)
                                    .map(([produit, qte]) => `${produit}: ${qte}`)
                                    .join(", ")
                                : "Aucun stock"}
                        </td>
                        <td className="p-3 flex flex-col gap-2">
                            <button onClick={() => rechargerStock(camion.id)} className="bg-blue-600 px-3 py-1 rounded">🔄 Stock</button>
                            <button onClick={() => modifierVendeur(camion)} className="bg-yellow-600 px-3 py-1 rounded">✏️ Vendeur</button>
                            <button onClick={() => supprimerCamion(camion.id)} className="bg-red-600 px-3 py-1 rounded">🗑 Supprimer</button>
                            {camion.localisation ? (
                                <a
                                    href={`https://www.google.com/maps?q=${camion.localisation.lat},${camion.localisation.lng}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-400 underline"
                                >
                                    📍 Localiser
                                </a>
                            ) : (
                                "❌ Pas de GPS"
                            )}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
