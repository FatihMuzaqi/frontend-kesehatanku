import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Pagination, Image } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import KesehatanListPresenter from "../../Presenter/KesehatanListPresenter";
import Kesehatan from "../../Model/kesehatanModel";

const KesehatanList = () => {
    const [kesehatan, setKesehatan] = useState(null);
    const [renderKesehatan, setRenderKesehatan] = useState(null);

    const presenter = new KesehatanListPresenter({
        model: new Kesehatan(),
        view: {
            setKesehatan: setKesehatan,
            setRenderKesehatan: setRenderKesehatan
        }
    })

    async function handleDelete(id) {
        await presenter.deleteKesehatan(id);
    }

    useEffect(() => {
        presenter.getKesehatan();
    }, []); 


    return (
        <Container fluid>
            <Row className="mb-4">
                <Col>
                    <h2 className="mb-3">Data Cek Kesehatan User</h2>
                    <Card>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col md={5}>
                                    <InputGroup>
                                        <Form.Control
                                            placeholder="cari...."
                                        />
                                        <Button variant="outline-secondary">
                                            <FaSearch />
                                        </Button>
                                    </InputGroup>
                                </Col>
                                <Col md={3}>
                                </Col>
                            </Row>

                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama User</th>
                                        <th>Prediksi</th>
                                        <th>Saran</th>
                                        <th>Tanggal</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { renderKesehatan?.map((value, index) => (
                                        <tr key={value?.id}>
                                            <td>{index + 1}</td>
                                            <td>{value?.user?.name}</td>
                                            <td>{value?.hasil_prediksi}</td>
                                            <td>{value?.saran}</td>
                                            <td>
                                                {new Date(value?.currentTime).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </td>
                                            <td>
                                                <Button variant="danger" size="sm" onClick={() => handleDelete(value?.id)}>
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    )) }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


export default KesehatanList;