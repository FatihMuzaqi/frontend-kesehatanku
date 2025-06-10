import { useState } from 'react';
import { Form, InputGroup, Button, Alert } from 'react-bootstrap';

export default function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Masukkan alamat email yang valid.');
      setSubscribed(false);
      return;
    }
    setError('');
    setSubscribed(true);
    console.log('Berlangganan dengan email:', email);
    setEmail('');
  };

  return (
    <>
      <h5 className="fw-bold mb-4">Dapatkan Artikel Terbaru</h5>
      <p>Langganan newsletter kami untuk mendapatkan informasi kesehatan terbaru.</p>
      <Form onSubmit={handleSubscribe} className="mt-3">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Alamat email Anda"
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" className="btn-primary">Kirim</Button>
        </InputGroup>
      </Form>

      {subscribed && (
        <Alert variant="success" className="py-2 px-3">
          Terima kasih telah mengirimkan email Anda!
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="py-2 px-3">
          {error}
        </Alert>
      )}
    </>
  );
}
