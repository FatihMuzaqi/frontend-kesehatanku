import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { FaBookmark } from 'react-icons/fa';
import { articlePresenter } from '../../Presenter/ArtikelHomePresenter';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';

const KategoriDetailPage = () => {
  const { id } = useParams(); // Ambil id kategori dari URL
  const {
    formatDate,
    truncateText,
    getCategoryName,
  } = articlePresenter.useArticleLogic(); // Gunakan logic presenter

  const [filteredArticles, setFilteredArticles] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [deskripsiKategori, setDeskripsiKategori] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticlesByCategory = async () => {
      try {
        setLoading(true);
        const [articles, categories] = await Promise.all([
          articlePresenter.model.fetchArticles(),
          articlePresenter.model.fetchCategories()
        ]);

        const articlesInCategory = articles.filter(article => String(article.kategori_id) === id);
        setFilteredArticles(articlesInCategory);

        const category = categories.find(c => String(c.id) === id);
        setCategoryData(category);
        console.log(category);
        setCategoryName(category ? category.nama_kategori : 'Kategori Tidak Ditemukan');
        setDeskripsiKategori(category ? category.deskripsi : 'Deskripsi Kategori Tidak Ditemukan');
      } catch (error) {
        console.error("Gagal memuat data kategori:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticlesByCategory();
  }, [id]);

  return (
    <>
      <NavbarComponent />
      <Container className="py-5">
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mb-5">
            <img
                src={categoryData?.images}
                alt={categoryData ? categoryData.nama_kategori : 'Kategori'}
                style={{ width: '120px', height: '120px', objectFit: 'contain' }}
            />

            <div>
                <h2 className="fw-bold title-h2">{categoryName}</h2>
                <div className="bg-white rounded mt-2" style={{ maxWidth: '900px' }}>
                <p className="mb-0 title-text">{deskripsiKategori}</p>
                </div>
            </div>
        </div>
        <h4 className="mb-4">Semua Artikel {categoryName}</h4>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((art) => (
                <Col md={4} sm={4} key={art.id}>
                  <Card className="h-100 border-0 shadow-none">
                    <a href={articlePresenter.getArticleUrl(art.id)} className='text-black text-decoration-none'>
                      <div className="position-relative">
                        <Card.Img variant="top" src={art.images} alt={art.judul}/>
                        <div className="position-absolute top-0 end-0 m-2">
                          <Button variant="light" size="sm" className="rounded-circle p-1">
                            <FaBookmark className="primary" />
                          </Button>
                        </div>
                      </div>
                      <Card.Body>
                        <div className="mb-2">
                          <Badge className=" bg-gradient me-1">{getCategoryName(art.kategori_id)}</Badge>
                        </div>
                        <Card.Title className="h5">{art.judul}</Card.Title>
                        <Card.Text className="text-muted small" dangerouslySetInnerHTML={{ __html: truncateText(art.isi, 200) }}></Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0">
                        <small className="text-muted">
                          {art.author} • {formatDate(art.createdAt)} • 10 menit baca
                        </small>
                      </Card.Footer>
                    </a>
                  </Card>
                </Col>
              ))
            ) : (
              <p>Tidak ada artikel dalam kategori ini.</p>
            )}
          </Row>
        )}
      </Container>
      <FooterComponent />
    </>
  );
};

export default KategoriDetailPage;
