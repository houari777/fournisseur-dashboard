import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="relative">
            <img
              className="h-9 w-9 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="صورة المستخدم"
              width={36}
              height={36}
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              أحمد محمد
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              مدير النظام
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
          title="تسجيل الخروج"
          aria-label="تسجيل الخروج"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
}
