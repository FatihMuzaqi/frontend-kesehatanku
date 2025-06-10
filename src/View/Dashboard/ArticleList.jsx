import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Pagination, Image } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import ArticlePresenter from '../../Presenter/ArticlePresenter';
import Dashboard from '../../Model/modelDashboard';

const ArticleList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticle] = useState(null);
  const [kategoris, setKategoris] = useState(null);
  const [renderArticle, setRenderArticle] = useState(null);
  const navigate = useNavigate();
  

  const presenter = new ArticlePresenter({
    model: Dashboard,
    view: {
      setArticle: setArticle,
      setKategoris: setKategoris,
      setRenderArticle: setRenderArticle
    }
  })
  async function handleDelete(id) {
    await presenter.deleteArticle(id);
  }
  async function handleEdit(id) {
    const articlById = articles.find(value => value.id == id);
    navigate("/dashboard/health-info/create", { state: articlById })
  }
  function handleFilterKategori(e) {
    if (e.target.value === "") {
      setRenderArticle(articles);
      return;
    }
    const article = articles.filter(value => value.kategori_id == e.target.value);
    console.log(e.target.value);
    setRenderArticle(article);
  }

  useEffect(() => {
    presenter.getArticle();
    presenter.getKategori();
  }, []);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Artikel Kesehatan</h2>
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Col md={5}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Cari artikel..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Select onChange={handleFilterKategori}>
                    <option value="">Filter Kategori</option>
                    { kategoris ? kategoris.map(value => (
                      <option value={ value.id } key={ value.id }>{ value.nama_kategori }</option>
                    )) : <></> }
                  </Form.Select>
                </Col>
                <Col md={2}>
                  <Form.Select>
                    <option value="">Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="review">Review</option>
                  </Form.Select>
                </Col>
                <Col md={2} className="text-end">
                  <Button variant="primary" href="/dashboard/health-info/create">
                    <FaPlus className="me-2" /> Tambah Artikel
                  </Button>
                </Col>
              </Row>
              
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Gambar</th>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Penulis</th>
                    <th>Tanggal Publikasi</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {articles !== null ? renderArticle.map((article, index) => (
                    <tr key={article?.id}>
                      <td>{ index + 1 }</td>
                      <td>
                        <Image src={article?.images} rounded width={50} height={50} />
                      </td>
                      <td>{article?.judul}</td>
                      <td>{article?.category}</td>
                      <td>{article?.author}</td>
                      <td>
                        {new Date(article?.createdAt).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <Badge bg={
                          article?.status === 'publish' ? 'success' : 
                          article?.status === 'draft' ? 'secondary' : 'warning'
                        }>
                          {article?.status}
                        </Badge>
                      </td>
                      <td>
                        <Button variant="info" size="sm" className="me-1" onClick={() => navigate(`/artikel/${article.id}`)}>
                          <FaEye />
                        </Button>
                        <Button variant="warning" size="sm" className="me-1" onClick={() => handleEdit(article.id)}>
                          <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(article?.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  )) : <></>}
                </tbody>
              </Table>
              
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Menampilkan 1-5 dari 5 entries</div>
                <Pagination>
                  <Pagination.Prev disabled />
                  <Pagination.Item active>{1}</Pagination.Item>
                  <Pagination.Next disabled />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleList;