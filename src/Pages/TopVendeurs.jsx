import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "../Components/Sidebar";

export default function TopVendeurs({ ventes }) {
    const stats = ventes.reduce((acc, v) => {
        acc[v.vendeurId] = (acc[v.vendeurId] || 0) + v.quantite;
        return acc;
    }, {});

    const data = Object.entries(stats).map(([vendeur, quantite]) => ({
        vendeur,
        quantite,
    }));

    return (
        <>
            <Sidebar />
            <div className="ml-64 mt-16 p-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📊 Performances des vendeurs</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="vendeur" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantite" fill="#10b981" />
                </BarChart>
            </ResponsiveContainer>
        </div>
</div>
</>
    );
}
