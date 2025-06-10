import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Dropdown, NavDropdown, Navbar, Container, Row, Col, Card, Button, Form, Badge, Nav, InputGroup } from 'react-bootstrap';
import { FaSearch, FaPhoneAlt, FaComments, FaStethoscope, FaHeartbeat, FaCalendarAlt, FaUser, FaShare, FaBookmark, FaPrint, FaThumbsUp, FaThumbsDown, FaEye, FaClock, FaTag, FaArrowLeft, FaHome, FaChevronRight } from 'react-icons/fa';
import { ArticlePresenter } from '../../Presenter/DetailArtikelPresenter';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';
import SubscriptionForm from '../../Component/SubscriptionForm';

const ArticleDetailPage = () => {

  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artikel, setArtikel] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [kategoriKesehatan, setKategoriKesehatan] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeStatus, setLikeStatus] = useState(null);
  const [showShareAlert, setShowShareAlert] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const { id } = useParams();
  const presenter = new ArticlePresenter({
    view: {
      setLoading: (loading) => setLoading(loading),
      setArticleData: (data) => setArtikel(data),
      setCategories: (categories) => setKategoriKesehatan(categories),
      setRelatedArticles: (articles) => setRandomArticles(articles),
      setPopularArticles: (articles) => setPopularArticles(articles),
      showError: (message) => setError(message),
      updateLikeStatus: setLikeStatus,
      updateBookmarkStatus: (status) => setIsBookmarked(status),
      showShareSuccess: () => {
        setShowShareAlert(true);
        setTimeout(() => setShowShareAlert(false), 3000);
      },
      showShareError: () => alert('Gagal menyalin link'),
      showNewsletterSuccess: (message) => alert(message),
      showNewsletterError: (message) => alert(message),
      clearNewsletterEmail: () => setEmail(''),
      setUser: setUser,
      setLikes: setLikes
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    presenter.getUser(id);
    presenter.loadArticleData(id);
    presenter.getLikes(id);
  }, []);

  const handleLike = async (status) => {
    if (!user) {
      return navigate("/login");
    }

    await presenter.handleLike(user?.userID, id, status);
  };

  const handleBookmark = () => {
    presenter.handleBookmark(isBookmarked);
  };

  const handleShare = () => {
    presenter.handleShare();
  };

  const handlePrint = () => {
    presenter.handlePrint();
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    presenter.handleNewsletterSubmit(email);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h4>{error}</h4>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="text-center mt-5">
        <h4>Artikel tidak ditemukan</h4>
      </div>
    );
  }

  return (
    <div className="min-vh-100">
      <NavbarComponent />
      <div className="container pt-5 pb-5">
        <div className="row">
          {/* Article Content */}
          <div className="col-lg-8">
            <div className="mb-4">
              <div className="card-body p-4">
                {/* Article Header */}
                <div className="mb-3">
                  <span className="badge bg-gradient mb-1" style={{ width: '100px' }}>
                    {presenter.getCategoryName(kategoriKesehatan, artikel.kategori_id)}
                  </span>
                  <h1 className="h2 mb-3">{artikel.judul}</h1>
                  <img
                    src={artikel.images || 'default-image.png'}
                    alt={artikel.judul}
                    className="img-fluid rounded"
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                  />
                  <p className="text-black mw-100 word-break overflow-wrap-break-word" style={{ maxWidth: 800 + 'px' }}>
                    <div dangerouslySetInnerHTML={{ __html: artikel.isi }}></div>
                  </p>
                </div>

                {/* Article Meta */}
                <div className="d-flex flex-wrap align-items-center mb-4 text-muted small">
                  <div className="me-4 mb-2">
                    <FaUser className="me-1" />
                    {artikel.author}
                  </div>
                  <div className="me-4 mb-2">
                    <FaCalendarAlt className="me-1" />
                    {artikel.createdAt}
                  </div>
                  <div className="me-4 mb-2">
                    <FaClock className="me-1" />
                    {presenter.createAt(artikel.createdAt)}
                  </div>
                  <div className="me-4 mb-2">
                    <FaThumbsUp className="mx-1" />
                    {likes?.filter(value => value.status === 'like').length} likes
                  </div>
                  <div className="me-4 mb-2">
                    <FaThumbsDown className="mx-1" />
                    {likes?.filter(value => value.status === 'dislike').length} dislikes
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mb-4">
                  <button
                    className={`btn ${likeStatus === 'like' ? 'btn-success' : 'btn-outline-success'} btn-sm`}
                    onClick={() => handleLike('like')}
                  >
                    <FaThumbsUp className="me-1" />
                    {artikel.likes}
                  </button>
                  <button
                    className={`btn ${likeStatus === 'dislike' ? 'btn-danger' : 'btn-outline-danger'} btn-sm`}
                    onClick={() => handleLike('dislike')}
                  >
                    <FaThumbsDown className="me-1" />
                    {artikel.dislikes}
                  </button>
                  <button
                    className={`btn ${isBookmarked ? 'btn-warning' : 'btn-outline-warning'} btn-sm`}
                    onClick={handleBookmark}
                  >
                    <FaBookmark className="me-1" />
                    {isBookmarked ? 'Tersimpan' : 'Simpan'}
                  </button>
                  <button className="btn btn-outline-primary btn-sm" onClick={handleShare}>
                    <FaShare className="me-1" />
                    Bagikan
                  </button>
                  <button className="btn btn-outline-secondary btn-sm" onClick={handlePrint}>
                    <FaPrint className="me-1" />
                    Cetak
                  </button>
                </div>

                {showShareAlert && (
                  <div className="alert alert-success py-2" role="alert">
                    Link artikel berhasil disalin ke clipboard!
                  </div>
                )}
                {/* Tags */}
                <div className="mt-4 pt-3 border-top">
                  <div className="mb-2">
                    <FaTag className="me-2 text-muted" />
                    <strong>Tags:</strong>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {artikel.tags && artikel.tags.map((tag, index) => (
                      <span key={index} className="badge bg-light text-dark px-2 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <Row className="mb-4">
              <Col lg={12} xs={6} sm={6}>
                <div className="mb-3">
                  <div className="card-header bg-white">
                    <h5 className="mb-0 title-h2">Artikel Populer</h5>
                  </div>
                  <div className="list-group list-group-flush title-text">
                    {popularArticles.map((popularArticle) => (
                      <div key={popularArticle.id} className="list-group-item border-0 py-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="flex-grow-1">
                            <h6 className="mb-1 title-text">{popularArticle.judul}</h6>
                            <div className="small text-muted">
                              <span className="me-3">
                                <FaTag className="me-1" />
                                {presenter.getCategoryName(kategoriKesehatan, popularArticle.kategori_id)}
                              </span>
                              <span>
                                <FaEye className="me-1" />
                                {popularArticle.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              <Col lg={12} xs={6} sm={6}>
                <div className="mb-3">
                  <div className="card-header bg-white">
                    <h5 className="mb-0 title-h2">Kategori Kesehatan</h5>
                  </div>
                  <div className="list-group list-group-flush title-text">
                    {kategoriKesehatan.map((category, index) => (
                      <Link to={`/kategori/${category.id}`} key={index} className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                          <FaHeartbeat className="me-2 primary" />
                          {category.nama_kategori}
                        </div>
                        <span className="badge bg-light text-dark">{category.count || 0}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
            {/* Newsletter Subscription */}
            <div className="card shadow-sm d-none d-sm-block">
              <div className="card-body">
                <SubscriptionForm />
              </div>
            </div>

            <div className="bg-white mt-4 mb-3">
              <h4 className="mb-0">Semua Artikel</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {randomArticles.map((item) => (
                  <div key={item.id} className="col-12 mb-3">
                    <a href={`/artikel/${item.id}`} className='text-black'>
                      <div className="d-flex rounded overflow-hidden shadow-none">
                        <img
                          src={item.images || 'default-image.png'}
                          className="img-fluid"
                          alt={item.judul}
                          style={{
                            width: '120px',
                            height: '120px',
                            objectFit: 'cover',
                            flexShrink: 0,
                          }}
                        />

                        <div className="p-2 d-flex flex-column justify-content-between">
                          <div className='d-flex justify-content-between align-items-center'>
                            <span className="badge bg-gradient mb-1" style={{ width: '100px' }}>
                              {presenter.getCategoryName(kategoriKesehatan, artikel.kategori_id)}
                            </span>
                            <p className="card-text small text-muted mb-0 title-createdAt">
                              <FaCalendarAlt className="me-1" />
                              {presenter.formatDate(item.createdAt)}
                            </p>
                          </div>
                          <div>
                            <h6 className="mb-1">{item.judul}</h6>
                            <p className="text-muted small">
                              <div dangerouslySetInnerHTML={{ __html: item.isi?.slice(0, 90) + '...' }}></div>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="bg-white">
            <h3 className="mb-3 title-h2">Artikel Terkait</h3>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              {randomArticles.map((item) => (
                <div key={item.id} className="col-12 mb-4">
                  <a href={`/artikel/${item.id}`} className='text-black'>
                    <div className="row h-100 shadow-none">
                      <div className="col-12 col-md-6">
                        <img
                          src={item.images || 'default-image.png'}
                          className="img-fluid w-100"
                          alt={item.judul}
                          style={{ height: '100%', maxHeight: '300px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-12 col-md-6 d-flex flex-column justify-content-center p-3">
                        <span className="badge bg-gradient mb-1" style={{ width: '100px' }}>
                          {presenter.getCategoryName(kategoriKesehatan, item.kategori_id)}
                        </span>
                        <h3 className="card-title">{item.judul}</h3>
                        <p className="text-muted word-break overflow-wrap-break-word" dangerouslySetInnerHTML={{ __html: (item.isi?.slice(0, 300) + '...') }}></p>
                        <div className='col-12 col-md-6 d-flex gap-x-px justify-content-start align-items-start small'>
                          <p className="text-muted">{item.author}</p>
                          <p className="card-text text-muted">
                            <FaCalendarAlt className="me-1" />
                            {presenter.formatDate(item.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
      <style jsx>{`
        .bg-gradient {
      background: linear-gradient(135deg, #1573b7 10%, #0c54b7 90%) !important;
    }
        .primary {
          color: #0c54b7;
        }
        .border-primary {
          border: #0c54b7;
        }
      `}</style>
    </div>
  );
};

export default ArticleDetailPage;