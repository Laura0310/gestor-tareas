import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import Button from '../shared/Button';
import useScroll from '../hooks/useScroll';

const NavBar = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const visible = useScroll();

    const handleLogout = (): void => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center py-3 px-6 bg-white shadow-lg transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            <div className='flex flex-row gap-2 items-center'>
                <i className='fa fa-solid fa-clipboard-list text-xl'></i>
                <h1 className='text-xl '>Gestor de Tareas</h1>
            </div>
            <Button
                onClick={handleLogout}
                className=' text-violet-800 hover:underline  rounded flex items-center gap-2'
            >
                Cerrar Sesión <i className='fas fa-sign-out-alt'></i>
            </Button>
        </nav>
    );
};

export default NavBar;