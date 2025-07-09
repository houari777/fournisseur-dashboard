import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    doc,
    getDocs,
    updateDoc,
    getDoc,
} from "firebase/firestore";
import {Sidebar} from "lucide-react";


export default function ChargerCamion() {
    const [camions, setCamions] = useState([]);
    const [produits, setProduits] = useState([]);
    const [selectedCamionId, setSelectedCamionId] = useState("");
    const [selectedProduit, setSelectedProduit] = useState("");
    const [quantite, setQuantite] = useState("");

    useEffect(() => {
        const fetchCamions = async () => {
            const snap = await getDocs(collection(db, "camions"));
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setCamions(data);
        };

        const fetchProduits = async () => {
            const snap = await getDocs(collection(db, "produits"));
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            setProduits(data);
        };

        fetchCamions();
        fetchProduits();
    }, []);

    const chargerProduit = async () => {
        if (!selectedCamionId || !selectedProduit || !quantite)
            return alert("Tous les champs sont requis");

        const camionRef = doc(db, "camions", selectedCamionId);
        const camionSnap = await getDoc(camionRef);
        const camionData = camionSnap.data();

        const currentStock = camionData?.stock || {};
        const newStock = {
            ...currentStock,
            [selectedProduit]: (currentStock[selectedProduit] || 0) + parseInt(quantite),
        };

        await updateDoc(camionRef, { stock: newStock });

        alert("✅ Produit chargé !");
        setQuantite("");
    };

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">🚛 Charger un camion</h2>

            <div className="bg-gray-800 p-4 rounded">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        value={selectedCamionId}
                        onChange={(e) => setSelectedCamionId(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    >
                        <option value="">-- Choisir un camion --</option>
                        {camions.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.numeroCamion}
                            </option>
                        ))}
                    </select>

                    <select
                        value={selectedProduit}
                        onChange={(e) => setSelectedProduit(e.target.value)}
                        className="bg-gray-700 p-2 rounded"
                    >
                        <option value="">-- Choisir un produit --</option>
                        {produits.map((p) => (
                            <option key={p.id} value={p.nom}>
                                {p.nom}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="Quantité"
                        className="bg-gray-700 p-2 rounded"
                        value={quantite}
                        onChange={(e) => setQuantite(e.target.value)}
                    />
                </div>

                <button
                    onClick={chargerProduit}
                    className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                    ➕ Charger
                </button>
            </div>
        </div>
</div>
</>
    );
}
