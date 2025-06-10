import React from 'react';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { 
  FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaSearch, FaBookmark, FaShare, 
  FaFacebook, FaTwitter, FaWhatsapp, FaInstagram, FaEnvelope, FaCalendarAlt, FaArrowRight
} from 'react-icons/fa';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';
import SubscriptionForm from '../../Component/SubscriptionForm';
import { articlePresenter } from '../../Presenter/ArtikelHomePresenter';

const ArticleCategoryView = () => {
  const {
    loading,
    activeSubcategory,
    error,
    filteredArticles,
    subcategories,
    getCategoryName,
    formatDate,
    truncateText,
    handleSubcategoryChange,
    handleRefresh
  } = articlePresenter.useArticleLogic();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <Button onClick={handleRefresh} variant="primary">Coba Lagi</Button>
        </div>
      </div>
    );
  }

  const featuredArticles = articlePresenter.getArticlesBySection(filteredArticles, 'featured');
  const sidebarArticles = articlePresenter.getArticlesBySection(filteredArticles, 'sidebar');
  const mainArticles = articlePresenter.getArticlesBySection(filteredArticles, 'main');
  const trendingTags = articlePresenter.getTrendingTags();
  const healthTools = articlePresenter.getHealthTools();
  const socialLinks = articlePresenter.getSocialMediaLinks();

  return (
    <div className="">
      {/* Navbar Component */}
      <NavbarComponent />

      <Container className="py-4">
        {/* Subcategory Navigation Component */}
        <SubcategoryNavigation 
          subcategories={subcategories}
          activeSubcategory={activeSubcategory}
          onSubcategoryChange={handleSubcategoryChange}
        />

        <Row>
          <Col lg={8}>
            {/* Featured Articles Component */}
            <FeaturedArticles 
              articles={featuredArticles}
              getCategoryName={getCategoryName}
              formatDate={formatDate}
            />
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Sidebar Components */}
            <TrendingTags tags={trendingTags} />
            <HealthTools tools={healthTools} />
            <ConsultationCTA />
            <NewsletterSubscription />
            <SocialMedia links={socialLinks} />
            
            {/* Sidebar Articles */}
            <SidebarArticles 
              articles={sidebarArticles}
              formatDate={formatDate}
              truncateText={truncateText}
            />
          </Col>
        </Row>
        
        <Row>
          <Col>
            {/* Main Article List Component */}
            <MainArticleList 
              articles={mainArticles}
              activeSubcategory={activeSubcategory}
              getCategoryName={getCategoryName}
              formatDate={formatDate}
              truncateText={truncateText}
            />
          </Col>
        </Row>
      </Container>

      {/* Footer Component */}
      <FooterComponent />

      {/* Custom Styles */}
      <CustomStyles />
    </div>
  );
};

// Subcategory Navigation Component
const SubcategoryNavigation = ({ subcategories, activeSubcategory, onSubcategoryChange }) => (
  <div className="bg-white border-bottom mb-2">
    <Container className="title-text subcategory-nav">
      <div className="overflow-auto">
        <Nav className="flex-nowrap py-2" style={{ whiteSpace: 'nowrap' }}>
          {subcategories.map(subcat => (
            <Nav.Item key={subcat.id}>
              <Nav.Link
                className={`mx-2 ${activeSubcategory === subcat.name ? 'fw-bold primary border_primary border-3' : 'text-dark'}`}
                onClick={() => onSubcategoryChange(subcat.name)}
                style={{ cursor: 'pointer' }}
              >
                {subcat.name} <span className="text-muted">({subcat.count})</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </Container>
  </div>
);

// Featured Articles Component
const FeaturedArticles = ({ articles, getCategoryName, formatDate }) => (
  <>
    {articles.map((artikel) => (
      <Card lg={3} md={9} className="mb-5 border-0 shadow-none " key={artikel.id}>
        <Row className="g-0">
          <a href={articlePresenter.getArticleUrl(artikel.id)} className='text-black d-flex flex-column horizontal-card"'>
            <Col md={12}>
              <Card.Img 
                src={artikel.images} 
                alt={artikel.judul}
                className="card-img-top h-100 object-fit-cover"
              />
            </Col>
            <Col md={12}>
              <Card.Body className="d-flex flex-column h-100 ">
                <div className="mb-2">
                  <Badge className="me-2 bg-gradient custom-badge">{getCategoryName(artikel.kategori_id)}</Badge>
                  <Badge bg="secondary custom-badge">Recommended</Badge>
                </div>
                <Card.Title className="h4 fw-bold">{artikel.judul}</Card.Title>
                <Card.Text className="text-muted" dangerouslySetInnerHTML={{__html: artikel.isi?.slice(0, 300)+ '...'}}></Card.Text>
                <div className="mt-auto">
                  <small className="text-muted">
                    {artikel.author}  <FaCalendarAlt className="me-1" /> {formatDate(artikel.createdAt)} • 10 menit baca
                  </small>
                </div>
              </Card.Body>
            </Col>
          </a>
        </Row>
      </Card>
    ))}
  </>
);

// Trending Tags Component
const TrendingTags = ({ tags }) => (
  <div className="bg-white p-3 rounded shadow-none mb-4 horizontal-card-trending">
    <h3 className="h5 mb-3">Trending Tags</h3>
    <div className="d-flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} bg="light" text="dark" className="py-2 px-3 rounded-pill border">
          #{tag}
        </Badge>
      ))}
    </div>
  </div>
);

// Health Tools Component
const HealthTools = ({ tools }) => (
  <Card className="border-0 shadow-sm mb-4 bg-gradient" 
    style={{ background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)' }}>
    <Card.Body className="p-4 text-white">
      <h3 className="h5 fw-bold mb-3">Tools Kesehatan</h3>
      <p className="small mb-3 opacity-75">
        Cek kondisi kesehatan Anda dengan tools interaktif kami
      </p>
      <Row className="g-2">
        {tools.map((tool, index) => (
          <Col xs={6} key={index}>
            <Card className="bg-white bg-opacity-25 border-0 text-white h-100 hover-card">
              <Card.Body className="p-3 text-center">
                <FaStethoscope className="mb-2" size={20} />
                <h6 className="small mb-0">{tool.title}</h6>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
);

// Consultation Component
const ConsultationCTA = () => (
  <Card className="border-0 shadow-none bg-gradient text-white mb-4">
    <Card.Body className="text-center p-4">
      <h3 className="h5 mb-3">Konsultasi Penyakit Sekarang</h3>
      <p className="small mb-3">Dapatkan jawaban untuk pertanyaan seputar kehamilan Anda.</p>
      <a href="/konsultasi-penyakit">
      <Button variant="light" className="primary">Konsultasi Sekarang</Button>
      </a>
    </Card.Body>
  </Card>
);

// Newsletter Component
const NewsletterSubscription = () => (
  <Card className="border-0 shadow-none bg-gradient text-white mb-4">
    <Card.Body className="p-4">
      <SubscriptionForm />
    </Card.Body>
  </Card>
);

// Social Media Component
const SocialMedia = ({ links }) => (
  <Card className="border-0 shadow-none bg-white border-primary primary d-none d-sm-block">
    <Card.Body>
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
    </Card.Body>
  </Card>
);

// Sidebar Articles Component
const SidebarArticles = ({ articles, formatDate, truncateText }) => (
  <Col lg={12}>
    <div className="d-flex justify-content-between align-items-center bg-white mt-4 mb-3">
      <h4 className="mb-0 title-h2">Semua Artikel</h4>
      <a href='#' className="px-4 primary text-decoration-none link-semua">Lihat Semua <FaArrowRight className="ms-2 link-semua" /></a>
    </div>
    <div className="card-body">
      <div className="row">
        {articles.slice(0, 3).map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <a href={articlePresenter.getArticleUrl(item.id)} className='text-black'>
              <div className="d-flex rounded overflow-hidden shadow-none">
                <img
                  src={item.images || 'default-image.png'}
                  className="img-fluid"
                  alt={item.judul}
                  style={{
                    width: '125px',
                    height: '105px',
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div className="p-2 d-flex flex-column justify-content-between">
                  <p className="card-text small text-muted mb-0">
                    <FaCalendarAlt className="me-1" />
                    {formatDate(item.createdAt)}
                  </p>
                  <div>
                    <h6 className="mb-1">{item.judul}</h6>
                    <p className="text-muted small mb-1" dangerouslySetInnerHTML={{__html: truncateText(item.isi, 90)}}>

                    </p>
                  </div>
                  
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  </Col>
);

// Main Article List Component
const MainArticleList = ({ articles, activeSubcategory, getCategoryName, formatDate, truncateText }) => (
  <>
    <div className="d-flex justify-content-between align-items-center">
      <h1 className="h2 mb-3 title-h2">Artikel {activeSubcategory} Terbaru</h1>
      <a href='#' className="px-4 primary text-decoration-none link-semua">Lihat Lebih Banyak <FaArrowRight className="ms-2" /></a>
    </div>
    <Row className="g-4">
      {articles.map((art) => (
        <Col md={4} key={art.id}>
          <Card className="h-100 border-0 shadow-none">
            <a href={articlePresenter.getArticleUrl(art.id)} className='text-black d-flex flex-column horizontal-card-artikel'>
              <div className="position-relative card-img-top">
                <Card.Img variant="top" src={art.images} alt={art.judul}/>
                <div className="position-absolute top-0 end-0 m-2 d-none d-sm-block">
                  <Button variant="light" size="sm" className="rounded-circle p-1">
                    <FaBookmark className="primary" />
                  </Button>
                </div>
              </div>
              <div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Badge className=" bg-gradient me-1 custom-badge">{getCategoryName(art.kategori_id)}</Badge>
                    <small><FaCalendarAlt className="me-1 custom-createAt" /> {formatDate(art.createdAt)} </small>
                  </div>
                  <Card.Title className="h5 title-card">{art.judul}</Card.Title>
                  <Card.Text className="text-muted small title-text" dangerouslySetInnerHTML={{__html: truncateText(art.isi, 200)}}></Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-0 d-none d-sm-block">
                  <small className="text-muted title-author">
                    {art.author} • 10 menit
                  </small>
                </Card.Footer>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  </>
);



const CustomStyles = () => (
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
);

export default ArticleCategoryView;