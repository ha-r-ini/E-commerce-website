import Grid from '@mui/material/Grid'
import { Button, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ products }) => {

    const navigate = useNavigate()

    return (
        <>
            <Grid container spacing={2} className="mt-50" sx={{ justifyContent: "center" }}>
                {
                    products.map((item, index) => (

                        <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 4, xl: 3 }}>
                            <div className='product-card'>
                                {
                                    item.best_seller && <div className='best-seller-tag'>BestSeller</div>
                                }
                                <div className='product-img'>
                                    <img src={item.img} width="100%" alt={item.title} />
                                </div>
                                <div className='product-content'>
                                    <h3>{item.title}</h3>
                                    <div className='rating mt-10'>
                                        <Rating
                                            name="rating"
                                            value={item.rating}
                                        />
                                    </div>
                                    <p className='mt-10'>{item.description}</p>

                                    <div className='flex-2 mt-30'>

                                        <div className='card-price'>
                                            <h4>${item.price}</h4>
                                        </div>

                                        <div className='common-btn'>
                                            <Button onClick={() => navigate(`/product-details/${item.id}`)}>View Details</Button>
                                        </div>
                                    </div>

                                </div>


                            </div>
                        </Grid>
                    ))
                }

            </Grid>


        </>
    )
}
export default ProductCard;