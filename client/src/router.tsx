import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import Layout from './layouts/Layout';
import Tasks from './components/tasks/Tasks';

const AppRouter = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path='/' element={<Tasks />} />
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
};

export default AppRouter;
