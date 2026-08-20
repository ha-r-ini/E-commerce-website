import './cart.css'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material';
import CardComponent from './components/CardComponent';
import { useCart } from '../../context/CartContext';
import EmptyCart from './components/EmptyCart';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle'
import { createOrder } from '../../services/orderServices';
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    boxShadow: 24,
    p: 2,
    borderRadius: "10px"
};
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 2,
    borderRadius: "10px"
};

const Cart = () => {

    const { cartItems, total, clearCart } = useCart()
    const navigate = useNavigate()
    useTitle('shopping cart')

    //  modal 1 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //  modal 2
    const [open2, setOpen2] = useState(false);
    const handleSuccessOpen = () => setOpen2(true);
    const handleSuccessClose = () => setOpen2(false);

    const token = sessionStorage.getItem("token")
    const userID = sessionStorage.getItem("userID")
    const order = {
        cartItems: cartItems,
        total: total,
        date: new Date().toISOString(),
        userId: Number(userID)
    }
    const placeOrder = async () => {
        const success = await handleSubmit()

        if (success) {
            handleClose()
            handleSuccessOpen()
            // navigate('/')
            clearCart()
        }

    }

    const handleSubmit = async () => {

        try {

            const data = await createOrder(order, token)

            console.log(data)

            return true

        } catch (error) {

            console.error(error)
            toast.error(`error: ${error.message}`)
            return false
        }
    }


    return (
        <div className='cart'>
            <div className='container-width'>
                <div className="page-title text-center mt-20">
                    <h1>Cart</h1>
                </div>
                {
                    cartItems.length > 0 ?
                        <Grid container spacing={2} className="mt-30" sx={{ justifyContent: "center" }}>
                            <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 7 }}>
                                <CardComponent cartItems={cartItems} />

                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 7 }}>
                                <div className='flex-4 cart-total gap-2'>
                                    <p><b>Total : ${total}</b></p>
                                    <div className='common-btn'>
                                        <Button onClick={handleOpen}>Place Order</Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid> :
                        <Grid container spacing={2} className="mt-30" sx={{ justifyContent: "center" }}>
                            <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 7 }}>
                                <EmptyCart />
                            </Grid>
                        </Grid>

                }

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="place-ord-modal">
                    <div className='flex-2 modal-title'>
                        <h2>Confirm Order</h2>
                        <CloseRoundedIcon onClick={handleClose} />
                    </div>

                    <div className='body-modal'>

                        <div className='mb-10 '>
                            <label >Items</label>
                        </div>

                        {
                            cartItems.map((item, index) => (
                                <div key={index} className='flex-2 mt-5'>
                                    <p><b>{item.quantity} × {item.title}   </b></p>
                                    <p><b>${item.price}  </b></p>
                                </div>
                            ))
                        }

                        <div className='mb-10 mt-20'>
                            <div className='flex-2 mt-5'>
                                <label>SubTotal</label>
                                <p><b>  ${total}  </b></p>
                            </div>

                            <div className='flex-2 mt-5'>
                                <label>Delivery</label>
                                <p><b>  free  </b></p>
                            </div>
                            <div className='dvd mt-10'></div>
                            <div className='flex-2 mt-5'>
                                <label>Total</label>
                                <p><b>  ${total}  </b></p>
                            </div>
                        </div>
                        <div className='mb-10 mt-30'>
                            <label>Payment Method</label>
                            <p><b>Cash on Delivery</b></p>
                        </div>
                        {/* <div className='mb-10 mt-20'>
                            <label>Delivery Address</label>
                            <p><b>Chennai,  Tamil Nadu </b></p>
                        </div> */}
                        <div className='flex-3 gap-1 mt-20'>
                            <div className='common-bdr-btn'>
                                <Button onClick={handleClose}>Cancel</Button>
                            </div>
                            <div className='common-btn'>
                                <Button onClick={() => placeOrder()}>Place Order</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={open2}
                onClose={handleSuccessClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style2} className="place-ord-modal">

                    <div className='text-center'>
                        <h2>Order placed Successfully</h2>
                        <div className="checkmark-container mt-20">
                            <svg className="checkmark-svg" viewBox="0 0 52 52">

                                <circle className="checkmark-circle" cx="26" cy="26" r="23" />

                                <path className="checkmark-check" fill="none" d="M14 27 l7.5 7.5 L38 17" />
                            </svg>
                        </div>
                    </div>
                </Box>
            </Modal>


        </div>
    )
}

export default Cart 