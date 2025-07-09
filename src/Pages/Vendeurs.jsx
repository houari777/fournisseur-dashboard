import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";
import {Sidebar} from "lucide-react";


export default function Vendeurs() {
    const [vendeurs, setVendeurs] = useState([]);

    useEffect(() => {
        const vendeursRef = ref(db, "vendeurs/");
        onValue(vendeursRef, (snapshot) => {
            const data = snapshot.val();
            const list = Object.entries(data || {}).map(([id, val]) => ({ id, ...val }));
            setVendeurs(list);
        });
    }, []);

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="p-6">
            <h2 className="text-2xl mb-4">🧑‍💼 Vendeurs</h2>
            <ul className="space-y-3">
                {vendeurs.map((v) => (
                    <li key={v.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                        <div className="font-bold">{v.nom}</div>
                        <div>Email : {v.email}</div>
                        <div>Camion assigné : {v.camionId}</div>
                    </li>
                ))}
            </ul>
        </div>
</div>
</>
    );
}
