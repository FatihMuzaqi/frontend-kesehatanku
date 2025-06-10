import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router";
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import {
  FaFacebook,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import SubscriptionForm from './SubscriptionForm';

const FooterComponent = () => {
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/kategori');
        setKategoriKesehatan(res.data.data); // sesuaikan struktur response
      } catch (error) {
        console.error('Gagal mengambil kategori:', error);
      }
    };

    fetchKategori();
  }, []);
  const handleSelect = (id) => {
    navigate(`/cek-kesehatan/${id}`);
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <img width="100" src="/image/LogoHealth.png" alt="LogoKesehatanKu" />
            <span>
              <img width="100" src="/image/kementrian-sehat.webp" alt="LogoKementrian" />
            </span>
            <p>
              Website ini menyediakan informasi kesehatan yang terpercaya, serta menawarkan layanan cek kesehatan dan konsultasi penyakit dengan akses secara gratis. Dengan sumber berbasis artikel dan Machine Learning, kami membantu Anda menjalani hidup yang lebih sehat melalui panduan dan layanan yang mudah diakses kapan saja.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="https://www.facebook.com" className="text-white fs-5" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" className="text-white fs-5" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="text-white fs-5" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://www.youtube.com" className="text-white fs-5" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </Col>
          <Col md={2} xs={6} className="mb-4">
            <h5 className="fw-bold mb-4">Kategori</h5>
            <ul className="list-unstyled">
              {kategoriKesehatan.length > 0 ? (
                kategoriKesehatan.map((kategori, index) => (
                  <li className="mb-2" key={index}>
                    <a href={`/kategori/${kategori.id}`} className="text-white text-decoration-none">
                      {kategori.nama_kategori}
                    </a>
                  </li>
                ))
              ) : (
                <li className="mb-2 text-white">Tidak ada kategori</li>
              )}
            </ul>
          </Col>
          <Col md={2} xs={6} className="mb-4">
            <h5 className="fw-bold mb-4">Layanan</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/konsultasi-penyakit" className="text-white text-decoration-none">Konsultasi Penyakit</a>
              </li>
              <ul className="ps-0">
                <li className="mb-2 fw-semibold text-white list-unstyled">Cek Kesehatan</li>
                <li className="text-white" style={{ listStyleType: 'disc', marginLeft: '1.25rem' }}>
                  <a href="#" onClick={() => handleSelect(1)} className="text-white text-decoration-none">Cacar Air</a>
                </li>
                <li className="text-white" style={{ listStyleType: 'disc', marginLeft: '1.25rem' }}>
                  <a href="#" onClick={() => handleSelect(2)} className="text-white text-decoration-none">DBD</a>
                </li>
                <li className="text-white" style={{ listStyleType: 'disc', marginLeft: '1.25rem' }}>
                  <a href="#" onClick={() => handleSelect(3)} className="text-white text-decoration-none">Alergi</a>
                </li>
              </ul>
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <SubscriptionForm />
            <h3 className="h5 mb-3">Ikuti Kami</h3>
              <div className="d-flex justify-content-between">
                    <Button variant="outline-light" className="rounded-circle p-2">
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                      </a>
                    </Button>
                    <Button variant="outline-light" className="rounded-circle p-2">
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                      </a>
                    </Button>
                    <Button variant="outline-light" className="rounded-circle p-2">
                      <a href="https://wa.me/085713296692" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp />
                      </a>
                    </Button>
                    <Button variant="outline-light" className="rounded-circle p-2">
                      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                      </a>
                    </Button>
                    <Button variant="outline-light" className="rounded-circle p-2">
                      <a href="mailto:kesehatanku@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope />
                      </a>
                    </Button>
              </div>
          </Col>
        </Row>
        <hr />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0 title-text">© 2025 KesehatanKU. Hak Cipta Dilindungi.</p>
          <div className='title-text'>
            <a href="#" className="text-white text-decoration-none me-3">Syarat dan Ketentuan</a>
            <a href="#" className="text-white text-decoration-none me-3">Kebijakan Privasi</a>
            <a href="#" className="text-white text-decoration-none">Kontak</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
        }
        .btn-primary {
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
        .btn-primary:hover {
          background: linear-gradient(135deg, #1573b1 10%, #1d53b1 90%);
          color: white;
        }
      `}</style>

export default FooterComponent;
