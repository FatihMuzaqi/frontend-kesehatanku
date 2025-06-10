import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup, Spinner,Breadcrumb  } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaSearch,
} from 'react-icons/fa';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';
import { Link } from 'react-router';

const KategoriPage = () => {
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');


  const fetchKategori = async () => {
    try {
      const kategoriRes = await axios.get("http://localhost:5000/api/kategori");
      const artikelRes = await axios.get("http://localhost:5000/api/artikel");

      const kategoriData = kategoriRes.data.data;
      const artikelData = artikelRes.data.data;

      const kategoriWithCount = kategoriData.map(k => {
        const count = artikelData.filter(a => String(a.kategori_id) === String(k.id)).length;
        return { ...k, count };
      });

      setKategoriList(kategoriWithCount);
    } catch (err) {
      console.error("Gagal mengambil kategori:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);

  const filteredKategori = kategoriList.filter((kategori) =>
    kategori.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div className="kategori">
        {/* Navbar */}
        <NavbarComponent />
        <Container className="mb-4 mt-4">
            <div className="text-center mb-5">
                <h3 className="mb-4 fw-bold" style={{background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent',}}>Pilih Kategori Informasi Kesehatan</h3>
                {/* Search bar */}
                <Form className="d-flex justify-content-center">
                    <Form.Control
                    type="search"
                    placeholder="Cari kategori..."
                    className="w-75 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form>
            </div>
        <Row>
            {filteredKategori.length > 0 ? (
            filteredKategori.map((kategori) => (
                <Col key={kategori.id} md={4} xs={6} className="mb-4">
                  <a href={`/kategori/${kategori.id}`} style={{ textDecoration: 'none' }}>
                    <Card className="h-100 shadow-sm border-0">
                        <Card.Img 
                            variant="top" 
                            src={kategori.images || '/image/default-kategori.jpg'} 
                            style={{ height: '200px', objectFit: 'cover' }} 
                            alt={kategori.nama_kategori}
                        />
                        <Card.Body>
                            <Card.Title className="fw-semibold">{kategori.nama_kategori}</Card.Title>
                            <Card.Text className="text-muted">
                            {kategori.count} artikel tersedia
                            </Card.Text>
                        </Card.Body>
                    </Card>
                  </a>
                </Col>
            ))
            ) : (
            <Col>
                <p className="text-muted">Belum ada kategori tersedia.</p>
            </Col>
            )}
        </Row>
        </Container>
        {/* Footer */}
        <FooterComponent />

        <style jsx>{`
        .bg-gradient {
        background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
        }

        .primary {
        color: #0c54b7;
        }
        .border_primary {
        border-bottom: 2px solid #0c54b7;
        }
    `}</style>
    </div>
  );
};


export default KategoriPage;
