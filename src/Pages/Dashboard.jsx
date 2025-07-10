import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Lundi", ventes: 12 },
    { name: "Mardi", ventes: 9 },
    { name: "Mercredi", ventes: 17 },
];

export default function Dashboard() {
    return (
        <div className="p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">📊 المبيعات الأسبوعية</h2>

            <div className="bg-gray-900 p-4 rounded shadow">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="ventes" fill="#38bdf8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
