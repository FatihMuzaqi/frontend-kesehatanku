import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  // Data statis untuk grafik
  const visitorData = [
    { name: "1 Mei", visitors: 400 },
    { name: "2 Mei", visitors: 300 },
    { name: "3 Mei", visitors: 500 },
    { name: "4 Mei", visitors: 280 },
    { name: "5 Mei", visitors: 590 },
    { name: "6 Mei", visitors: 320 },
    { name: "7 Mei", visitors: 350 },
  ];

  const articleData = [
    { name: "Kes. Jantung", articles: 15 },
    { name: "Kes. Anak", articles: 12 },
    { name: "Nutrisi", articles: 18 },
    { name: "Penyakit Kronis", articles: 8 },
    { name: "Kes. Mental", articles: 10 },
  ];

  const deviceData = [
    { name: "Desktop", value: 45 },
    { name: "Mobile", value: 50 },
    { name: "Tablet", value: 5 },
  ];

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="h3 mb-1">Analytics</h2>
          <p className="text-muted mb-0">
            Lihat data dan grafik analitik terkini dari aktivitas pengguna secara real-time.
          </p>
        </Col>
      </Row>

      {/* Cards Overview */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-left-primary mb-3 text-center">
            <Card.Body>
              <h3>5,240</h3>
              <p className="text-muted mb-0">Total Pengunjung</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-left-primary mb-3 text-center">
            <Card.Body>
              <h3>63</h3>
              <p className="text-muted mb-0">Total Artikel</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-left-primary mb-3 text-center">
            <Card.Body>
              <h3>2.8</h3>
              <p className="text-muted mb-0">Artikel Per Pengunjung</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-left-primary mb-3 text-center">
            <Card.Body>
              <h3>4:23</h3>
              <p className="text-muted mb-0">Waktu Kunjungan Rata-rata</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Line Chart - Visitors */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>Pengunjung Harian (7 Hari Terakhir)</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Bar Chart - Articles by Category */}
        <Col md={6}>
          <Card>
            <Card.Header>Artikel Per Kategori</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={articleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="articles" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Pie Chart - Device Distribution */}
        <Col md={6}>
          <Card>
            <Card.Header>Distribusi Perangkat</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
