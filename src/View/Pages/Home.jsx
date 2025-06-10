import { useEffect, useState } from "react";
import { Navigate  } from "react-router";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Card,
  Carousel,
  Row,
  Col,
  Form,
  InputGroup,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import {
  FaSearch,
  FaHeartbeat,
  FaStethoscope,
  FaPhoneAlt,
  FaComments,
  FaArrowRight,
  FaUserMd,
} from "react-icons/fa";
import { HomePresenter } from '../../Presenter/HomePresenter';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';

export default function Home() {
  const role = "user"; 
  const isUser = role !== "admin";

  return isUser ? <HomeView /> : <Navigate to="/dashboard" />;
}

function HomeView() {
  const [state, setState] = useState({
    artikel: [],
    kategoriKesehatan: [],
    artikelCountPerKategori: [],
    top3Kategori: [],
    shuffledArticles: [],
    sortedArticles: [],
    loading: true,
    error: null
  });

  const [presenter] = useState(() => new HomePresenter({
    setLoading: (loading) => setState(prev => ({ ...prev, loading })),
    
    updateData: (data) => setState(prev => ({ 
      ...prev, 
      ...data,
      loading: false 
    })),
    
    showError: (error) => setState(prev => ({ 
      ...prev, 
      error, 
      loading: false 
    })),
    
    navigateToArticle: (articleId) => {
      window.location.href = `/artikel/${articleId}`;
    },
    
    navigateToCategory: (categoryId) => {
      window.location.href = `/kategori/${categoryId}`;
    },
    
    navigateToAllArticles: () => {
      window.location.href = "/artikel";
    }
  }));

  useEffect(() => {
    presenter.initialize();
  }, [presenter]);


  if (state.loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        {state.error}
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Navbar */}
    <NavbarComponent />

      {/* Hero Carousel */}
      <Carousel className="hero-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide/2.png"
            alt="First slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Informasi Kesehatan Terpercaya</h3>
            <p>Temukan artikel kesehatan terverifikasi oleh tim medis profesional</p>
            <Button variant="primary">Jelajahi Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide/3.png"
            alt="Second slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Konsultasi dengan Dokter</h3>
            <p>Layanan konsultasi online dengan dokter spesialis terpercaya</p>
            <Button variant="primary">Konsultasi Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/image/slide/1.png"
            alt="Third slide"
          />
          <Carousel.Caption className="text-start bg-dark bg-opacity-50 rounded p-3">
            <h3>Cek Kesehatan Online</h3>
            <p>Evaluasi kondisi kesehatan Anda secara cepat dan akurat</p>
            <Button variant="primary">Cek Sekarang</Button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Trending Topics Section */}
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="fw-bold  title-h2">Topik Kesehatan Trending</h2>
          <Button
            variant="link"
            onClick={() => presenter.onNavigateToAllArticles()}
            className="text-decoration-none d-flex align-items-center link-semua"
          >
            Lihat Semua <FaArrowRight className="link-semua"/>
          </Button>
        </div>
        <Row>
          <Col md={9} >
            <Row>
              {state.shuffledArticles.slice(0, 3).map((artikel) => (
                <Col md={4} xs={12} className="mb-3" key={artikel.id}>
                  <Card
                    className="h-100 border-0 shadow-none d-flex flex-column horizontal-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => presenter.onNavigateToArticle(artikel.id)}
                  >
                    <Card.Img
                      variant="top"
                      src={artikel.images || 'default-image.png'}
                      className="card-img-top"
                    />
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-gradient custom-badge">
                          {presenter.getCategoryName(artikel.kategori_id, state.kategoriKesehatan)}
                        </span>
                        <small className="text-muted custom-createAt">
                          {presenter.formatDate(artikel.createdAt)}
                        </small>
                      </div>
                      <Card.Title className="fw-bold title-card">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text
                        className="text-muted title-text"
                        dangerouslySetInnerHTML={{
                          __html: presenter.truncateText(artikel.isi, 150),
                        }}
                      />
                      <p className="small text-muted title-author">{artikel.author}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={3} sm={2}  xs={2}>
            <Card className="border-0 shadow-sm d-none d-sm-block">
              <Card.Header className="bg-gradient text-white">
                <h5 className="mb-0">Kategori Populer</h5>
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  {state.kategoriKesehatan.map(kategori => {
                    const count = state.artikelCountPerKategori.find(k => k.id === kategori.id)?.count || 0;
                    return (
                      <li
                        key={kategori.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => presenter.onNavigateToCategory(kategori.id)}
                      >
                        <div className="d-flex align-items-center">
                          <span className="me-2">{kategori.icon}</span>
                          {kategori.nama_kategori}
                        </div>
                        <span className="badge bg-light text-dark rounded-pill">
                          {count}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Recent Articles Slider */}
      <div className="bg-light py-4">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h2 className="fw-bold title-h2">Informasi Kesehatan Terbaru</h2>
            <Button
              variant="link"
              onClick={() => presenter.onNavigateToAllArticles()}
              className="text-decoration-none d-flex align-items-center link-semua"
            >
              Lihat Semua <FaArrowRight className="link-semua" />
            </Button>
          </div>
          <div className="recent-articles">
            <Row>
              {state.sortedArticles.slice(0, 4).map((artikel) => (
                <Col lg={3} md={6} className="mb-4" key={artikel.id}>
                  <Card 
                    className="border-0 bg-light shadow-none h-100 d-flex flex-column horizontal-card"
                    style={{ cursor: 'pointer' }}
                    onClick={() => presenter.onNavigateToArticle(artikel.id)}
                  >
                    <Card.Img variant="top" src={artikel.images || 'default-image.png'} />
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="badge bg-gradient custom-badge">
                          {presenter.getCategoryName(artikel.kategori_id, state.kategoriKesehatan)}
                        </span>
                        <small className="text-muted custom-createAt">
                            {presenter.formatDate(artikel.createdAt)}
                          </small>
                          </div>
                      <Card.Title className="fw-bold text-black title-card">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text className="text-muted title-text" dangerouslySetInnerHTML={{__html: presenter.truncateText(artikel.isi, 150)}}>
                      </Card.Text>
                      <p className="small text-muted title-author">{artikel.author}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>

      {/* Middle Banner */}
      <div className="position-relative container-fluid">
        <img
          src="/image/promosi-kesehatan.png"
          className="img-fluid"
          alt="Promosi Kesehatan"
        />
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white bg-dark bg-opacity-50 p-4 rounded d-none d-sm-block">
          <h2 className="fw-bold mb-3 h2-banner">
            Mari Mulai Hari Ini! Kesehatan Anda, Tanggung Jawab Anda.
          </h2>
          <p className="mb-4 title-p">
            Dapatkan informasi kesehatan terpercaya dan Konsultasi Penyakit Anda
          </p>
          <Button href="/artikel" className="btn btn-primary btn-banner" variant="light" size="lg">
            Mulai Sekarang
          </Button>
        </div>
      </div>

      {/* Category Recommendations */}
      <Container className="py-5">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-4 title-h2">Kategori Rekomendasi</h2>
          <a
            variant="link"
            href="/kategori"
            className="text-decoration-none d-flex align-items-center fs-6 fs-md-5 link-semua"
          >
            Lihat Semua <FaArrowRight className="ms-2" />
          </a>
        </div>
        <Row className="g-2">
          {state.top3Kategori.map((kategori) => (
            <Col xs={4} sm={4} md={4} lg={4} key={kategori.id}>
              <a href={`/kategori/${kategori.id}`} style={{ textDecoration: 'none' }}>
                <Card 
                  className="text-white border-0 shadow-sm"
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img
                    src={kategori.images || "/api/placeholder/400/250"}
                    alt={kategori.nama_kategori}
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                  <Card.ImgOverlay className="d-flex align-items-end bg-dark bg-opacity-50">
                    <div>
                      <Card.Title className="fw-bold">{kategori.nama_kategori}</Card.Title>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Angled Articles Section */}
      <div className="bg-white py-5">
        <Container>
          <h2 className="fw-bold mb-4">Artikel Pilihan</h2>
          <Row className="g-4">
            {state.shuffledArticles.slice(0, 2).map((artikel) => (
            <Col md={6} key={artikel.id}>
              <Card 
                className="border-0 shadow-none h-100 transform-card d-flex flex-column horizontal-card"
                style={{ cursor: 'pointer' }}
                onClick={() => presenter.onNavigateToArticle(artikel.id)}
              >
                <Row className="g-0">
                  <Col md={6}>
                    <Card.Img
                      src={artikel.images || 'default-image.png'}
                      alt={artikel.judul}
                      className="h-100 object-fit-cover"
                    />
                  </Col>
                  <Col md={6}>
                    <Card.Body>
                      <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-danger mb-2">
                        {presenter.getCategoryName(artikel.kategori_id, state.kategoriKesehatan)}
                      </span>
                      <small className="text-muted">
                          {presenter.formatDate(artikel.createdAt)}
                        </small>
                      </div>
                      <Card.Title className="fw-bold text-black">
                        {artikel.judul}
                      </Card.Title>
                      <Card.Text className="text-muted" dangerouslySetInnerHTML={{__html: presenter.truncateText(artikel.isi, 180)}}>
                      </Card.Text>
                      <p className="small text-muted">{artikel.author}</p>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Information Banner */}
      <div className="bg-gradient text-white py-5">
        <Container className="text-center">
          <h2 className="fw-bold mb-4">
            KesehatanKU Memberi Anda Informasi yang Paling Dibutuhkan
          </h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100 ">
                <div className="fs-1 mb-3">
                  <FaUserMd />
                </div>
                <h4>Artikel Terpercaya</h4>
                <p>
                  Semua informasi kesehatan adalah artikel terpercaya kami
                </p>
              </div>
            </Col>
            <Col md={4} sm={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100">
                <div className="fs-1 mb-3">
                  <FaStethoscope />
                </div>
                <h4>Konsultasi Penyakit</h4>
                <p>
                  Terhubung dengan konsultasi Penyakit
                  Anda kapan saja
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 bg-white bg-opacity-10 rounded h-100">
                <div className="fs-1 mb-3">
                  <FaHeartbeat />
                </div>
                <h4>Cek Kesehatan</h4>
                <p>
                  Lakukan pengecekan kesehatan dasar secara online dengan fitur
                  kami yang inovatif
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
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
\
      `}</style>
    </div>
  );
}