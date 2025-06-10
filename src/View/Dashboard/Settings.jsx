import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Nav, 
  Tab, 
  Form, 
  Button, 
  Alert,
  Badge
} from 'react-bootstrap';
import { 
  FaUser, 
  FaBell, 
  FaShieldAlt, 
  FaGlobe, 
  FaPalette, 
  FaEnvelope,
  FaCheck,
  FaInfoCircle
} from 'react-icons/fa';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Mock data untuk tampilan statis
  const [formData, setFormData] = useState({
    siteName: 'HealthCare Admin',
    siteDescription: 'Portal administrasi untuk layanan kesehatan',
    contactEmail: 'admin@healthcare.com',
    maintenanceMode: false,
    enableRegistration: true,
    language: 'id',
    timezone: 'Asia/Jakarta',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24',
    
    // Notifikasi
    emailNotifications: true,
    pushNotifications: true,
    loginAlerts: true,
    systemUpdates: true,
    
    // Tampilan
    theme: 'light',
    sidebarCollapsed: false,
    showHelp: true,
    compactMode: false,
    
    // Keamanan
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpires: 90,
    strongPasswords: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini akan ada logika untuk menyimpan pengaturan
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-2">Pengaturan</h1>
          <p className="text-muted">Kelola pengaturan aplikasi dan preferensi sistem</p>
          
          {showSuccessAlert && (
            <Alert variant="success" onClose={() => setShowSuccessAlert(false)} dismissible>
              <FaCheck className="me-2" /> Pengaturan berhasil disimpan!
            </Alert>
          )}
        </Col>
      </Row>
      
      <Row>
        <Col lg={3} md={4} className="mb-4">
          <Card>
            <Card.Body className="p-0">
              <Nav variant="pills" className="flex-column" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav.Item>
                  <Nav.Link eventKey="general" className="d-flex align-items-center py-3 px-3 border-bottom">
                    <FaGlobe className="me-2" /> Umum
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="notifications" className="d-flex align-items-center py-3 px-3 border-bottom">
                    <FaBell className="me-2" /> Notifikasi
                    <Badge bg="primary" pill className="ms-auto">4</Badge>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="appearance" className="d-flex align-items-center py-3 px-3 border-bottom">
                    <FaPalette className="me-2" /> Tampilan
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="security" className="d-flex align-items-center py-3 px-3 border-bottom">
                    <FaShieldAlt className="me-2" /> Keamanan
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="email" className="d-flex align-items-center py-3 px-3">
                    <FaEnvelope className="me-2" /> Email
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={9} md={8}>
          <Card>
            <Card.Body>
              <Tab.Content>
                {/* Tab Pengaturan Umum */}
                <Tab.Pane eventKey="general" active={activeTab === 'general'}>
                  <h4 className="mb-4">Pengaturan Umum</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nama Situs</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="siteName" 
                            value={formData.siteName} 
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email Kontak</Form.Label>
                          <Form.Control 
                            type="email" 
                            name="contactEmail" 
                            value={formData.contactEmail} 
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Deskripsi Situs</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={2} 
                        name="siteDescription" 
                        value={formData.siteDescription} 
                        onChange={handleChange}
                      />
                    </Form.Group>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bahasa</Form.Label>
                          <Form.Select name="language" value={formData.language} onChange={handleChange}>
                            <option value="id">Indonesia</option>
                            <option value="en">Inggris</option>
                            <option value="jp">Jepang</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Zona Waktu</Form.Label>
                          <Form.Select name="timezone" value={formData.timezone} onChange={handleChange}>
                            <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                            <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
                            <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Format Tanggal</Form.Label>
                          <Form.Select name="dateFormat" value={formData.dateFormat} onChange={handleChange}>
                            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Format Waktu</Form.Label>
                          <Form.Select name="timeFormat" value={formData.timeFormat} onChange={handleChange}>
                            <option value="12">12 jam (AM/PM)</option>
                            <option value="24">24 jam</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="maintenance-mode"
                        label="Mode Pemeliharaan"
                        name="maintenanceMode"
                        checked={formData.maintenanceMode}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1">
                        Aktifkan mode pemeliharaan untuk menonaktifkan sementara akses pengguna.
                      </small>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="enable-registration"
                        label="Aktifkan Pendaftaran"
                        name="enableRegistration"
                        checked={formData.enableRegistration}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1">
                        Izinkan pengguna baru untuk mendaftar.
                      </small>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="secondary" className="me-2">Batal</Button>
                      <Button variant="primary" type="submit">Simpan Perubahan</Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                {/* Tab Notifikasi */}
                <Tab.Pane eventKey="notifications" active={activeTab === 'notifications'}>
                  <h4 className="mb-4">Pengaturan Notifikasi</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Card className="mb-3 bg-light">
                      <Card.Body>
                        <h5>Notifikasi Email</h5>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="switch"
                            id="email-notifications"
                            label="Aktifkan Notifikasi Email"
                            name="emailNotifications"
                            checked={formData.emailNotifications}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox"
                            id="system-updates"
                            label="Pembaruan Sistem"
                            name="systemUpdates"
                            checked={formData.systemUpdates}
                            onChange={handleChange}
                            disabled={!formData.emailNotifications}
                          />
                          <small className="text-muted d-block mt-1 ms-4">
                            Dapatkan notifikasi tentang pembaruan sistem dan pemeliharaan.
                          </small>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                    
                    <Card className="mb-3 bg-light">
                      <Card.Body>
                        <h5>Notifikasi Keamanan</h5>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox"
                            id="login-alerts"
                            label="Peringatan Login"
                            name="loginAlerts"
                            checked={formData.loginAlerts}
                            onChange={handleChange}
                          />
                          <small className="text-muted d-block mt-1 ms-4">
                            Dapatkan notifikasi ketika akun Anda diakses dari perangkat baru.
                          </small>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="checkbox"
                            id="push-notifications"
                            label="Notifikasi Push"
                            name="pushNotifications"
                            checked={formData.pushNotifications}
                            onChange={handleChange}
                          />
                          <small className="text-muted d-block mt-1 ms-4">
                            Terima notifikasi push untuk pembaruan penting.
                          </small>
                        </Form.Group>
                      </Card.Body>
                    </Card>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="secondary" className="me-2">Batal</Button>
                      <Button variant="primary" type="submit">Simpan Perubahan</Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                {/* Tab Tampilan */}
                <Tab.Pane eventKey="appearance" active={activeTab === 'appearance'}>
                  <h4 className="mb-4">Pengaturan Tampilan</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-4">
                      <Col>
                        <h5>Tema</h5>
                        <div className="d-flex gap-3 mt-3">
                          <Card 
                            className={`cursor-pointer ${formData.theme === 'light' ? 'border-primary' : 'border'}`} 
                            style={{ width: '120px' }}
                            onClick={() => setFormData({...formData, theme: 'light'})}
                          >
                            <Card.Body className="p-2 text-center">
                              <div className="bg-light border rounded p-3 mb-2"></div>
                              <small>Terang</small>
                              {formData.theme === 'light' && (
                                <FaCheck className="text-primary position-absolute top-0 end-0 mt-2 me-2" />
                              )}
                            </Card.Body>
                          </Card>
                          
                          <Card 
                            className={`cursor-pointer ${formData.theme === 'dark' ? 'border-primary' : 'border'}`} 
                            style={{ width: '120px' }}
                            onClick={() => setFormData({...formData, theme: 'dark'})}
                          >
                            <Card.Body className="p-2 text-center">
                              <div className="bg-dark border rounded p-3 mb-2"></div>
                              <small>Gelap</small>
                              {formData.theme === 'dark' && (
                                <FaCheck className="text-primary position-absolute top-0 end-0 mt-2 me-2" />
                              )}
                            </Card.Body>
                          </Card>
                          
                          <Card 
                            className={`cursor-pointer ${formData.theme === 'auto' ? 'border-primary' : 'border'}`} 
                            style={{ width: '120px' }}
                            onClick={() => setFormData({...formData, theme: 'auto'})}
                          >
                            <Card.Body className="p-2 text-center">
                              <div className="bg-light border rounded-top p-3 mb-0" style={{ height: '20px' }}></div>
                              <div className="bg-dark border-start border-end border-bottom rounded-bottom p-3 mb-2" style={{ height: '20px' }}></div>
                              <small>Otomatis</small>
                              {formData.theme === 'auto' && (
                                <FaCheck className="text-primary position-absolute top-0 end-0 mt-2 me-2" />
                              )}
                            </Card.Body>
                          </Card>
                        </div>
                      </Col>
                    </Row>
                    
                    <h5 className="mb-3">Preferensi Tampilan</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="sidebar-collapsed"
                        label="Sidebar Minimalis"
                        name="sidebarCollapsed"
                        checked={formData.sidebarCollapsed}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1 ms-4">
                        Tampilkan sidebar dalam mode minimalis secara default.
                      </small>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="compact-mode"
                        label="Mode Kompak"
                        name="compactMode"
                        checked={formData.compactMode}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1 ms-4">
                        Kurangi padding dan margin untuk tampilan yang lebih padat.
                      </small>
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="show-help"
                        label="Tampilkan Bantuan"
                        name="showHelp"
                        checked={formData.showHelp}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1 ms-4">
                        Tampilkan tips dan petunjuk di seluruh antarmuka.
                      </small>
                    </Form.Group>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="secondary" className="me-2">Batal</Button>
                      <Button variant="primary" type="submit">Simpan Perubahan</Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                {/* Tab Keamanan */}
                <Tab.Pane eventKey="security" active={activeTab === 'security'}>
                  <h4 className="mb-4">Pengaturan Keamanan</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Card className="mb-4 border-warning">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                          <FaInfoCircle className="text-warning me-2" />
                          <h5 className="mb-0">Otentikasi Dua Faktor</h5>
                        </div>
                        
                        <p className="text-muted">
                          Otentikasi dua faktor menambahkan lapisan keamanan tambahan ke akun Anda 
                          dengan meminta verifikasi kedua selain kata sandi Anda.
                        </p>
                        
                        <Form.Group className="mb-3">
                          <Form.Check 
                            type="switch"
                            id="two-factor-auth"
                            label="Aktifkan Otentikasi Dua Faktor"
                            name="twoFactorAuth"
                            checked={formData.twoFactorAuth}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        
                        {formData.twoFactorAuth && (
                          <Button variant="outline-primary" size="sm">Konfigurasi 2FA</Button>
                        )}
                      </Card.Body>
                    </Card>
                    
                    <h5 className="mb-3">Kebijakan Kata Sandi</h5>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="strong-passwords"
                        label="Wajibkan Kata Sandi Kuat"
                        name="strongPasswords"
                        checked={formData.strongPasswords}
                        onChange={handleChange}
                      />
                      <small className="text-muted d-block mt-1 ms-4">
                        Kata sandi harus minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
                      </small>
                    </Form.Group>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Masa Berlaku Kata Sandi (hari)</Form.Label>
                          <Form.Control 
                            type="number" 
                            name="passwordExpires" 
                            value={formData.passwordExpires} 
                            onChange={handleChange}
                          />
                          <small className="text-muted">
                            Tetapkan 0 untuk menonaktifkan kedaluwarsa kata sandi.
                          </small>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <h5 className="mb-3">Sesi</h5>
                    
                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Batas Waktu Sesi (menit)</Form.Label>
                          <Form.Control 
                            type="number" 
                            name="sessionTimeout" 
                            value={formData.sessionTimeout} 
                            onChange={handleChange}
                          />
                          <small className="text-muted">
                            Waktu tidak aktif sebelum pengguna secara otomatis keluar.
                          </small>
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <div className="d-flex justify-content-end">
                      <Button variant="secondary" className="me-2">Batal</Button>
                      <Button variant="primary" type="submit">Simpan Perubahan</Button>
                    </div>
                  </Form>
                </Tab.Pane>
                
                {/* Tab Email */}
                <Tab.Pane eventKey="email" active={activeTab === 'email'}>
                  <h4 className="mb-4">Pengaturan Email</h4>
                  
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Server SMTP</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="smtp.example.com"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Port SMTP</Form.Label>
                          <Form.Control 
                            type="number" 
                            placeholder="587"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="username@example.com"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Kata Sandi</Form.Label>
                          <Form.Control 
                            type="password" 
                            placeholder="••••••••"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email Pengirim</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="noreply@yoursite.com"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Check 
                        type="switch"
                        id="use-ssl"
                        label="Gunakan SSL/TLS"
                        defaultChecked
                      />
                    </Form.Group>
                    
                    <div className="d-flex flex-wrap gap-2 mt-4">
                      <Button variant="outline-secondary">Uji Koneksi</Button>
                      <Button variant="outline-info">Kirim Email Uji</Button>
                      <div className="ms-auto">
                        <Button variant="secondary" className="me-2">Batal</Button>
                        <Button variant="primary" type="submit">Simpan Perubahan</Button>
                      </div>
                    </div>
                  </Form>
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;