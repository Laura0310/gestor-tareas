import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import axiosInstance from '../../services/axios';
import axios from 'axios';
import { toast } from 'sonner';
import { LoginPayload, LoginResponse } from '../../types/auth';
import Button from '../../shared/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const loginUser = async (userData: LoginPayload) => {
        try {
            const response = await axiosInstance.post<LoginResponse>('/auth/login', userData);
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            toast.error('Incorrect credentials!');
            if (axios.isAxiosError(error) && error.response) {
                throw new Error(error.response.data.message || 'Login error');
            }
            throw new Error('Unknown error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            toast.error('Please fill in all fields!');
            return;
        }

        const userData: LoginPayload = { email, password };
        await loginUser(userData);
    };

    return (
        <div className='flex items-center justify-center h-screen' style={{
            backgroundImage: 'url("/src/assets/bg.svg")'
        }}>
            <form onSubmit={handleSubmit} className='bg-white p-6 shadow-md rounded-lg w-96'>
                <h2 className='text-2xl mb-4 text-center'>Login</h2>
                <div className='flex flex-col gap-5 mb-4'>
                    <input
                        type='email'
                        placeholder='Email'
                        className='p-2 border rounded w-full font-montserrat h-11'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='p-2 border rounded w-full font-montserrat h-11 '
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex flex-col  justify-center items-center'>

                    <Button type='submit' className=' bg-violet-800 hover:bg-violet-900 w-full text-white mt-5'>
                        Inicia Sesión
                    </Button>
                    <p className='text-sm mt-4 text-center'>
                        <a href='/register' className='text-violet-400 hover:underline'>
                            Registrarse
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
