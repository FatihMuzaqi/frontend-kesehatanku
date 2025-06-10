import React, { useEffect } from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ArticlePresenter from '../../Presenter/ArticlePresenter';
import Dashboard from '../../Model/modelDashboard';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRef } from 'react';

const CreateArticle = () => {

  const [Loading, setLoading] = useState();
  const [judul, setJudul] = useState(null);
  const [images, setImages] = useState(null);
  const [status, setStatus] = useState(null);
  const [author, setAuthor] = useState(null);
  const [kategori, setKategori] = useState(null);
  const [kategoris, setKategoris] = useState(null);

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const editorRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const getArticle = location.state || null;
  const [editId, setEditId] = useState(getArticle !== null ? getArticle.id : null);

  const presenter = new ArticlePresenter({
    model: Dashboard,
    view: {
      setLoading: setLoading,
      setKategoris: setKategoris,
      navigate: navigate,
      setShow: setShow,
      setMessage: setMessage
    }
  });

  async function submit(e) {
    e.preventDefault();
    if (editId !== null) {
      await presenter.updateArticle(editId, judul, editorRef.current.getContent(), images, status, author, kategori, getArticle);
      setEditId(null);
      return;
    }
    await presenter.createArticle(judul, editorRef.current.getContent(), images, status, author, kategori);
  }

  useEffect(() => {
    presenter.getKategori();
  }, []);
  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Tambah Artikel Baru</h2>
          <Card>
            <Card.Body>
              <Form onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Artikel</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan judul artikel" defaultValue={getArticle !== null ? getArticle.judul : null} onChange={(e) => setJudul(e.target.value)} required={editId ? false : true} />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Kategori</Form.Label>
                      <Form.Select onChange={(e) => setKategori(e.target.value)} required={editId ? false : true}>
                        {getArticle !== null ? getArticle.kategori_id : null}
                        <option value="">Pilih Kategori</option>
                        {kategoris !== null ? kategoris.map(value => (
                          <option value={value.id} key={value.id}>{value.nama_kategori}</option>
                        )) : <></>}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Author</Form.Label>
                      <Form.Control type="text" placeholder="Tag1, Tag2, Tag3" defaultValue={getArticle !== null ? getArticle.author : null} onChange={(e) => setAuthor(e.target.value)} required={editId ? false : true} />
                      <Form.Text className="text-muted">
                        Pisahkan tag dengan koma
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Upload Thumbnail</Form.Label>
                  <Form.Control type="file" onChange={(e) => setImages(e.target.files[0])} required={editId ? false : true} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Konten Artikel</Form.Label>
                  <div className="editor-container border rounded p-2">
                    <Editor apiKey="hpzq2xow74fx45mo3r57jatzd75rrj63fb2sl8dhsuf3tc1c"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={getArticle !== null ? getArticle.isi : null}
                      init={{
                        height: 500,
                        plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                          'insertdatetime', 'media', 'table', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                          'bold italic backcolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                      }}
                    />
                    {/* Alternatif dengan CKEditor:
                    <CKEditor
                      editor={ClassicEditor}
                      data=""
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ data });
                      }}
                    /> */}
                  </div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select onChange={(e) => setStatus(e.target.value)} required={editId ? false : true}>
                        <option value="">Pilih Status</option>
                        <option value="publish">Publish</option>
                        <option value="draft">Draft</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Tanggal Publikasi</Form.Label>
                      <Form.Control type="datetime-local" />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4 d-flex justify-content-end">
                  <Button variant="secondary" className="me-2">
                    <FaTimes className="me-1" /> Batal
                  </Button>
                  <Button variant="primary" type="submit">
                    <FaSave className="me-1" /> Simpan
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

export default CreateArticle;