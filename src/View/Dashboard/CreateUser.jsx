import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import CreateUserPresenter from '../../Presenter/createUserPresenter';
import Users from '../../Model/users';
import LoadingBerputar from '../../Animation Loading/LoadingBerputar';

const CreateUser = () => {
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const presenter = new CreateUserPresenter({
    model: Users,
    view: {
      setLoading: setLoading
    }
  })

  async function submit(e) {
    e.preventDefault();
    await presenter.createUser(name, email, password, confirmPassword);
  }


  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Tambah User Baru</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={submit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Lengkap</Form.Label>
                      <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama lengkap" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Konfirmasi Password</Form.Label>
                      <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Konfirmasi password" />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Select>
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="contributor">Kontributor</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select>
                        <option value="active">Aktif</option>
                        <option value="inactive">Tidak Aktif</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Upload Foto Profil</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                
                <div className="mt-4 d-flex justify-content-end">
                  <Button variant="secondary" className="me-2">
                    <FaTimes className="me-1" /> Batal
                  </Button>
                  <Button variant="primary" type="submit">
                    <div className="d-flex align-items-center gap-1">
                      { Loading ? <LoadingBerputar wdith={20} hiegth={20} /> : <FaSave className="me-1" /> } Simpan
                    </div>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;