import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import { useForm } from 'react-hook-form';

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const currentUserData = await authService.getCurrentUser(); // Renamed
                if (currentUserData) dispatch(login(currentUserData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='flex items-center justify-center w-full min-h-screen bg-gradient-to-r from-blue-500 to-teal-500'>
            <div className='mx-auto w-full max-w-md bg-white rounded-xl p-10 border border-gray-300 shadow-lg'>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-semibold leading-tight text-gray-800">Sign up to create an account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 hover:underline transition duration-200"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name:"
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
