import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

//dev_1_fruits
createRoot(document.getElementById('root')).render(
  // dev_5_fruits
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
)
