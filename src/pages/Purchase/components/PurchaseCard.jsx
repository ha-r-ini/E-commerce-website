
import { Link } from 'react-router-dom';

const PurchaseCard = ({ orders }) => {
    return (

        <>
            {
                orders.map((item, index) => (
                    <div key={index} className='purchase-card mb-20'>
                        <div className='ord-id flex-2'>
                            <h1>Order Id : {item.id} </h1>
                            <p>{new Date(item.date).toLocaleDateString("en-IN")}</p>
                        </div>
                        <div className='purchase-body'>

                            {
                                item.cartItems.map((orderItem, index) => (
                                    <div key={index} className='purchase-item flex-2'>
                                        <div className='flex-1 gap-2 '>
                                            <div className='purchase-img'>
                                                <Link to={`/product-details/${orderItem.id}`} >
                                                    <img src={orderItem.img} width="200px" alt="purchase-img" />
                                                </Link>
                                            </div>
                                            <Link to={`/product-details/${orderItem.id}`} >
                                                <p><b>{orderItem.title}</b></p>
                                                <p className='description mt-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente saepe minima dolore pariatur facilis, accusantium cupiditate ipsum quasi ex veritatis animi quo rerum in? Qui autem obcaecati pariatur soluta quo!</p>
                                                <p className='mt-5'>Qty : {orderItem.quantity}</p>
                                            </Link>
                                        </div>
                                        <div className='mt-10 text-center'>
                                            <p><b>${orderItem.price}</b></p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='mt-10 mb-10 text-end'>
                                <p><b>Total : {item.total}</b></p>
                            </div>
                        </div>
                    </div>

                ))
            }

        </>
    )
}

export default PurchaseCard