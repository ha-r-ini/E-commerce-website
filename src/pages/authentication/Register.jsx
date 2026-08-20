import authImg from '../../assets/auth-img.jpg'
import Grid from '@mui/material/Grid'
import { Button, TextField } from '@mui/material'
import './auth.css'
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../services/authServices';
import { loginUser } from '../../services/authServices';

const Register = () => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const validateForm = (formdata) => {
        let newErrors = {};

        const name = formdata.name.trim();
        const email = formdata.email.trim();
        const password = formdata.password.trim();

        if (!name) {
            newErrors.name = "Name is required"
        } else if (name.length < 2) {
            newErrors.name = "Name must be atleast 2 characters"
        }

        if (!email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must have atleast 6 characters"
        }
        return newErrors

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({})
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const validationError = validateForm(formData)
        setErrors(validationError)
        console.log(validationError)

        if (Object.keys(validationError).length > 0) {
            return
        }

        try {

            await RegisterUser(formData)
            const data = await loginUser({
                email: formData.email,
                password: formData.password
            })
            sessionStorage.setItem("token", data.accessToken)
            sessionStorage.setItem("userID", data.user.id)

            toast.success("registration successful!")
            navigate("/")
        } catch (error) {
            console.error(error);
            toast.error('somthing went worng try again')
        }



    }


    return (
        <>
            <div className='login'>
                <div className='container-width mt-50 mb-30'>
                    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <div className='auth-img mt-50' >
                                <img src={authImg} alt="auth-img" width="100%" height="100%" />
                                <div className='auth-img-text'>
                                    <h2>Crafted for your moments.</h2>
                                    <p className='mt-5'>Discover handmade warmth for your everyday.</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} className="flex-3" >
                            <form className='form-auth' noValidate onSubmit={handleSubmit}>
                                <h1 className='text-center'>Sign Up</h1>
                                <div className='mt-20 common-input'>
                                    <label>Name</label>
                                    <div className='mt-5'>
                                        <TextField type='text' name="name" fullWidth />
                                        {errors.name &&
                                            <p className='err-txt mt-5' style={{ color: 'red', marginTop: '5px' }}>{errors.name}</p>
                                        }

                                    </div>
                                </div>
                                <div className='mt-20 common-input'>
                                    <label>Email</label>
                                    <div className='mt-5'>
                                        <TextField type='email' name="email" fullWidth />
                                        {errors.email &&
                                            <p className='err-txt mt-5'>{errors.email}</p>
                                        }
                                    </div>
                                </div>
                                <div className='mt-20 common-input'>
                                    <label>Password</label>
                                    <div className='mt-5'>
                                        <TextField type='password' name='password' fullWidth />
                                        {errors.password &&
                                            <p className='err-txt mt-5'>{errors.password}</p>
                                        }
                                    </div>
                                </div>
                                <div className='mt-30 common-btn text-center'>
                                    <Button type='submit'>Sign Up</Button>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default Register