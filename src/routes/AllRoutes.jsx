import { Routes, Route } from 'react-router-dom'
import Home from '../pages/landingPage/Home'
import Product from '../pages/productPage/Product'
import Login from '../pages/authentication/Login'
import Register from '../pages/authentication/Register'
import ProductDetails from '../pages/productPage/ProductDetails'
import Cart from '../pages/cart/Cart'
import ProctedRoutes from './ProctedRoutes'
import Purchase from '../pages/Purchase/Purchase'
import PageNotFound from '../components/PageNotFound'

const Allroutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/purchase" element={<ProctedRoutes><Purchase /></ProctedRoutes>} />
            <Route path="/cart" element={<ProctedRoutes><Cart /></ProctedRoutes>} />
            <Route path="*" element={<PageNotFound />} />


        </Routes>

    )
}

export default Allroutes