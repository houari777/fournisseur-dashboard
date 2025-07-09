export default function Topbar({ user }) {
    return (
        <div className="ml-64 bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow">
            <h1 className="text-xl font-bold">Tableau de bord</h1>
            <div className="text-sm">Connecté en tant que : <span className="font-semibold">{user?.email}</span></div>
        </div>
    );
}
