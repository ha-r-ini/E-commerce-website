import Grid from '@mui/material/Grid'
import './footer.css'
import logoDark from '../assets/logo-dark.png'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

const Footer = () => {
    const { theme } = useContext(ThemeContext)

    return (
        <>
            <footer className='footer'>
                <div className='container-width'>
                    <Grid container spacing={2} >
                        <Grid size={{ xs: 12, sm: 12, md: 5, lg: 4, xl: 5 }} >
                            <Link to='/'>
                                {
                                    theme === "light" ? <img src={logoDark} width="150px" alt="" />
                                        : <img src={logo} width="150px" alt="" />
                                }
                            </Link>
                            <p className='mt-10'>Handcrafted ceramics made to bring beauty and warmth to everyday moments. Timeless designs, thoughtful craftsmanship, and pieces made to be cherished.</p>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 3 }} >
                            <p className='mt-20'><b>Quick Links</b></p>

                            <div className='mt-20'>
                                <p> <Link to="/products">Purchase</Link></p>
                                <p className='mt-5'> <Link to="">products</Link></p>
                                <p className='mt-5'> <Link to="">Cart</Link></p>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md:3, lg: 4, xl: 3 }} >
                            <p className='mt-20'><b>Follow the Craft</b></p>

                            <div className='mt-20 flex-1 gap-1'>
                                <p> <Link to="/"><XIcon /></Link></p>
                                <p> <Link to="/"><LinkedInIcon /></Link></p>
                                <p> <Link to="/"><InstagramIcon /></Link></p>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} className="cpy-ryt text-center mt-20">
                            <p>© 2026 Terra Ceramica. Crafted with care.</p>
                        </Grid>
                    </Grid>
                </div>

            </footer>


        </>
    )
}

export default Footer