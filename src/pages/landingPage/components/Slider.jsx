import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';

const sliderContent = [
    {
        title: "Handcrafted. Timeless. Yours.",
        description: "Discover beautifully crafted ceramic pieces made with care, character, and a touch of artistry.",
        img: "https://images.pexels.com/photos/6963769/pexels-photo-6963769.jpeg?_gl=1*1t07o0j*_ga*OTgzNTk0Njc3LjE3ODYzNTg4MzM.*_ga_8JE65Q40S6*czE3ODYzNTg4MzIkbzEkZzEkdDE3ODYzNTkxNDIkajU5JGwwJGgw"
    },
    {
        title: "New Shapes, New Stories",
        description: "Explore our latest ceramic creations, designed to bring warmth and elegance to everyday spaces.",
        img: "https://images.pexels.com/photos/7302750/pexels-photo-7302750.jpeg?_gl=1*1k26pxy*_ga*OTgzNTk0Njc3LjE3ODYzNTg4MzM.*_ga_8JE65Q40S6*czE3ODYzNTg4MzIkbzEkZzEkdDE3ODYzNTkzNzUkajUxJGwwJGgw"
    },
    {
        title: "Made by Hands. Inspired by Nature.",
        description: "Every piece carries the subtle beauty of handmade craftsmanship—no two pieces are exactly alike.",
        img: "https://images.pexels.com/photos/9268281/pexels-photo-9268281.jpeg?_gl=1*1ospdwj*_ga*OTgzNTk0Njc3LjE3ODYzNTg4MzM.*_ga_8JE65Q40S6*czE3ODYzNTg4MzIkbzEkZzEkdDE3ODYzNTk1MTckajM0JGwwJGgw"
    },
    {
        title: "Art for Your Everyday Space",
        description: "Add warmth and personality to your home with unique ceramic pieces crafted to be admired.",
        img: "https://images.pexels.com/photos/6739695/pexels-photo-6739695.jpeg?_gl=1*lcf4ot*_ga*OTgzNTk0Njc3LjE3ODYzNTg4MzM.*_ga_8JE65Q40S6*czE3ODYzNTg4MzIkbzEkZzEkdDE3ODYzNjA3NDgkajU5JGwwJGgw"
    }
]

const Slider = () => {

    const navigate = useNavigate()
    return (
        <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            loop={true}
            // onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {
                sliderContent.map((item, index) => (

                    <SwiperSlide key={index}>

                        <div className="slider-card" style={{ backgroundImage: `url(${item.img})` }}>


                            <div className='slider-content'>
                                <h1>{item.title}</h1>
                                <div className='mt-20 banner-discription'>
                                    <p>{item.description}</p>
                                </div>
                                <div className='Banner-btn mt-20'>
                                    <Button endIcon={<ArrowOutwardRoundedIcon />} onClick={() => navigate('/products')}>Explore Collection</Button>
                                </div>
                            </div>

                        </div>

                    </SwiperSlide>
                ))
            }

        </Swiper>
    )
}

export default Slider