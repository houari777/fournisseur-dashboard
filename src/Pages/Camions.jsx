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
        <div className="text-white">
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
                        <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                                <button 
                                    onClick={() => rechargerStock(camion.id)} 
                                    className="bg-blue-600 hover:bg-blue-700 p-1 rounded text-xs"
                                    title="Recharger le stock"
                                >
                                    🔄
                                </button>
                                <button 
                                    onClick={() => modifierVendeur(camion)} 
                                    className="bg-yellow-600 hover:bg-yellow-700 p-1 rounded text-xs"
                                    title="Modifier le vendeur"
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => supprimerCamion(camion.id)} 
                                    className="bg-red-600 hover:bg-red-700 p-1 rounded text-xs"
                                    title="Supprimer le camion"
                                >
                                    🗑
                                </button>
                                {camion.localisation ? (
                                    <a
                                        href={`https://www.google.com/maps?q=${camion.localisation.lat},${camion.localisation.lng}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-green-600 hover:bg-green-700 p-1 rounded text-xs inline-block"
                                        title="Localiser sur la carte"
                                    >
                                        📍
                                    </a>
                                ) : (
                                    <span className="text-gray-400 text-xs p-1" title="Pas de localisation disponible">❌</span>
                                )}
                            </div>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
