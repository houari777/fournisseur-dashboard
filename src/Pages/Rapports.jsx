import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const generatePDF = (ventesData, date) => {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("📄 تقرير يومي للمبيعات", 14, 22, { align: 'right' });
  doc.setFontSize(12);
  doc.text(`التاريخ: ${date}`, 14, 30, { align: 'right' });

  const tableData = ventesData.map((v) => [
    v.produit || 'N/A',
    v.camionId || 'N/A',
    v.quantite || 0,
    dayjs(v.date?.toDate?.() || v.date).format("HH:mm"),
  ]);

  doc.autoTable({
    head: [["المنتج", "الشاحنة", "الكمية", "الوقت"]],
    body: tableData,
    startY: 40,
    styles: { 
      font: 'Arial',
      fontStyle: 'normal',
      textColor: [0, 0, 0],
      halign: 'right',
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: 40 }
  });

  // Ajouter le total
  const total = ventesData.reduce((sum, v) => sum + (v.quantite || 0), 0);
  doc.setFontSize(12);
  doc.text(`إجمالي المنتجات المباعة: ${total}`, 14, doc.lastAutoTable.finalY + 10, { align: 'right' });

  doc.save(`rapport-ventes-${date}.pdf`);
};

export default function Rapports() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedCamion, setSelectedCamion] = useState("tous");
  const [camions, setCamions] = useState([]);
  const [ventes, setVentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("daily"); // 'daily' or 'monthly'

  // Charger la liste des camions
  useEffect(() => {
    const getCamions = async () => {
      try {
        const snapshot = await getDocs(collection(db, "camions"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCamions(data);
      } catch (error) {
        console.error("Erreur lors du chargement des camions:", error);
      }
    };

    getCamions();
  }, []);

  useEffect(() => {
    fetchVentes();
  }, [selectedDate, selectedCamion]);

  const fetchVentes = async () => {
    try {
      setLoading(true);
      const start = dayjs(selectedDate).startOf("day").toDate();
      const end = dayjs(selectedDate).endOf("day").toDate();

      let q = query(
        collection(db, "ventes"),
        where("date", ">=", start),
        where("date", "<=", end)
      );

      // Ajouter le filtre par camion si un camion est sélectionné
      if (selectedCamion !== "tous") {
        q = query(q, where("camionId", "==", selectedCamion));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVentes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des ventes:", error);
      alert("Erreur lors du chargement des ventes");
    } finally {
      setLoading(false);
    }
  };

  const totalVentes = ventes.reduce((acc, v) => acc + (v.quantite || 0), 0);

  // Grouper les ventes par produit
  const ventesParProduit = ventes.reduce((acc, vente) => {
    if (!acc[vente.produit]) {
      acc[vente.produit] = 0;
    }
    acc[vente.produit] += vente.quantite || 0;
    return acc;
  }, {});

  // Données pour le graphique
  const graphData = Object.entries(ventesParProduit)
    .map(([produit, quantite]) => ({
      produit,
      quantite,
    }))
    .sort((a, b) => b.quantite - a.quantite);

  // Vérifier si l'utilisateur est admin
  const isAdmin = auth.currentUser?.email === 'admin@example.com'; // À adapter selon votre logique d'authentification

  if (!isAdmin) {
    return (
      <div className="text-white text-center mt-10">
        <p className="text-xl text-red-500">⛔ غير مصرح لك بالوصول إلى هذه الصفحة</p>
        <p className="mt-4">يجب أن تكون مديراً لعرض التقارير</p>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          📊 تقرير يومي 
          {selectedCamion !== 'tous' && (
            <span className="text-lg font-normal">
              - {camions.find(c => c.id === selectedCamion)?.numero || 'شاحنة مختارة'}
            </span>
          )}
        </h2>
        
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <button
            onClick={() => generatePDF(ventes, selectedDate)}
            className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 flex items-center gap-2"
          >
            <span>📄</span>
            <span>تحميل PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300 text-right">📅 اختر التاريخ:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm text-gray-300 text-right">🚚 اختر الشاحنة:</label>
            <select
              className="bg-gray-700 text-white px-4 py-2 rounded"
              value={selectedCamion}
              onChange={(e) => setSelectedCamion(e.target.value)}
            >
              <option value="tous">جميع الشاحنات</option>
              {camions.map(camion => (
                <option key={camion.id} value={camion.id}>
                  {camion.numero} - {camion.vendeur}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">إجمالي المنتجات</h3>
              <p className="text-3xl font-bold">{totalVentes}</p>
              <p className="text-sm text-blue-200 mt-1">وحدة مباعة</p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">عدد المعاملات</h3>
              <p className="text-3xl font-bold">{ventes.length}</p>
              <p className="text-sm text-green-200 mt-1">عملية بيع</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">عدد المنتجات</h3>
              <p className="text-3xl font-bold">{Object.keys(ventesParProduit).length}</p>
              <p className="text-sm text-purple-200 mt-1">منتج مختلف</p>
            </div>

            <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">متوسط البيع</h3>
              <p className="text-3xl font-bold">
                {ventes.length > 0 ? (totalVentes / ventes.length).toFixed(1) : 0}
              </p>
              <p className="text-sm text-amber-200 mt-1">وحدة/عملية</p>
            </div>
          </div>

          {/* Graphique des ventes par produit */}
          <div className="bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4 text-right">📊 توزيع المبيعات حسب المنتج</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={graphData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="produit" 
                    type="category" 
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [value, 'الكمية']}
                    labelFormatter={(label) => `المنتج: ${label}`}
                  />
                  <Bar dataKey="quantite" fill="#3b82f6" name="الكمية" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tableau des ventes */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">📋 سجل المبيعات</h3>
              <div className="text-sm text-gray-400">
                {`عرض المبيعات ليوم ${dayjs(selectedDate).format('DD/MM/YYYY')}`}
                {selectedCamion !== 'tous' && ` | الشاحنة: ${camions.find(c => c.id === selectedCamion)?.numero || selectedCamion}`}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900 rounded text-right">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3">📦 المنتج</th>
                    <th className="p-3">🚚 الشاحنة</th>
                    <th className="p-3">👤 البائع</th>
                    <th className="p-3">🔢 الكمية</th>
                    <th className="p-3">📅 التاريخ والوقت</th>
                  </tr>
                </thead>
                <tbody>
                  {ventes.length > 0 ? (
                    ventes.map((vente) => {
                      const camion = camions.find(c => c.id === vente.camionId);
                      return (
                        <tr key={vente.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                          <td className="p-3">{vente.produit}</td>
                          <td className="p-3">{camion?.numero || vente.camionId || 'N/A'}</td>
                          <td className="p-3">{camion?.vendeur || 'N/A'}</td>
                          <td className="p-3">
                            <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">
                              {vente.quantite}
                            </span>
                          </td>
                          <td className="p-3">
                            {dayjs(vente.date?.toDate?.() || vente.date).format("DD/MM/YYYY HH:mm")}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="p-6 text-center text-gray-400">
                        <div className="flex flex-col items-center justify-center py-8">
                          <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-lg">لا توجد مبيعات مسجلة</p>
                          <p className="text-sm mt-2 text-gray-500">
                            {`لم يتم تسجيل أي مبيعات في ${dayjs(selectedDate).format('DD/MM/YYYY')}`}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {ventes.length > 0 && (
              <div className="mt-4 text-sm text-gray-400 text-left">
                عرض {ventes.length} من أصل {ventes.length} عملية بيع
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
