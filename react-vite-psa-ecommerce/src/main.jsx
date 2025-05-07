import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'

//dev_1_fruits
createRoot(document.getElementById('root')).render(
  // dev_5_fruits : <AuthProvider>
  // dev_6_fruits : <CartProvider>
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router}/>
    </CartProvider>
  </AuthProvider>
)
