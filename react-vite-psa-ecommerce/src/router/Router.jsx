import Cart from '@/ui/components/fruits/Cart'
import CheckOut from '@/ui/components/fruits/CheckOut'
import Products from '@/ui/components/fruits/products'
import Hero from '@/ui/components/Hero'
import Login from '@/ui/components/login/Login'
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
                element:<div><Hero/><Products/></div>,
                loader: () => '상품들',
            },
            {  //dev_5_fruits
                path:'login',
                element:<div><Hero/><Login/></div>,
                loader: () => '상품들',
            },
            {  //dev_7_fruits
                path:'cart',
                element:<Cart></Cart>,
                loader: () => '카트',
            },            
            {  //dev_8_fruits
                path:'checkout',
                element:<CheckOut></CheckOut>,
                loader: () => '체크아웃',
            },               
        ]    
    }
]

const router = createBrowserRouter(routes)

export{router,routes}