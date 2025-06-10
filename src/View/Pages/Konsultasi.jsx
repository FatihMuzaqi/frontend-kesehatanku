import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaHeartbeat,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCamera,
  FaUpload,
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaImage,
  FaUserMd,
  FaTimes
} from 'react-icons/fa';
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
  Modal,
  InputGroup
} from 'react-bootstrap';
import KonsultasiPresenter from '../../Presenter/konsultasiPresenter';
import KonsultasiModel from '../../Model/konsultasiModel';

const KonsultasiKesehatan = () => {
  const [user, setUser] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const presenter = new KonsultasiPresenter({
    model: new KonsultasiModel(),
    view: {
      setSelectedImage: setSelectedImage,
      setIsLoading: setIsLoading,
      setChatHistory: setChatHistory,
      setIsUploading: setIsUploading,
      setImage: setImage,
      navigate: navigate,
      setShowConsultationModal: setShowConsultationModal,
      setUser: setUser
    }
  })

  // Handle file selection
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Mohon pilih file foto yang valid');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file terlalu besar. Maksimal 5MB');
        return;
      }
      setImage(file);
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  // Handle consultation submission
  async function handleSubmitConsultation() {
    await presenter.submitKonsultasi(selectedImage, image, user.userID);
  }

  async function handleKonsultasi() {
    presenter.getUser();
  }

  // Clear selected image
  const clearSelectedImage = () => {
    setSelectedImage(null);
  };


  return (
    <Container fluid className="p-0">
      <NavbarComponent />
      <Container className="py-5">
        <Row className="align-items-center min-vh-75">
          <Col lg={7}>
            <div className="mb-4">
              <h1 className="display-4 fw-bold text-dark mb-4">
                Konsultasi Penyakit
                <span className="primary"> Model AI Technology</span>
              </h1>
              <p className="lead text-muted mb-4">
                Dapatkan analisis awal kondisi penyakit Anda dengan teknologi Machine Learning.
                Unggah foto gejala atau kondisi penyakit untuk mendapatkan prediksi dan rekomendasi yang akurat.
              </p>

              <Row className="mb-4">
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <FaCheckCircle className="primary" />
                    </div>
                    <div>
                      <h6 className="mb-1 fw-semibold">Analisis Real-time</h6>
                      <small className="text-muted">Hasil instan dalam hitungan detik</small>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                      <FaClipboardCheck className="text-success" />
                    </div>
                    <div>
                      <h6 className="mb-1 fw-semibold">Akurasi Tinggi</h6>
                      <small className="text-muted">Didukung AI model</small>
                    </div>
                  </div>
                </Col>
              </Row>

              <Button
                variant="primary"
                size="lg"
                className="px-4 py-3 rounded-pill"
                onClick={handleKonsultasi}
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : <FaCamera className="me-2" />}
                Mulai Konsultasi
              </Button>
            </div>
          </Col>

          <Col lg={5}>
            <div className="text-center">
              <div className="position-relative">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '300px', height: '300px' }}
                >
                  <img
                    src="/image/Health_Illustration.png"
                    alt="Health Illustration"
                    style={{ width: '500px', height: '500px', objectFit: 'contain' }}
                  />
                </div>
                <div className="position-absolute top-0 start-0 bg-white shadow-sm rounded-pill px-3 py-2">
                  <FaCheckCircle className="text-success me-2" />
                  <small className="fw-semibold">Aman & Terpercaya</small>
                </div>
                <div className="position-absolute bottom-0 end-0 bg-white shadow-sm rounded-pill px-3 py-2">
                  <FaRobot className="primary me-2" />
                  <small className="fw-semibold">AI Model Powered</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* modal */}
      <Modal
        show={showConsultationModal}
        onHide={() => setShowConsultationModal(false)}
        size="lg"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton className="border-0 pb-0 flex-column align-items-start">
          <Modal.Title className="fw-bold d-flex align-items-center mb-2">
            <FaUserMd className="primary me-2" />
            Ayo Konsultasikan Penyakit Anda
          </Modal.Title>

          <Alert variant="warning" className="border-0 shadow-sm mb-0 d-flex align-items-start">
            <FaExclamationTriangle className="me-2 mt-1 flex-shrink-0" />
            <div>
              <strong>Disclaimer:</strong> Hasil konsultasi AI ini hanya sebagai referensi awal dan tidak menggantikan
              konsultasi langsung dengan dokter. Untuk diagnosis yang akurat, tetap konsultasikan dengan tenaga medis profesional.
            </div>
          </Alert>
        </Modal.Header>

        <Modal.Body className="px-4 py-3">
          <div className="chat-container" style={{ height: '400px', overflowY: 'auto' }}>
            {chatHistory.length === 0 ? (
              <div className="text-center py-5">
                <FaCamera size={48} className="text-muted mb-3" />
                <h6 className="text-muted">Mulai konsultasi dengan mengunggah foto gejala Anda</h6>
                <small className="text-muted">
                  Format yang didukung: JPG, PNG, JPEG (Max. 5MB)
                </small>
              </div>
            ) : (
              <div className="chat-messages">
                {chatHistory.map((message) => (
                  <div key={message.id} className={`mb-3 d-flex ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`chat-bubble ${message.type === 'user' ? 'user-message' : 'chat-message'} p-3 rounded-3 shadow-sm`}
                      style={{ maxWidth: '70%' }}>

                      {message.type === 'user' ? (
                        <div>
                          <div className="d-flex align-items-center mb-2">
                            <FaUser className="me-2 text-white" />
                            <small className="text-white opacity-75">{message.timestamp}</small>
                          </div>
                          {message.content === 'image' && (
                            <img
                              src={message.image}
                              alt="Consultation"
                              className="img-fluid rounded"
                              style={{ maxHeight: '200px' }}
                            />
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="d-flex align-items-center mb-2">
                            <FaUserMd className="me-2 primary" />
                            <small className="text-muted">{message.timestamp}</small>
                          </div>

                          {message.error ? (
                            <div className="text-danger">
                              <FaExclamationTriangle className="me-2" />
                              {message.content}
                            </div>
                          ) : (
                            <div>
                              <p className="mb-2" dangerouslySetInnerHTML={{ __html: message.content }}></p>

                              {message.confidence && (
                                <div className="mb-2">
                                  <small className="text-muted">Tingkat Kepercayaan:</small>
                                  <ProgressBar
                                    now={message.confidence * 100}
                                    label={`${Math.round(message.confidence * 100)}%`}
                                    variant="success"
                                    className="mt-1"
                                    style={{ height: '20px' }}
                                  />
                                </div>
                              )}

                              {message.recommendations && (
                                <div>
                                  <small className="text-muted fw-semibold">Rekomendasi:</small>
                                  <ul className="mb-0 mt-1">
                                    {message.recommendations.map((rec, index) => (
                                      <li key={index} className="small">{rec}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="d-flex justify-content-start mb-3">
                    <div className="chat-message p-3 rounded-3 shadow-sm">
                      <div className="d-flex align-items-center">
                        <Spinner animation="border" size="sm" className="me-2" />
                        <small>Sedang menganalisis Foto...</small>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="border-top pt-3 mt-3">
            {selectedImage ? (
              <div className="selected-image-preview p-3 bg-light rounded-3 mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <small className="text-muted fw-semibold">Foto yang dipilih:</small>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={clearSelectedImage}
                  >
                    <FaTimes />
                  </Button>
                </div>
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="img-fluid rounded"
                  style={{ maxHeight: '150px' }}
                />
              </div>
            ) : null}

            <div className="d-flex gap-2">
              <div className="flex-grow-1">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="d-none"
                  id="imageUpload"
                />
                <Button
                  variant="outline-primary"
                  className="w-100"
                  onClick={() => document.getElementById('imageUpload').click()}
                  disabled={isUploading}
                >
                  <FaUpload className="me-2" />
                  {selectedImage ? 'Ganti Foto' : 'Pilih Foto'}
                </Button>
              </div>

              <Button
                variant="primary"
                onClick={handleSubmitConsultation}
                disabled={!selectedImage || isUploading}
              >
                {isUploading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <FaPaperPlane />
                )}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <FooterComponent />

      <style jsx>{`
        .min-vh-75 {
          min-height: 75vh;
        }
        .primary {
        color: #0c54b7;
        }
        
        .user-message {
          background: linear-gradient(135deg, #1573b7, #0c54b7);
          color: white;
        }
        
        .chat-message {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
        }
        
        .chat-container {
          border: 1px solid #e9ecef;
          border-radius: 10px;
          padding: 15px;
          background: #fafafa;
        }
        
        .selected-image-preview {
          border: 2px dashed #0c54b7;
        }
      `}</style>
    </Container>
  );
};

export default KonsultasiKesehatan;