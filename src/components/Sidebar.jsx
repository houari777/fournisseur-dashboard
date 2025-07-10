import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  Truck,
  ShoppingCart,
  Package2,
  BarChart2,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  List,
  Layers,
  Tag,
  FileText,
  Calendar,
  HelpCircle,
  User,
  CreditCard,
  ClipboardList,
  RefreshCw,
  UserPlus,
  Shield,
  Bell,
  MessageSquare,
  Mail,
  AlertCircle,
  Home
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useSidebar from '../hooks/useSidebar';
import UserProfile from './UserProfile';

const menuItems = [
  { label: 'لوحة القيادة', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
  { label: 'المنتجات', icon: <Package size={18} />, path: '/produits' },
  { label: 'الشاحنات', icon: <Truck size={18} />, path: '/camions' },
  { label: 'البائعين', icon: <User size={18} />, path: '/vendeurs' },
  { label: 'المبيعات', icon: <ShoppingCart size={18} />, path: '/ventes' },
  { label: 'مخزون الشاحنات', icon: <Layers size={18} />, path: '/stocks' },
  { label: 'التقارير', icon: <FileText size={18} />, path: '/rapports' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { isDarkMode } = useTheme();
  const [expandedMenus, setExpandedMenus] = useState({});

  // Auto-expand parent menu when a submenu item is active
  useEffect(() => {
    const newExpandedMenus = {};
    
    menuItems.forEach((item, index) => {
      if (item.subItems && item.subItems.length > 0) {
        const hasActiveChild = item.subItems.some(
          subItem => location.pathname === subItem.path
        );
        
        if (hasActiveChild) {
          newExpandedMenus[item.path] = true;
        }
      }
    });
    
    setExpandedMenus(prev => ({
      ...prev,
      ...newExpandedMenus
    }));
  }, [location.pathname]);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  const toggleMenu = (path) => {
    setExpandedMenus(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };



  // Check if a menu item or its sub-items is active
  const isActive = (item) => {
    if (item.subItems && item.subItems.length > 0) {
      return item.subItems.some(subItem => 
        location.pathname === subItem.path
      ) || location.pathname === item.path;
    }
    return location.pathname === item.path;
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById('sidebar');
      const menuButton = document.querySelector('[aria-label="Toggle sidebar"]');
      
      if (isOpen && sidebar && !sidebar.contains(event.target) && 
          menuButton && !menuButton.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside 
        id="sidebar"
        className={`fixed top-0 right-0 h-screen w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out rtl:right-auto rtl:left-0 ${
          isOpen ? 'translate-x-0' : 'rtl:translate-x-full -translate-x-full md:translate-x-0'
        } md:relative md:rtl:translate-x-0`}
        dir="rtl"
      >
        {/* Logo and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="p-1.5 rounded-lg bg-primary-100 dark:bg-primary-900/30 rtl:ml-2">
              <Truck className="text-primary-600 dark:text-primary-400" size={24} />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">كاميون فيزيون</h1>
          </div>
          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="إغلاق القائمة الجانبية"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col h-[calc(100%-5rem)] overflow-y-auto py-4 rtl:font-sans">
          <div className="px-2 space-y-1">
            {menuItems.map((item) => (
              <div key={item.path} className="space-y-1">
                <div 
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg mx-2 transition-colors duration-200 rtl:text-right ${
                    isActive(item) 
                      ? 'bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/70'
                  }`}
                >
                  <Link 
                    to={item.path}
                    className={`flex items-center flex-1 space-x-3 rtl:space-x-reverse rtl:space-x-reverse ${
                      isActive(item) ? 'text-primary-600 dark:text-primary-400' : ''
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive(item) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm rtl:text-right">{item.label}</span>
                  </Link>
                  
                  {item.subItems && item.subItems.length > 0 && (
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMenu(item.path);
                      }}
                      className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800"
                      aria-expanded={expandedMenus[item.path] || false}
                      aria-controls={`submenu-${item.path}`}
                    >
                      {expandedMenus[item.path] ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  )}
                </div>

                {/* Sub-items */}
                {item.subItems && item.subItems.length > 0 && expandedMenus[item.path] && (
                  <div 
                    id={`submenu-${item.path}`}
                    className="mr-8 rtl:mr-0 rtl:ml-8 space-y-1 mt-1 transition-all duration-200 ease-in-out"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-2 text-sm rounded-lg mx-2 transition-colors duration-150 rtl:text-right ${
                          location.pathname === subItem.path
                            ? 'bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400 font-medium'
                            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={onClose}
                      >
                        <span className={`flex-shrink-0 ${location.pathname === subItem.path ? 'text-primary-500' : 'text-gray-400'}`}>
                          {subItem.icon}
                        </span>
                        <span className="rtl:text-right">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User profile and logout */}
        <UserProfile />
      </aside>
    </>
  );
}
