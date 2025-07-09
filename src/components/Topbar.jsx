// src/Components/Topbar.jsx
export default function Topbar() {
    return (
        <header className="fixed top-0 left-64 right-0 h-16 bg-gray-800 border-b border-gray-700 text-white flex items-center justify-between px-6 z-10">
            <h1 className="text-xl font-semibold">📊 لوحة التحكم</h1>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">مرحباً، المسؤول</span>
                <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="rounded-full w-8 h-8 border"
                />
            </div>
        </header>
    );
}
