import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { Container, Row, Col, Nav, Navbar, Button, Dropdown, Badge } from 'react-bootstrap';
import { 
  FaTachometerAlt, FaUserMd, FaUsers, FaNewspaper, 
  FaCog, FaChartBar, FaBars, FaBell, FaSignOutAlt, 
  FaUser, FaPlus, FaListUl, FaSearch, FaMoon, FaSun
} from 'react-icons/fa';
import MainLayoutPresenter from '../../../Presenter/MainLayoutPresenter';
import Model from '../../../Model/Model';

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();


  const presenter = new MainLayoutPresenter({
    model: Model,
    view: {
      setUser: setUser,
      navigate: navigate
    }
  });

  useEffect(() => {
    presenter.getUser();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // Implementasi dark mode di sini (menambahkan/menghapus class di body)
    if (!darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleLogout = () => {
    presenter.Logout();
  };

  // Menu navigasi untuk sidebar
  const navigationItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
    { 
      path: '/dashboard/users', 
      icon: <FaUsers />, 
      label: 'Manajemen User',
      submenu: [
        { path: '/dashboard/users', icon: <FaListUl />, label: 'Daftar User' },
        { path: '/dashboard/users/create', icon: <FaPlus />, label: 'Tambah User' }
      ]
    },
    { 
      path: '/dashboard/health-info', 
      icon: <FaNewspaper />, 
      label: 'Artikel Kesehatan',
      submenu: [
        { path: '/dashboard/health-info', icon: <FaListUl />, label: 'Daftar Artikel' },
        { path: '/dashboard/health-info/create', icon: <FaPlus />, label: 'Tambah Artikel' },
        { path: '/dashboard/health-info/categories', icon: <FaListUl />, label: 'Kategori' }
      ]
    },
    { path: '/dashboard/health', icon: <FaChartBar />, label: 'Cek Kesehatan' },
    { path: '/dashboard/konsultasi', icon: <FaChartBar />, label: 'Konsultasi Penyakit' },
    { path: '/dashboard/settings', icon: <FaCog />, label: 'Pengaturan' },
    { path: '/dashboard/profile', icon: <FaUser />, label: 'Profil' }
  ];

  return (
    <div className={`dashboard-layout ${darkMode ? 'dark-mode' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2 className="logo d-flex align-items-center">
            <img 
            onClick={toggleSidebar}
              src={sidebarCollapsed ? "/image/logo-healt.png" : "/image/logo-healt.png"} 
              alt="Logo" 
              className="logo-img"
              style={{ height: "60px" }} 
            />
          </h2>
          <Button 
            variant="link" 
            onClick={toggleSidebar} 
            className="sidebar-toggle d-none d-md-block"
          >
            <FaBars />
          </Button>
        </div>
        
        <Nav className="flex-column sidebar-nav media-screen-600">
          {navigationItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            if (item.submenu) {
              return (
                <div key={index} className="nav-item-with-submenu">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span className="icon">{item.icon}</span>
                    {!sidebarCollapsed && <span className="label">{item.label}</span>}
                  </Link>
                  {!sidebarCollapsed && (
                    <div className="submenu">
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          to={subitem.path}
                          className={`nav-link ${location.pathname === subitem.path ? 'active' : ''}`}
                        >
                          <span className="icon">{subitem.icon}</span>
                          <span className="label">{subitem.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={index}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {!sidebarCollapsed && <span className="label">{item.label}</span>}
              </Link>
            );
          })}
        </Nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        {/* Top Navigation */}
        <Navbar bg={darkMode ? 'dark' : 'white'} variant={darkMode ? 'dark' : 'light'} className="top-navbar">
          <Container fluid>
            <Button 
              variant="link" 
              onClick={toggleSidebar} 
              className="sidebar-toggle d-md-none"
            >
              <FaBars />
            </Button>
            
            <div className="search-bar">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Cari..." />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </div>
            </div>
            
            <div className="navbar-actions d-flex align-items-center">
              <Button 
                variant="link" 
                onClick={toggleDarkMode} 
                className="theme-toggle"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </Button>
              
              <Dropdown align="end" className="user-dropdown">
                <Dropdown.Toggle variant="link" id="user-dropdown">
                  <img 
                    src="/image/profile-2.png" 
                    alt="User" 
                    className="user-avatar" 
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="user-info">
                    <h6>{user?.name}</h6>
                    <small className="text-muted">Administrator</small>
                  </div>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/dashboard/profile" state={{user}}>
                    <FaUser className="me-2" /> Profil
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard/settings">
                    <FaCog className="me-2" /> Pengaturan
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Keluar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>
        
        {/* Page Content */}
        <div className="page-content">
          <Container fluid>
            {children || <Outlet />}
          </Container>
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <Container fluid>
            <Row>
              <Col md={6}>
                <p className="mb-0">
                  &copy; {new Date().getFullYear()} Sistem Informasi Kesehatan. All rights reserved.
                </p>
              </Col>
              <Col md={6} className="text-md-end">
                <p className="mb-0">
                  Private Room
                </p>
              </Col>
            </Row>
          </Container>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;