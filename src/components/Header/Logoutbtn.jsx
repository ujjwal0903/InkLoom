import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const logoutHandler = async () => {
        setLoading(true);
        setError('');
        try {
            await authService.logout();
            dispatch(logout());
            navigate('/'); 
        } catch (err) {
            setError('Logout failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                className={`inline-block px-6 py-2 font-semibold text-white bg-gradient-to-r from-purple-500 to-indigo-600
                    hover:from-purple-600 hover:to-indigo-700 
                    transition-all duration-300 rounded-full shadow-lg transform hover:-translate-y-1 disabled:opacity-50`}
                onClick={logoutHandler}
                disabled={loading}
            >
                {loading ? 'Logging out...' : 'Logout'}
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    );
}

export default LogoutBtn;
