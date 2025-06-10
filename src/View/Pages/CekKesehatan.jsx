import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaHeartbeat, FaClipboardCheck, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Form,
  Alert,
  Spinner,
  Badge,
  CardGroup,
  ListGroup
} from 'react-bootstrap';
import KesehatanPresenter from '../../Presenter/cekKesehatanPresenter';
import Kesehatan from '../../Model/kesehatanModel';

const CekKesehatan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // loading
  const [loading, setLoading] = useState(false);
  const [LoadingPredict, setLoadingPredict] = useState(false);

  const [pertanyaan, setPertanyaan] = useState(0);
  const [jawaban, setJawaban] = useState("");
  const [kategoriPertanyaan, setKategoriPertanyaan] = useState(null);
  const [predicted, setPredicted] = useState(null);
  const [user, setUser] = useState(null);

  const [showPertanyaan, setShowPertanyaan] = useState(true);


  const presenter = new KesehatanPresenter({
    model: new Kesehatan(),
    view: {
      setLoading: setLoading,
      navigate: navigate,
      setKategoriPertanyaan: setKategoriPertanyaan,
      setPredicted: setPredicted,
      setUser: setUser,
      setLoadingPredict: setLoadingPredict
    }
  });

  async function hanldePertanyaan(value) {
    if ((pertanyaan + 1) >= (kategoriPertanyaan.length)) {
      setJawaban(jawaban + " " + kategoriPertanyaan[pertanyaan].name_symptom);
      await presenter.PredictKesehatan(jawaban, user);
      setShowPertanyaan(false);
      return;
    }
    if (value) {
      setJawaban(jawaban + " " + kategoriPertanyaan[pertanyaan].name_symptom);
    }
    setPertanyaan(pertanyaan + 1);
  }

  // Mulai sesi cek kesehatan
  const startSession = async () => {
    await presenter.startCekkesehatan();
  };

  // Restart sesi cek kesehatan
  const handleRestart = () => {
    startSession();
  };

  useEffect(() => {
    presenter.getPertanyaan(id);
    presenter.getUser();
  }, []);


  if (loading) {
    return (
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <h5 className="text-muted">Memuat data kesehatan...</h5>
        </div>
      </Container>
    );
  }
  if (LoadingPredict) {
    return (
      <Container fluid className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <h5 className="text-muted">Melakukan prediksi...</h5>
        </div>
      </Container>
    );
  }

return (
  showPertanyaan ? (
        <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            {/* <Button
                  variant="outline-secondary"
                  onClick={() => navigate(-1)}
                  className="mb-4 d-flex align-items-center"
                  style={{ width: 'fit-content' }}
                >
                  <FaChevronLeft className="me-2" /> Kembali
                </Button> */}
            <Card className="shadow-sm mb-4 mt-4 border-0 overflow-hidden">
              <div className="bg-gradient text-white p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">Pemeriksaan Kesehatan</h5>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                  </Badge>
                </div>
                <ProgressBar
                  now={((pertanyaan + 1) / kategoriPertanyaan?.length) * 100}
                  variant="info"
                  style={{ height: '8px', borderRadius: '4px' }}
                  className="mb-0"
                />
              </div>

              <Card.Body className="p-5">
                <div className="mb-3">
                  <h4 className="fw-bold text-dark mb-4 lh-base">
                    {kategoriPertanyaan ? kategoriPertanyaan[pertanyaan].question : ''}
                  </h4>
                </div>

                <Form className="mb-4 shadow-none">
                    <div className="d-grid gap-1">
                        <Card
                          className={`border-2 active-border-primary bg-primary bg-opacity-10`}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => hanldePertanyaan(true)}
                        >
                          <Card.Body className="p-4">
                              <Form.Label
                                className="fw-medium text-dark mb-0 flex-grow-1"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                              >
                                Ya
                              </Form.Label>
                          </Card.Body>
                        </Card>
                        <Card
                          className={`border-2 active-border-primary bg-primary bg-opacity-10`}
                          style={{
                            cursor: 'pointer',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => hanldePertanyaan(false)}
                        >
                          <Card.Body className="p-4">
                              <Form.Label
                                className="fw-medium text-dark mb-0 flex-grow-1"
                                style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                              >
                                Tidak
                              </Form.Label>
                          </Card.Body>
                        </Card>
                      </div>
                    </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>                
    </>
  ) : (
    <>
  <div className="min-vh-100 d-flex flex-column">
    <NavbarComponent />
    <main className="flex-grow-1">
        <Container>
          <Row className="justify-content-center">
            <Col>
              {/* <Button
                variant="outline-secondary"
                onClick={() => navigate(-1)}
                className="mb-4 d-flex align-items-center"
                style={{ width: 'fit-content' }}
              >
                <FaChevronLeft className="me-2" /> Kembali
              </Button> */}

              <Card className="shadow-lg border-0 overflow-hidden">
                <div className="bg-success text-white p-4 text-center">
                  <FaCheckCircle size={48} className="mb-3" />
                  <h3 className="mb-0 fw-bold">Hasil Pemeriksaan</h3>
                  <p className="mb-0 opacity-75"></p>
                </div>

                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <Badge
                      className="px-4 py-2 fs-6 mb-3"
                      style={{ borderRadius: '20px' }}
                    >
                      Risiko
                    </Badge>
                  </div>

                  <Card className={`border mb-4`}>
                    <Card.Body>
                      <ListGroup>
                        <ListGroup.Item>
                          name: {user.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          email: {user.email}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          prediksi: 
                        </ListGroup.Item>
                      </ListGroup>
                      <div className='m-2'>
                        <h4>Deskripsi</h4>
                        <p>{predicted?.deskripsi}</p>
                      </div>
                      <div className='m-2'>
                        <h4>Saran</h4>
                        <p>{predicted?.saran}</p>
                      </div>
                      {/* <h4 className={`text fw-bold mb-3`}>
                        {predicted ? predicted : ""}
                      </h4> */}
                      <p className="mb-0 text-muted">
                      </p>
                    </Card.Body>
                  </Card>

                    <Alert variant="primary" className="border-0 shadow-sm">
                      <Alert.Heading className="h6 fw-bold">
                        <FaClipboardCheck className="me-2" />
                        Rekomendasi untuk Anda:
                      </Alert.Heading>
                      <p className="mb-0"> </p>
                    </Alert>

                  <div className="d-flex gap-3 flex-wrap justify-content-center mt-4">
                    <Button
                      variant="primary"
                      onClick={handleRestart}
                      className="px-4 py-2 fw-semibold"
                      style={{ borderRadius: '10px' }}
                    >
                      <FaHeartbeat className="me-2" />
                      Coba Lagi
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => navigate(-1)}
                      className="px-4 py-2"
                      style={{ borderRadius: '10px' }}
                    >
                      Kembali ke Menu
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
    </main>
    <FooterComponent />
  </div>
  </>
  )
);
};

export default CekKesehatan;