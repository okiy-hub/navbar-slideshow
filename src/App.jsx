
import { useEffect, useState } from 'react';
import {
  Navbar, Nav, Container, Carousel,
  Row, Col, Card, Button, Form
} from 'react-bootstrap';

const wisata = [
  {
    nama: 'Bali',
    lokasi: 'Bali',
    gambar: '/images/slide1.webp',
    deskripsi: 'Nikmati keindahan pantai, budaya, dan suasana tropis Bali.'
  },
  {
    nama: 'Raja Ampat',
    lokasi: 'Papua Barat Daya',
    gambar: '/images/slide2.webp',
    deskripsi: 'Jelajahi keindahan pulau dan laut biru Raja Ampat.'
  },
  {
    nama: 'Gunung Bromo',
    lokasi: 'Jawa Timur',
    gambar: '/images/slide3.webp',
    deskripsi: 'Nikmati pemandangan pegunungan dan matahari terbit.'
  }
];

function App() {
  const [menuAktif, setMenuAktif] = useState('beranda');
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [pesanTerkirim, setPesanTerkirim] = useState(false);

  // Menandai menu sesuai bagian halaman yang dibuka
  useEffect(() => {
    const cekPosisi = () => {
      const daftar = ['beranda', 'destinasi', 'tentang', 'kontak'];
      let aktif = 'beranda';

      daftar.forEach((id) => {
        const bagian = document.getElementById(id);
        if (bagian && bagian.getBoundingClientRect().top <= 130) {
          aktif = id;
        }
      });

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10
      ) {
        aktif = 'kontak';
      }

      setMenuAktif(aktif);
    };

    window.addEventListener('scroll', cekPosisi);
    cekPosisi();

    return () => window.removeEventListener('scroll', cekPosisi);
  }, []);

  const pilihMenu = (nama) => {
    setMenuAktif(nama);
    setMenuTerbuka(false);
  };

  const kirimPesan = (e) => {
    e.preventDefault();
    setPesanTerkirim(true);
    e.currentTarget.reset();
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar
        expand="lg"
        sticky="top"
        className="navbar-custom"
        expanded={menuTerbuka}
        onToggle={(value) => setMenuTerbuka(value)}
      >
        <Container>
          <Navbar.Brand href="#beranda" className="brand">
            Jelajah Nusantara
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="menu-utama" />

          <Navbar.Collapse id="menu-utama">
            <Nav className="ms-auto">
              <Nav.Link
                href="#beranda"
                active={menuAktif === 'beranda'}
                onClick={() => pilihMenu('beranda')}
              >
                Beranda
              </Nav.Link>

              <Nav.Link
                href="#destinasi"
                active={menuAktif === 'destinasi'}
                onClick={() => pilihMenu('destinasi')}
              >
                Destinasi
              </Nav.Link>

              <Nav.Link
                href="#tentang"
                active={menuAktif === 'tentang'}
                onClick={() => pilihMenu('tentang')}
              >
                Tentang Kami
              </Nav.Link>

              <Nav.Link
                href="#kontak"
                active={menuAktif === 'kontak'}
                onClick={() => pilihMenu('kontak')}
              >
                Kontak
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* BERANDA - CAROUSEL */}
      <section id="beranda">
        <Carousel interval={3500} controls indicators pause="hover">
          {wisata.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                src={item.gambar}
                alt={item.nama}
                className="carousel-image"
              />

              <div className="slide-overlay"></div>

              <Carousel.Caption className="hero-caption">
                <h1>Jelajahi {item.nama}</h1>
                <p>{item.deskripsi}</p>

                <Button
                  href="#destinasi"
                  className="btn-utama"
                  onClick={() => pilihMenu('destinasi')}
                >
                  Jelajahi Destinasi
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* DESTINASI WISATA */}
      <section id="destinasi" className="section-content">
        <Container>
          <div className="section-heading">
            <h2>Destinasi Wisata Pilihan</h2>
            <p>
              Temukan berbagai tempat wisata menarik
              untuk perjalanan kamu berikutnya.
            </p>
          </div>

          <Row className="g-4">
            {wisata.map((item, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="wisata-card h-100">
                  <Card.Img
                    variant="top"
                    src={item.gambar}
                    alt={item.nama}
                    className="wisata-image"
                  />

                  <Card.Body>
                    <p className="lokasi">{item.lokasi}</p>
                    <Card.Title>{item.nama}</Card.Title>
                    <Card.Text>{item.deskripsi}</Card.Text>

                    <Button
                      href="#kontak"
                      className="btn-card"
                      onClick={() => pilihMenu('kontak')}
                    >
                      Tanya Destinasi
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* TENTANG KAMI */}
      <section id="tentang" className="section-content about-section">
        <Container>
          <Row className="align-items-center g-4">
            <Col md={6}>
              <img
                src="/images/slide2.webp"
                alt="Wisata alam Indonesia"
                className="about-image"
              />
            </Col>

            <Col md={6}>
              <h2>Tentang Jelajah Nusantara</h2>
              <p>
                Jelajah Nusantara adalah website informasi
                pariwisata yang memperkenalkan berbagai
                destinasi wisata menarik di Indonesia.
              </p>
              <p>
                Melalui website ini, pengunjung dapat melihat
                informasi singkat serta foto tempat wisata,
                mulai dari pantai hingga pegunungan.
              </p>
              <p>
                Kami ingin mengajak lebih banyak orang untuk
                mengenal dan menikmati keindahan alam Indonesia.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* KONTAK */}
      <section id="kontak" className="section-content">
        <Container>
          <div className="section-heading">
            <h2>Hubungi Kami</h2>
            <p>
              Ada pertanyaan seputar destinasi wisata?
              Silakan isi formulir di bawah ini.
            </p>
          </div>

          <div className="contact-box">
            <Form onSubmit={kirimPesan}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Lengkap</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama kamu"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Masukkan email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Destinasi Pilihan</Form.Label>
                <Form.Select defaultValue="">
                  <option value="" disabled>
                    Pilih destinasi
                  </option>
                  {wisata.map((item) => (
                    <option key={item.nama} value={item.nama}>
                      {item.nama}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pesan</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Tulis pertanyaan kamu"
                  required
                />
              </Form.Group>

              <Button type="submit" className="btn-utama">
                Kirim Pesan
              </Button>

              {pesanTerkirim && (
                <p className="pesan-sukses" role="status">
                  Form berhasil diisi. Pesan ini masih
                  simulasi dan belum dikirim ke server.
                </p>
              )}
            </Form>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <Container>
          <p>© 2026 Jelajah Nusantara. Explore Indonesia.</p>
        </Container>
      </footer>
    </>
  );
}

export default App;
