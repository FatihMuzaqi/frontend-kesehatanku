import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form, Image } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import CategoriPresenter from '../../Presenter/CategoriePresenter';
import modelDashboard from '../../Model/modelDashboard';
import LoadingSpinner from '../../Animation Loading/loadingSpinner';
import LoadingBerputar from '../../Animation Loading/LoadingBerputar';

const Categories = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Tambah Kategori');
  const [editId, setEditId] = useState(null);
  const [kategoris, setKategoris] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [kategori, setKategori] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [imageKategori, setImageKategori] = useState(null);
  const [showImage, setShowImage] = useState(null);


  const imageRef = useRef();



  const presenter = new CategoriPresenter({
    model: modelDashboard,
    view: {
      Kategoris: setKategoris,
      setShowModal: setShowModal,
      EditId: setEditId,
      modelTitle: setModalTitle,
      setLoading: setLoading,
    }
  });
  function handleAddCategory() {
    setModalTitle('Tambah Kategori');
    setEditId(null);
    setShowModal(true);
  };

  function handleEditCategory(id) {
    setModalTitle('Edit Kategori');
    setEditId(id);
    setShowModal(true);
  };

  async function SimpanKategori() {
    await presenter.simpanKategori(editId, kategori, deskripsi, kategoris, imageKategori);
  }

  async function handleDelete(id) {
    await presenter.deleteKategori(id);
  }

  async function handleSelect(e) {
    const image = e.target.files[0];
    if (!image) return;
    setShowImage(URL.createObjectURL(image));
    setImageKategori(image);
  }
  

  useEffect(() => {
    presenter.getKategori();
  }, []);
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Kategori Artikel</h2>
            <Button variant="primary" onClick={handleAddCategory}>
              <FaPlus className="me-2" /> Tambah Kategori
            </Button>
          </div>
          <Card>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Nama Kategori</th>
                    <th>Deskripsi</th>
                    <th>Tanggal Publikasi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kategoris !== null ? kategoris.map(kategori => (
                    <tr key={kategori?.id}>
                      <td>{kategori?.id}</td>
                      <td><Image src={kategori?.images} width={60} height={60} rounded/></td>
                      <td>{kategori?.nama_kategori}</td>
                      <td>{kategori?.deskripsi}</td>
                      <td>
                        {new Date(kategori?.createdAt).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-1"
                          onClick={() => handleEditCategory(kategori.id)}
                        >
                          <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(kategori.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  )) : <></>}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Tambah/Edit Kategori */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image Kategori</Form.Label>
              <Form.Control
                type="file"
                placeholder="Masukkan nama kategori"
                onChange={handleSelect}
                ref={imageRef}
                hidden
              />
              <Button variant="none" type="button" onClick={() => imageRef.current.click()} className="d-flex align-items-end">
                <Image src={editId ? kategoris?.find(value => value.id == editId).images : showImage || '/image/profile-default.jpg'} width={80} height={80} className="rounded-circle object-fit-content outline-0" />
                <FaEdit className="position-relative end-50 text-light" />
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama kategori"
                defaultValue={editId ? kategoris.find(c => c.id === editId)?.nama_kategori : ''}
                onChange={(e) => setKategori(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Deskripsi kategori (opsional)"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={SimpanKategori} className="d-flex align-items-center gap-1" disabled={Loading ? true : false}>
            {Loading ? <LoadingBerputar wdith={20} hiegth={20} /> : <></>}Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Categories;