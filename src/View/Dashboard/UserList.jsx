import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Badge, Pagination, Modal } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaUserPlus, FaFilter } from 'react-icons/fa';
import UserListPresenter from '../../Presenter/UserListPresenter';
import Users from '../../Model/users';
import LoadingBerputar from '../../Animation Loading/LoadingBerputar';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setSusers] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [RenderUsers, setRenderUsers] = useState(null);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [startList, setStartList] = useState(1);
  const [lastList, setLastList] = useState(5);
  const [firstList, setFirstList] = useState(0);
  const [endList, setEndList] = useState(null);
  // Data statis untuk daftar user


  const presenter = new UserListPresenter({
    model: Users,
    view: {
      setUsers: setSusers,
      setLoading: setLoading,
      setRenderUsers: setRenderUsers,
      setEndList: setEndList,
      setStartList: setStartList,
      setLastList: setLastList,
      setFirstList: setFirstList,
      setShowModal: setShowModal
    }
  })

  async function getUsers() {
    await presenter.getUsers();
  }
  async function handleDelete(id) {
    await presenter.deleteUser(id);
  }
  function handleEdit(id) {
    setEditId(id);
    console.log(id);
    setShowModal(true);
  }
  function hanldeFilterRole(e) {
    presenter.hanldeFilterRole(e.target.value, users);
  }

  function handleNext() {
    presenter.handleNext(startList, endList);
  }
  function handlePrev() {
    presenter.handlePrev(startList, endList);
  }
  async function SimpanUser() {
    await presenter.handleEdit(editId, name, email, password, users);
  }


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2 className="mb-3">Manajemen User</h2>
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Cari user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline-secondary">
                      <FaSearch />
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Select onChange={hanldeFilterRole}>
                    <option value="">Filter Role</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="contributor">Kontributor</option>
                  </Form.Select>
                </Col>
                <Col md={3} className="text-end">
                  <Button variant="primary" href="/dashboard/users/create">
                    <FaUserPlus className="me-2" /> Tambah User
                  </Button>
                </Col>
              </Row>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                {users !== null ?
                  <tbody>
                    {RenderUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.roleId.name}</td>
                        <td>
                          <Button variant="warning" size="sm" className="me-1" onClick={() => handleEdit(user.id)}>
                            <FaEdit />
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                            <FaTrash />
                          </Button>
                        </td>
                      </tr>
                    )).slice(firstList, lastList)}
                  </tbody> : <></>}
              </Table>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>Menampilkan 1-{endList} dari {endList} entries</div>
                <Pagination>
                  <Pagination.Prev onClick={handlePrev} />
                  <Pagination.Item active>{startList}</Pagination.Item>
                  <Pagination.Next onClick={handleNext} />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal Tambah/Edit Kategori */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Name"
                defaultValue={editId ? RenderUsers.find(c => c.id === editId)?.name : ''}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Masukkan Email"
                defaultValue={editId ? RenderUsers.find(c => c.id === editId)?.email : ''}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan Password"
                defaultValue={editId ? RenderUsers.find(c => c.id === editId)?.password : ''}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={SimpanUser} className="d-flex align-items-center gap-1" disabled={Loading ? true : false}>
            {Loading ? <LoadingBerputar wdith={20} hiegth={20} /> : <></>}Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList;