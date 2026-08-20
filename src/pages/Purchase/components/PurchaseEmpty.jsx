import emptyCart from '../../../assets/no_product_found.png'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PurchaseEmpty = () => {

    const navigate = useNavigate()
    return (
        <div className="text-center empty-cart">
            <img src={emptyCart} width='250px' alt="cart-empty" />
            <p><b>No purchases yet.<br/> Your future favorites are waiting for you! </b></p>
            <div className='common-btn mt-20'>
                <Button onClick={() => navigate('/products')}>
                    Continue Shopping
                </Button>
            </div>
        </div>
    )
}

export default PurchaseEmpty