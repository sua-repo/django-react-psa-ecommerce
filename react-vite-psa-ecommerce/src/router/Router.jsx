import Products from '@/ui/components/fruits/products'
import MainLayout from '@/ui/layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'


const routes = [
    {
        path:'/',
        element:<MainLayout/>,
        loader: () => '메인 레이아웃',
        children:[
            {
                path:'',
                element:<Products></Products>,
                loader: () => '상품들',
            }
        ]    
    }
]

const router = createBrowserRouter(routes)

export{router,routes}