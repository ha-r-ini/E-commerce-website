import Grid from '@mui/material/Grid'
import { Button, Rating } from '@mui/material';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext'
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const AccordianId = React.useId();
    const ismobile = useMediaQuery('(max-width:768px)')
    const navigate = useNavigate()
    const { id } = useParams()
    const host = import.meta.env.VITE_HOST
    const { product } = useFetch(`${host}/444/products/${id}`)
    const { addToCart, increaseQuantity, decreaseQuantity, cartItems, removeFromCart } = useCart()
    const [quantity, setQuantity] = useState(1);
    const cartItem = cartItems.find(
        (item) => item.id === product.id
    );
    const handleAddToCart = (product, quantity) => {
        const token = sessionStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return;
        }
        addToCart(product, quantity);

    }

    const displayQuantity = cartItem
        ? cartItem.quantity
        : quantity;

    return (
        <div className='product-details'>
            <div className='container-width'>
                <Grid container spacing={2} className={ismobile ? "mt-20" :"mt-50"} sx={{ justifyContent: "center" }}>

                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 5 }}>
                        <div className='details-img'>
                            <img src={product.img} alt="product image" />
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
                        <h1>{product.title}</h1>
                        <div className='mt-10'>
                            <Rating
                                name="rating"
                                value={Number(product.rating)}
                            />
                        </div>
                        <div className='mt-20'>
                            <h2>${product.price}</h2>

                            <div className='flex-wrap mt-30'>
                                <div className='qnt-btn'>
                                    <div onClick={() => {
                                        if (cartItem) {
                                            decreaseQuantity(product.id);
                                        } else {
                                            setQuantity(prev => Math.max(1, prev - 1));
                                        }
                                    }}
                                    >-</div>
                                    <div>{displayQuantity}</div>
                                    <div onClick={() => {
                                        if (cartItem) {
                                            increaseQuantity(product.id);
                                        } else {
                                            setQuantity(prev => prev + 1);
                                        }
                                    }}
                                    >+</div>
                                </div>
                                {
                                    product.best_seller && <div className='bestseller-chip'>
                                        Best Seller
                                    </div>
                                }
                                {
                                    !product.in_stock && <div className='instock-chip'>
                                        Out of Stock
                                    </div>
                                }

                            </div>

                            <p className='mt-20'>{product.description}</p>
                        </div>
                        {
                            cartItem ? <div className='remove-btn mt-20'>
                                <Button fullWidth disabled={!product.in_stock ? true : false} onClick={() => removeFromCart(product.id)} >Remove </Button>
                            </div> :
                                <div className='common-btn cart-btn mt-20'>
                                    <Button fullWidth disabled={!product.in_stock ? true : false} onClick={() => handleAddToCart(product, quantity)}>Add to cart</Button>
                                </div>
                        }

                        <div className='mt-20 details-acc'>
                            <Accordion defaultExpanded>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${AccordianId}-panel1-content`}
                                    id={`${AccordianId}-panel1-header`}
                                >
                                    <h3>Product Details</h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>{product.product_details}</p>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${AccordianId}-panel1-content`}
                                    id={`${AccordianId}-panel1-header`}
                                >
                                    <h3>Shipment details</h3>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <p>{product.shipment_details}</p>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default ProductDetails