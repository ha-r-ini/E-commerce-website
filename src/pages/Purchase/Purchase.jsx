import './purchase.css'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import useTitle from '../../hooks/useTitle'
import PurchaseCard from './components/PurchaseCard';
import PurchaseEmpty from './components/PurchaseEmpty';
import { getUserOrders } from '../../services/orderServices';
import { toast } from 'react-toastify';

const Purchase = () => {


    const [orders, setOrders] = useState([])

    const userID = sessionStorage.getItem('userID')
    const token = sessionStorage.getItem('token')
    useTitle('Purchase')

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const data = await getUserOrders(userID, token)

                setOrders(data)

            } catch (error) {

                console.error(error)
                toast.error(`error: ${error.message}`)
            }
        }

        fetchOrders()

    }, [])

    return (
        <div className="purchase">
            <div className="container-width">
                <div className="page-title text-center mt-20">
                    <h1>Purchase</h1>
                </div>
                <Grid container spacing={2} className="mt-30" sx={{ justifyContent: "center" }}>
                    <Grid size={{ xs: 12, sm: 12, md: 9, lg: 9, xl: 7 }}>
                        {
                            orders.length > 0 ? <PurchaseCard orders={orders} /> : <PurchaseEmpty />
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Purchase 