import React, { useState, useEffect, useRef } from "react";
import {
  FaHeartbeat, FaStethoscope, FaPhoneAlt, FaComments, FaSearch,
  FaMapMarkerAlt, FaEnvelope, FaClock, FaPhone, FaWhatsapp,
  FaPaperPlane, FaUserMd
} from "react-icons/fa";
import {
  Dropdown, NavDropdown, Navbar, Nav, Container, Button,
  Card, Row, Col, Form, InputGroup
} from "react-bootstrap";
import { ContactPresenter } from '../../Presenter/ContactPresenter';
import NavbarComponent from '../../Component/NavbarComponent';
import FooterComponent from '../../Component/FooterComponent';

export default function ContactView() {
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const presenterRef = useRef(null);
  const viewInterface = {
    setLoading: (isLoading) => setLoading(isLoading),
    setCategories: (categories) => setKategoriList(categories),
    showAlert: (type, message) => {
      setAlertType(type);
      setAlertMessage(message);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    },
    hideAlert: () => setShowAlert(false),
    updateFormField: (name, value) => {
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    resetForm: () => {
      if (presenterRef.current) {
        setFormData(presenterRef.current.getInitialFormState());
      }
    },
    setSubmitting: (isSubmitting) => setSubmitting(isSubmitting)
  };

  useEffect(() => {
    presenterRef.current = new ContactPresenter(viewInterface);
    setFormData(presenterRef.current.getInitialFormState());
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (presenterRef.current) {
      presenterRef.current.handleInputChange(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (presenterRef.current) {
      presenterRef.current.handleSubmit(formData);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <NavbarComponent />

      {/* Hero Section */}
      <div className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1
                className="display-4 fw-bold mb-3"
                style={{
                  background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Hubungi Kami
              </h1>
              <p className="lead mb-4 fs-5 fs-md-4"> 
                Tim KesehatanKU siap membantu Anda dengan pertanyaan seputar
                kesehatan. Hubungi kami melalui berbagai channel yang tersedia
                atau kunjungi langsung kantor kami.
              </p>
            </div>
            <div className="col-lg-4 text-center">
              <FaPhoneAlt
                size={120}
                style={{
                  background: 'linear-gradient(135deg, #1573b7 10%, #0c54b7 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="opacity-75 d-none d-md-block" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 flex-grow-1">
        <div className="row">
          <div className="col-lg-8 mb-5">
            <div className="card shadow-none">
              <div className="card-body p-4">
                {showAlert && (
                  <div className={`alert alert-${alertType} alert-dismissible fade show mb-4`} role="alert">
                    {alertMessage}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => presenterRef.current?.hideAlert()}
                      aria-label="Close"
                    ></button>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Nama Lengkap <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="name"
                          value={formData.name || ''}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap Anda"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email"
                          value={formData.email || ''}
                          onChange={handleInputChange}
                          placeholder="nama@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Nomor Telepon</label>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleInputChange}
                          placeholder="+62 xxx xxxx xxxx"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Kategori Pertanyaan</label>
                        <select
                          className="form-select form-select-lg"
                          name="category"
                          value={formData.category || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Pilih kategori...</option>
                          {kategoriList.map((kategori) => (
                            <option key={kategori.id} value={kategori.id}>
                              {kategori.nama_kategori}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Subjek</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="subject"
                      value={formData.subject || ''}
                      onChange={handleInputChange}
                      placeholder="Subjek pesan Anda"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Pesan <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      rows={5}
                      name="message"
                      value={formData.message || ''}
                      onChange={handleInputChange}
                      placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                    />
                    <div className="form-text text-muted">
                      Minimum 10 karakter. Jelaskan pertanyaan Anda dengan detail.
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm py-3"
                      disabled={submitting}
                    >
                      <FaPaperPlane className="me-2" />
                      {submitting ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="card shadow-none mb-4">
              <h5 className="mb-0 px-4 py-4 align-items-center">
                <FaPhoneAlt className="me-2" />
                Informasi Kontak
              </h5>
              <div className="card-body p-4">
                <div className="mb-4">
                  <h6 className="primary fw-bold mb-2">
                    <FaMapMarkerAlt className="me-2" />
                    Alamat Kantor
                  </h6>
                  <p className="mb-0 text-muted">
                    Jl. H.R. Rasuna Said Kav. X5 No. 4-9<br />
                    Kuningan, Jakarta Selatan 12950<br />
                    Indonesia
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="primary fw-bold mb-2">
                    <FaPhone className="me-2" />
                    Telepon
                  </h6>
                  <p className="mb-1">
                    <a href="tel:+622150829999" className="text-decoration-none text-muted">
                      +62 21 5082 9999
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="primary fw-bold mb-2">
                    <FaWhatsapp className="me-2" />
                    WhatsApp
                  </h6>
                  <p className="mb-0">
                    <a href="https://wa.me/6281234567890" className="text-decoration-none text-muted">
                      +62 812 3456 7890
                    </a>
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="primary fw-bold mb-2">
                    <FaEnvelope className="me-2" />
                    Email
                  </h6>
                  <p className="mb-0">
                    <a href="mailto:konsultasi@kesehatanku.id" className="text-decoration-none text-muted">
                      konsultasi@kesehatanku.id
                    </a>
                  </p>
                </div>

                <div>
                  <h6 className="primary fw-bold mb-2">
                    <FaClock className="me-2" />
                    Jam Operasional
                  </h6>
                  <p className="mb-1 small">Senin - Jumat: 08:00 - 17:00 WIB</p>
                  <p className="mb-1 small">Sabtu: 08:00 - 12:00 WIB</p>
                  <p className="mb-0 small">Minggu: Tutup</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="row mt-5">
          <div className="col">
            <div className="card shadow-none border-0">
              <div className="card-body p-0">
                <div className="ratio ratio-16x9">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6751230529176!2d109.19449517381055!3d-6.929379993070429!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fc75b83eba765%3A0x74959d8a1794d51d!2sJl.%20Anggrek%2C%20Bulakwaru%2C%20Kec.%20Tarub%2C%20Kabupaten%20Tegal%2C%20Jawa%20Tengah%2052184!5e0!3m2!1sen!2sid!4v1747913801887!5m2!1sen!2sid"
                    width="400"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
<div className="row mt-5">
  <div className="col-sm-6 col-md-6 mb-4">
    <div className="card h-100 shadow-none border-0">
      <div className="card-body p-4 text-center">
        <FaUserMd size={50} className="primary mb-3" />
        <h5 className="fw-bold">Konsultasi Penyakit</h5>
        <p className="text-muted">
          Butuh konsultasi penyakit anda secara langsung? Gunakan layanan
          konsultasi penyakit kami secara online yang tersedia 24/7.
        </p>
        <button className="btn btn-primary">Mulai Konsultasi</button>
      </div>
    </div>
  </div>
  <div className="col-sm-6 col-md-6 mb-4">
    <div className="card h-100 shadow-none border-0">
      <div className="card-body p-4 text-center">
        <FaStethoscope size={50} className="primary mb-3" />
        <h5 className="fw-bold">Cek Kesehatan</h5>
        <p className="text-muted">
          Pantau kondisi kesehatan Anda dengan berbagai tools
          pemeriksaan kesehatan yang telah terverifikasi medis.
        </p>
        <button className="btn btn-primary">Mulai Cek Kesehatan</button>
      </div>
    </div>
  </div>
</div>


      </div>

      {/* Footer */}
      <FooterComponent />

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
    </div>
  );
}