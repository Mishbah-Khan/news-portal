import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import HomePage from '../pages/Home.page.jsx';
import SingleNewsPage from '../pages/news/SingleNews.page.jsx';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard.jsx';
import CreateNews from '../pages/news/CreateNews.jsx';
import AboutPage from '../pages/About.page.jsx';
import NewsPage from '../pages/news/NewsPage.jsx';
import EditNews from '../pages/news/EditNews.jsx';
import ProfilePage from '../pages/Profile.page.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<SingleNewsPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create-news" element={<CreateNews />} />
          <Route path="/dashboard/edit-news/:id" element={<EditNews />} />
          <Route path="/dashboard/news/:id" element={<SingleNewsPage />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
