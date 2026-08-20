import noProduct from '../../../assets/no_product_found.png'

const NoProducts =()=>{
    return(

        <div className="text-center">
        
        <img  src={noProduct} width='250px' alt="no products found"/>
        <p><b>No products found</b></p>
        
        </div>
    )
}

export default NoProducts