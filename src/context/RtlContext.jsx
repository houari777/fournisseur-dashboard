import React, { createContext, useState, useEffect, useContext } from 'react';

const RtlContext = createContext();

export function RtlProvider({ children, defaultDir = 'rtl' }) {
  const [isRtl, setIsRtl] = useState(defaultDir === 'rtl');

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  const toggleDirection = () => {
    setIsRtl(prev => !prev);
  };

  const setDirection = (dir) => {
    setIsRtl(dir === 'rtl');
  };

  return (
    <RtlContext.Provider value={{ isRtl, toggleDirection, setDirection }}>
      <div dir={isRtl ? 'rtl' : 'ltr'} className={isRtl ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </RtlContext.Provider>
  );
}

export const useRtl = () => {
  const context = useContext(RtlContext);
  if (!context) {
    throw new Error('useRtl must be used within an RtlProvider');
  }
  return context;
};

export default RtlContext;
