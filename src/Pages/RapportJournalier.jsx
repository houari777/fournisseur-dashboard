import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";
import Sidebar from "../components/Sidebar";


export default function RapportJournalier({ ventes }) {
    const dateDuJour = format(new Date(), "yyyy-MM-dd");

    const ventesDuJour = ventes.filter((v) => {
        return v.timestamp?.toDate()?.toDateString() === new Date().toDateString();
    });

    const exportRapport = () => {
        const doc = new jsPDF();
        doc.text(`Rapport de ventes - ${dateDuJour}`, 14, 10);

        const rows = ventesDuJour.map((v) => [
            v.productId,
            v.clientId,
            v.vendeurId,
            v.truckId,
            v.quantite,
            format(v.timestamp?.toDate(), "HH:mm"),
        ]);

        doc.autoTable({
            head: [["Produit", "Client", "Vendeur", "Camion", "Quantité", "Heure"]],
            body: rows,
        });

        doc.save(`rapport_vente_${dateDuJour}.pdf`);
    };

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="mb-4">
            <button
                onClick={exportRapport}
                className="bg-purple-600 text-white px-4 py-2 rounded"
            >
                📥 Export Rapport Journalier
            </button>
        </div>
</div>
</>
    );
}
