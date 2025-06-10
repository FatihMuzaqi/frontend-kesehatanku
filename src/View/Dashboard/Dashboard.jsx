import React, { useEffect, useState } from 'react';
import { Row, Col, Button, ProgressBar, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { FaCog, FaUser, FaHome } from "react-icons/fa";
import {
  FaUserPlus, FaNewspaper, FaEye, FaDownload,
  FaChartLine, FaChartArea, FaChartPie, FaCalendarAlt,
} from 'react-icons/fa';
import '../Dashboard/layouts/MainLayout.css';
import '../Dashboard/Dashboard.css';
import DashboardPresenter from '../../Presenter/DashboardPresenter';
import Model from '../../Model/Model';

const Dashboard = () => {

  const [users, setUsers] = useState(null);
  const [articles, setArticles] = useState(null);
  const [categories, setCategories] = useState(null);
  const [presentaseUsers, setPresentaseUsers] = useState(0);
  const [presentaseArticles, setPresentaseArticles] = useState(0);

  const presenter = new DashboardPresenter({
    model: Model,
    view: {
      setUsers: setUsers,
      setArticles: setArticles,
      setCategories: setCategories,
      setPresentaseUsers: setPresentaseUsers,
      setPresentaseArticles: setPresentaseArticles
    }
  });
  useEffect(() => {
    presenter.getUsers();
    presenter.getArticles();
  }, []);


  return (
    <div className="dashboard-container text-screen-md">
      <div className="page-header mb-4">
        <h1 className="h3 mb-1">Dashboard</h1>
        <p className="text-muted mb-0">Ringkasan data dan statistik utama untuk memantau kinerja sistem secara real-time.</p>
      </div>

      {/* Statistic Cards */}
      <Row>
        <Col lg={3} md={3} xs={3} className="mb-4">
          <Card className="border-left-primary h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold' }} className="text-primary text-uppercase mb-1">
                    Total Pengguna
                  </div>
                  <div className="h5 mb-0 font-weight-bold">{users !== null ? users.length : 0}</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+{presentaseUsers}%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <FaUserPlus style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={3} xs={3} className="mb-4">
          <Card className=" border-left-success h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold' }} className=" text-success text-uppercase mb-1">
                    Artikel Diterbitkan
                  </div>
                  <div className="h5 mb-0 font-weight-bold">{articles ? articles.length : 0}</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+{presentaseArticles}%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <FaNewspaper style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={3} xs={3} className="mb-4">
          <Card className="border-left-info h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold' }} className=" text-info text-uppercase mb-1">
                    Total Kunjungan
                  </div>
                  <div className="h5 mb-0 font-weight-bold">#</div>
                  <div className="mt-2 small">
                    <span className="text-success me-2">+18%</span>
                    <span className="text-muted">sejak bulan lalu</span>
                  </div>
                </Col>
                <Col xs="auto">
                  <FaUser style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={3} xs={3} className="mb-4">
          <Card className="border-left-warning h-100 py-2">
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div style={{ fontWeight: 'bold' }} className="text-warning text-uppercase mb-1">
                    Target Bulanan
                  </div>
                  <div className="mb-0 font-weight-bold">#%</div>
                  <ProgressBar now={75} variant="warning" className="mt-2" />
                  <div className="mt-2 small text-muted">
                    Target 2,000 pengunjung baru
                  </div>
                </Col>
                <Col xs="auto">
                  <FaChartLine style={{ fontSize: '2rem', color: '#d1d3e2' }} />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Analytics Charts */}
      <Row>
        {/* <Col xl={8} lg={7}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Statistik Kunjungan</h6>
              <div className="dropdown">
                <Button variant="light" size="sm">
                  <FaCalendarAlt className="me-1" /> Bulan Ini
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="chart-area">
                <div className="chart-placeholder d-flex align-items-center justify-content-center" style={{ height: '320px', background: '#f8f9fc' }}>
                  <div className="text-center">
                    <FaChartArea style={{ fontSize: '3rem', color: '#dddfeb' }} />
                    <p className="mt-2 text-muted">Area Chart - Statistik Kunjungan</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col xl={4} lg={5}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Distribusi Artikel</h6>
              <div className="dropdown">
                <Button variant="light" size="sm">
                  <FaCalendarAlt className="me-1" /> Tahun Ini
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="chart-pie mb-4">
                <div className="chart-placeholder d-flex align-items-center justify-content-center" style={{ height: '260px', background: '#f8f9fc' }}>
                  <div className="text-center">
                    <FaChartPie style={{ fontSize: '3rem', color: '#dddfeb' }} />
                    <p className="mt-2 text-muted">Pie Chart - Distribusi Artikel</p>
                  </div>
                </div>
              </div>
              <div className="legend">
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#4e73df' }}></div>
                  <span>Kesehatan Umum (35%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#1cc88a' }}></div>
                  <span>Nutrisi (25%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#36b9cc' }}></div>
                  <span>Olahraga (20%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#f6c23e' }}></div>
                  <span>Kesehatan Mental (15%)</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: '#e74a3b' }}></div>
                  <span>Lainnya (5%)</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>

      {/* Recent Content and Activities */}
      <Row>
        <Col className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Artikel Terbaru</h6>
            </Card.Header>
            <Card.Body>
              <Table responsive hover className="recent-articles">
                <thead>
                  <tr>
                    <th>Judul</th>
                    <th>Kategori</th>
                    <th>Penulis</th>
                    <th>Status</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                {articles ? articles.map(value => (
                  <tbody>
                    <tr>
                      <td>{ value.judul }</td>
                      <td>{ categories ? categories.find(categori => categori.id === value.kategori_id).nama_kategori : "tidak mempunyai kategori" }</td>
                      <td>{ value.author }</td>
                      <td><span className="badge bg-success">Diterbitkan</span></td>
                      <td>12/05/2025</td>
                    </tr>
                  </tbody>
                )) : <></>}
              </Table>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xl={4} className="mb-4">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h6 className="m-0 font-weight-bold">Aktivitas Terbaru</h6>
            </Card.Header>
            <Card.Body>
              <div className="activity-timeline">
                <div className="activity-item">
                  <div className="activity-icon bg-primary">
                    <FaUserPlus />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Pengguna Baru Terdaftar</div>
                    <p>Rahman S. telah mendaftar sebagai pengguna baru</p>
                    <div className="activity-time">2 jam yang lalu</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-success">
                    <FaNewspaper />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Artikel Diterbitkan</div>
                    <p>Dr. Andi menerbitkan artikel "10 Tips Menjaga Kesehatan Jantung"</p>
                    <div className="activity-time">4 jam yang lalu</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-info">
                    <FaEye />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Lonjakan Kunjungan</div>
                    <p>Artikel "Manfaat Olahraga Pagi untuk Kesehatan" dikunjungi 500+ kali</p>
                    <div className="activity-time">Kemarin, 14:23</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-warning">
                    <FaCog />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Pengaturan Diperbarui</div>
                    <p>Admin telah memperbarui pengaturan notifikasi sistem</p>
                    <div className="activity-time">Kemarin, 09:10</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon bg-danger">
                    <FaUserPlus />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">Penulis Baru Ditambahkan</div>
                    <p>Dr. Dewi telah ditambahkan sebagai penulis dengan spesialisasi Kesehatan Mental</p>
                    <div className="activity-time">3 hari yang lalu</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default Dashboard;