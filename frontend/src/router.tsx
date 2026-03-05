import { createBrowserRouter } from 'react-router';
import App from './App';
import RootLayout from './layouts/root-layout';
import Home from './pages/(root)/home';
import Products from './pages/(root)/products';
import ProductDetail from './pages/(root)/product-detail';
import Cart from './pages/(root)/cart';
import Checkout from './pages/(root)/checkout';
import Login from './pages/(root)/login';
import Register from './pages/(root)/register';
import About from './pages/(root)/about';
import Profile from './pages/(root)/profile';
import AdminLayout from './layouts/admin-layout';
import Dashboard from './pages/(admin)/dashboard';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: RootLayout,
        children: [
          { index: true, Component: Home },
          { path: 'products', Component: Products },
          { path: 'products/:id', Component: ProductDetail },
          { path: 'about', Component: About },
          { path: 'profile', Component: Profile },
          { path: 'cart', Component: Cart },
          { path: 'checkout', Component: Checkout },
        ],
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: 'admin',
        Component: AdminLayout,
        children: [{ index: true, Component: Dashboard }],
      },
    ],
  },
]);

export default router;
