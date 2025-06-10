import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import axios from "axios";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  InputGroup,
  Button,
  Dropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaStethoscope,
  FaPhoneAlt,
  FaComments,
  FaHeartbeat,
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import NavbarComponentPresenter from "../Presenter/NavbarComponentPresenter";
import Dashboard from "../Model/modelDashboard";

const NavbarComponent = () => {
  const [user, setUser] = useState(null);
  const [categoires, setCategories] = useState(null);
  const navigate = useNavigate();


  const presenter = new NavbarComponentPresenter({
    model: Dashboard,
    view: {
      setCategories: setCategories,
      setUser: setUser,
      navigate: navigate
    }
  });

  async function handleLogout() {
    await presenter.Logout();
  }

  useEffect(() => {
    presenter.getKategori();
    presenter.getUser();
  }, []);

  const handleSelect = async (id) => {
    if (!user) {
      return navigate("/login");
    }
    navigate(`/cek-kesehatan/${id}`);
  };

  return (
    <Navbar bg="white" expand="lg" className="py-3 shadow-sm sticky-top">
      <Container fluid className="me-3 mx-3">
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img className="img-fluid d-block" width="100" style={{ maxWidth: '80px' }} src="/image/LogoHealth.png" alt="LogoKesehatanKu" />
          <span>
            <img className="img-fluid d-block" width="100" style={{ maxWidth: '80px' }} src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex align-items-center">
            <NavDropdown title={
              <>
                <FaHeartbeat className="me-1" />
                Kategori Kesehatan
              </>
            } id="nav-dropdown">
              {categoires ? (
                categoires.map((kategori) => (
                  <NavDropdown.Item
                    key={kategori.id}
                    href={`/kategori/${kategori.id}`}
                  >
                    <img
                      src={kategori.images || "default-image.png"}
                      alt={kategori.nama_kategori}
                      style={{
                        width: 30,
                        height: 30,
                        objectFit: "cover",
                        borderRadius: "50%",
                        marginRight: 10,
                      }}
                    />
                    {kategori.nama_kategori}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>Tidak ada kategori</NavDropdown.Item>
              )}
            </NavDropdown>

            <NavDropdown
              title={
                <>
                  <FaStethoscope className="me-1" />
                  Cek Kesehatan
                </>
              }
              id="cek-kesehatan-dropdown"
            >
              {categoires?.map(value => (
                <NavDropdown.Item onClick={() => handleSelect(value.id)} key={value.id}>
                  {value.nama_kategori}
                </NavDropdown.Item>
              )).slice(0, 3)}
            </NavDropdown>

            <Nav.Link href="/kontak" className="mx-2 d-flex align-items-center">
              <FaPhoneAlt className="me-1" />
              <span>Kontak</span>
            </Nav.Link>

            <Nav.Link href="/konsultasi-penyakit" className="mx-2 d-flex align-items-center">
              <FaComments className="me-1" />
              <span>Konsultasi Kesehatan</span>
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center mx-auto text-center justify-content-center">
            <Form className="d-flex me-3 d-none d-sm-block">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Cari informasi kesehatan..."
                  aria-label="Search"
                />
                <Button variant="primary">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>
            {user ? 
              <Dropdown align="end" className="user-dropdown">
                <Dropdown.Toggle variant="link" id="user-dropdown">
                  <img 
                    src="/image/profile-default.jpg" 
                    alt="User" 
                    className="user-avatar" 
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="user-info">
                    <h6>{user?.name}</h6>
                  </div>
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Keluar
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> :
              <Button
                variant="primary"
                href="/login"
                className="border text-white"
              >
                Masuk
              </Button>}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
<style jsx>{`
  .bg-gradient {
    background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
  }
  .btn-primaryy {
    background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%);
    color: white;
    border: none;
    transition: all 0.3s ease;
  }
  .primary {
    color: #0c54b7;
  }
  .border_primary {
    border-bottom: 2px solid #0c54b7;
  }
  .btn-primaryy:hover {
    background: linear-gradient(135deg, #1573b1 10%, #1d53b1 90%);
    color: white;
  }
`}</style>;

export default NavbarComponent;
