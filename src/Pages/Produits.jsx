import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import {Sidebar} from "lucide-react";


export default function Produits() {
    const [produits, setProduits] = useState([]);
    const [nom, setNom] = useState("");
    const [prix, setPrix] = useState("");
    const [stock, setStock] = useState("");
    const [unite, setUnite] = useState("litre");

    const fetchProduits = async () => {
        const snap = await getDocs(collection(db, "produits"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setProduits(list);
    };

    useEffect(() => {
        fetchProduits();
    }, []);

    const ajouterProduit = async () => {
        if (!nom || !prix || !stock) return alert("Tous les champs sont requis");
        await addDoc(collection(db, "produits"), {
            nom,
            prix: parseFloat(prix),
            stock: parseInt(stock),
            unite,
        });
        setNom("");
        setPrix("");
        setStock("");
        fetchProduits();
    };

    const supprimerProduit = async (id) => {
        await deleteDoc(doc(db, "produits", id));
        fetchProduits();
    };

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="ml-64 mt-16 p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📦 Liste des produits</h2>

            {/* Formulaire ajout */}
            <div className="bg-gray-800 p-4 rounded mb-6">
                <h3 className="text-lg font-semibold mb-2">➕ Ajouter un produit</h3>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Nom du produit"
                        className="p-2 rounded bg-gray-700"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Prix"
                        className="p-2 rounded bg-gray-700"
                        value={prix}
                        onChange={(e) => setPrix(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        className="p-2 rounded bg-gray-700"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <select
                        className="p-2 rounded bg-gray-700"
                        value={unite}
                        onChange={(e) => setUnite(e.target.value)}
                    >
                        <option value="litre">Litre</option>
                        <option value="pièce">Pièce</option>
                        <option value="kg">Kg</option>
                    </select>
                </div>
                <button
                    onClick={ajouterProduit}
                    className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                    Ajouter
                </button>
            </div>

            {/* Liste des produits */}
            <div className="bg-gray-800 rounded p-4">
                <table className="w-full text-left">
                    <thead>
                    <tr className="text-gray-400">
                        <th className="p-2">Nom</th>
                        <th className="p-2">Prix</th>
                        <th className="p-2">Stock</th>
                        <th className="p-2">Unité</th>
                        <th className="p-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produits.map((p) => (
                        <tr
                            key={p.id}
                            className="border-t border-gray-700 hover:bg-gray-700/40"
                        >
                            <td className="p-2">{p.nom}</td>
                            <td className="p-2">{p.prix} DA</td>
                            <td className="p-2">{p.stock}</td>
                            <td className="p-2">{p.unite}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => supprimerProduit(p.id)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {produits.length === 0 && (
                    <p className="text-gray-400 text-center mt-4">
                        Aucun produit pour le moment.
                    </p>
                )}
            </div>
        </div>
</div>
</>
    );
}
