import React from 'react';
import { useRtl } from '../context/RtlContext';
import { Globe } from 'lucide-react';

const LanguageSelector = () => {
  const { isRtl, toggleDirection, setDirection } = useRtl();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <button
        onClick={() => setDirection('ltr')}
        className={`px-3 py-1 text-sm rounded-md ${
          !isRtl
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setDirection('rtl')}
        className={`px-3 py-1 text-sm rounded-md ${
          isRtl
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
        }`}
      >
        العربية
      </button>
      <Globe className="text-gray-500 dark:text-gray-400" size={18} />
    </div>
  );
};

export default LanguageSelector;
