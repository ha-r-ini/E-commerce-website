import '../cart.css'
import DeleteIcon from '@mui/icons-material/Delete';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useMediaQuery } from '@mui/material';
import { useCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';

const CardComponent = ({ cartItems }) => {

    const ismobile = useMediaQuery('(max-width:768px)')
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart()

    return (
        <>
            {
                cartItems.map((item, index) => (
                    <div key={index} className='cart-card flex-2 mb-20'>
                        <div className='flex-1 gap-1'>
                            {
                                ismobile &&
                                <div className='close-btn'>
                                    <CancelRoundedIcon  onClick={() => removeFromCart(item.id)} sx={{ color: "#fff" }} />
                                </div>
                            }
                            <div className='cart-img'>
                                <Link to={`/product-details/${item.id}`} >
                                    <img src={item.img} width="200px" alt="cart-img" />
                                </Link>
                            </div>
                            <div className='cart-card-body'>
                                <Link to={`/product-details/${item.id}`} >
                                    <p><b>{item.title}</b></p>
                                    <p className='des-cart'> {item.description} </p>
                                </Link>
                                <div className={` ${ismobile ? 'flex-2' : 'flex-1'} cart-btns gap-2 mt-10`}>

                                    <div className='qnt-btn2' >
                                        <div onClick={() => decreaseQuantity(item.id)}>-</div>
                                        <div>{item.quantity}</div>
                                        <div onClick={() => increaseQuantity(item.id)}>+</div>
                                    </div>

                                    <p><b>${item.price}</b></p>

                                </div>

                            </div>
                        </div>

                        {
                            !ismobile &&
                            <div>
                                <DeleteIcon onClick={() => removeFromCart(item.id)} sx={{ color: "red", cursor: "pointer" }} />
                            </div>
                        }

                    </div>
                ))
            }


        </>
    )
}

export default CardComponent

