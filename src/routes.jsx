import Admin from "./pages/auth/admin";
import App from './App'
import Login from "./pages/auth/login";

const childrenRoutes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'abc',
    element: <Admin />,
  }
];


export default childrenRoutes;