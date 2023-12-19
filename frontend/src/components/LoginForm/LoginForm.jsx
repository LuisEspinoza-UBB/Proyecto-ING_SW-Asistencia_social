import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './LoginForm.css';
import { FaUserAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

const BASE_URL = 'http://localhost:3000/api';

const LoginForm = () => {
    const navigate = useNavigate();

    const onSubmit = async (loginForm) => {
        const { email, password } = loginForm;

        try {
            const { data } = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            const { accessToken } = data.data;
            localStorage.setItem('token', accessToken);
            navigate('/formulario');
          } catch (error) {
            alert(error.response.data.message);
          }
    }

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    return (
        <div className='background-login'>
            <div className='wrapper'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Email' {...register('email', {
                            required: true
                        })} />
                        <FaUserAlt className='icon' />
                    </div>
                    {errors.email?.type === 'required' && <p className='error'>El email es requerido.</p>}

                    <div className="input-box">
                        <input type="password" placeholder='Contraseña' {...register('password', {
                            required: true
                        })} />
                        <IoMdLock className='icon' />
                    </div>
                    {errors.password?.type === 'required' && <p className='error'>La contraseña es requerida.</p>}

                    <button type="submit" className='btn-login'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;