import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          background: 'var(--color-bg-elevated)',
          color: 'var(--color-text)',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          maxWidth: '32rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: 'white',
          },
        },
        loading: {
          iconTheme: {
            primary: '#3B82F6',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export default ToastContainer;
