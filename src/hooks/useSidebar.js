import { useState, useEffect } from 'react';

const useSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile on initial load and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768; // Tailwind's md breakpoint
      setIsMobile(mobile);
      
      // Close sidebar on mobile by default
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    // Set initial state
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Toggle sidebar open/closed
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar
  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  // Open the sidebar
  const openSidebar = () => {
    setIsOpen(true);
  };

  return {
    isOpen,
    isMobile,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };
};

export default useSidebar;
