import Grid from '@mui/material/Grid'
import { Rating, Avatar } from '@mui/material';
import { useState } from 'react';

const Testimonials = ({ testimonials }) => {

    const [value, setValue] = useState(2);

    return (
        <>
            <Grid container spacing={2} className="mt-50">
                {
                    testimonials.map((item, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} className="testimonial-card">
                            <p>{item.feedback}</p>

                            <div className='mt-20 flex-3 gap-2'>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />

                                <div className='rating mt-10'>
                                    <h3><b>{item.title}</b></h3>
                                    <div className='mt-5'>
                                        <Rating
                                            name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }}
                                        />
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
export default Testimonials