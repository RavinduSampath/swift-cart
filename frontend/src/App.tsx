import { Outlet } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;
