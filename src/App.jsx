import { Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./View/Auth/Login";
import Register from "./View/Auth/Signin";
import ResetPassword from "./View/Auth/ResetPassword";
import ForgotPassword from "./View/Auth/ForgotPassword";
import Home from "./View/Pages/Home";
import Artikel from "./View/Pages/Artikel";
import KategoriPage from './View/Pages/KategoriPage';
import ArtikelDetail from "./View/Pages/ArtikelDetail";
import Kontak from "./View/Pages/Kontak";
import Kategori from "./View/Pages/Kategori";
import CekKesehatan from "./View/Pages/CekKesehatan";
import Konsultasi from "./View/Pages/Konsultasi";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./View/Dashboard/Dashboard";
import MainLayout from "./View/Dashboard/layouts/MainLayout";
import CreateArticle from "./View/Dashboard/CreateArticle";
import CreateUser from "./View/Dashboard/CreateUser";
import Categories from "./View/Dashboard/Categories";
import UserList from "./View/Dashboard/UserList";
import ArticleList from "./View/Dashboard/ArticleList";
import Settings from "./View/Dashboard/Settings";
import Analytics from "./View/Dashboard/Analytics";
import Profile from "./View/Dashboard/Profile";
import SetupRoleAdmin from "./SetupRoleAdmin";
import SetupRoleUser from "./SetupRoleUser";
import Error404 from "./View/Errors/404";
import KesehatanList from "./View/Dashboard/KesehatanList";
import KonsultasiList from "./View/Dashboard/KonsultasiList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artikel" element={<Artikel />} />
      <Route path="/artikel/:id" element={<ArtikelDetail />} />
      <Route path="/kontak" element={<Kontak />} />
      <Route path="/kategori" element={<Kategori />} />
      <Route path="/kategori/:id" element={<KategoriPage />} />
      <Route path="/cek-kesehatan/:id" element={<CekKesehatan />} />
      <Route path="/konsultasi-penyakit" element={<Konsultasi />} />
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      {/* Home */}
      {/* <Route
        path="/home"
        element={
          <PrivateRoute>
            <SetupRoleUser>
              <Home />
            </SetupRoleUser>
          </PrivateRoute>
        }
      /> */}

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <SetupRoleAdmin>
              <MainLayout />
            </SetupRoleAdmin>
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="users" element={<UserList />} />
        <Route path="users/create" element={<CreateUser />} />
        <Route path="health-info" element={<ArticleList />} />
        <Route path="health-info/create" element={<CreateArticle />} />
        <Route path="health-info/categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="health" element={<KesehatanList />} />
        <Route path="konsultasi" element={<KonsultasiList />} />
      </Route>

      <Route path="/*" element={<Error404 />} />
      {/* loading */}
      <Route path="/percobaan" element={<SetupRoleAdmin />} />
    </Routes>
  );
}

export default App;
