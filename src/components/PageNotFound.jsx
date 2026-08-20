import pagenotfound from '../assets/no_product_found.png'

const PageNotFound = () => {

    return (
        <section className="page-not-found">
            <div className="container-width text-center">
                <div className='not-found-img  '>
                    <img src={pagenotfound} alt="" />
                </div>
                <h1>404, Page not found</h1>
            </div>
        </section>

    )

}
export default PageNotFound