import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as authLogin } from '../store/authSlice';
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) 
                    dispatch(authLogin({ userData: userData, userId: userData.$id }));

                navigate("/");
            }
        } catch (error) {
            setError("Invalid email or password. Please try again.");
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
                <h2 className="text-center text-3xl font-semibold leading-tight text-gray-800">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 hover:underline transition duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email:"
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Input
                            label="Password:"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-200"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
