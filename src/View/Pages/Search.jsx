import { useParams } from "react-router";
import SearchPresenter from "../../Presenter/SearchPresenter";
import Dashboard from "../../Model/modelDashboard";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Search() {
    const { search } = useParams();
    const [artikel, setArtikel] = useState(null);
    const [kategori, setKategori] = useState(null);
    const [loading, setLoading] = useState(false);

    const presenter = new SearchPresenter({
        model: Dashboard,
        view: {
            setArtikel: setArtikel,
            setKategori: setKategori,
            setLoading: setLoading
        }
    });

    function truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }

    useEffect(() => {
        presenter.getArtikel(search);
        presenter.getKategori();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white py-5">
            <Container>
                <h2 className="fw-bold mb-4">Artikel {search}</h2>
                <Row className="g-4">
                    {artikel?.map((artikel) => (
                        <Col md={6} key={artikel.id}>
                            <Card
                                className="border-0 shadow-none h-100 transform-card d-flex flex-column horizontal-card"
                                style={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/artikel/${artikel.id}`)}
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
                                                    {kategori?.find(value => value.id === artikel.kategori_id).nama_kategori}
                                                </span>
                                                <small className="text-muted">
                                                    {new Date(artikel.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <Card.Title className="fw-bold text-black">
                                                {artikel.judul}
                                            </Card.Title>
                                            <Card.Text className="text-muted" dangerouslySetInnerHTML={{ __html: truncateText(artikel.isi, 180) }}>
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
    )
}