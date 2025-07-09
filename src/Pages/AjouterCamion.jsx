import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AjouterCamion() {
    const [numero, setNumero] = useState("");
    const [vendeur, setVendeur] = useState("");
    const [vendeurId, setVendeurId] = useState("");
    const [stock, setStock] = useState({});

    const handleStockChange = (e, produit) => {
        setStock({ ...stock, [produit]: parseInt(e.target.value || "0") });
    };

    const ajouterCamion = async () => {
        if (!numero || !vendeur || !vendeurId) {
            alert("Remplis tous les champs !");
            return;
        }

        await addDoc(collection(db, "camions"), {
            numero,
            vendeur,
            vendeurId,
            stock
        });

        alert("Camion ajouté ✅");
        setNumero("");
        setVendeur("");
        setVendeurId("");
        setStock({});
    };

    return (
        <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">➕ Ajouter un camion</h2>

            <div className="bg-gray-800 p-6 rounded shadow space-y-4 max-w-md">
                <input
                    type="text"
                    placeholder="Numéro du camion (ex: C001)"
                    className="w-full p-2 rounded bg-gray-700"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nom du vendeur"
                    className="w-full p-2 rounded bg-gray-700"
                    value={vendeur}
                    onChange={(e) => setVendeur(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="UID Firebase du vendeur"
                    className="w-full p-2 rounded bg-gray-700"
                    value={vendeurId}
                    onChange={(e) => setVendeurId(e.target.value)}
                />

                <hr className="border-gray-600" />

                <h4 className="text-lg font-semibold">📦 Stock à charger</h4>

                {["Huile 5L", "Savon", "Lait", "Farine"].map((produit) => (
                    <div key={produit} className="flex justify-between">
                        <label>{produit}</label>
                        <input
                            type="number"
                            min="0"
                            className="w-24 p-1 rounded bg-gray-700"
                            onChange={(e) => handleStockChange(e, produit)}
                            value={stock[produit] || ""}
                        />
                    </div>
                ))}

                <button
                    onClick={ajouterCamion}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                    ➕ Ajouter
                </button>
            </div>
        </div>
    );
}
