import { instance } from ".";

export class HomeModel {

  async fetchArtikel() {
    try {
      const response = await instance.get(`/api/artikel`);
      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.artikel)) {
        return data.artikel;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error("Struktur data artikel tidak dikenali:", data);
        return [];
      }
    } catch (error) {
      console.error("Gagal fetch artikel:", error);
      throw error;
    }
  }

  async fetchKategoriKesehatan() {
    try {
      const response = await instance.get(`/api/kategori`);
      const data = response.data;

      if (Array.isArray(data)) {
        return data;
      } else if (Array.isArray(data.kategori)) {
        return data.kategori;
      } else if (Array.isArray(data.data)) {
        return data.data;
      } else {
        console.error("Struktur data kategori tidak dikenali:", data);
        return [];
      }
    } catch (error) {
      console.error("Gagal fetch kategori kesehatan:", error);
      throw error;
    }
  }

  shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  sortArticlesByDate(articles) {
    return [...articles].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  calculateArtikelCountPerKategori(artikel, kategoriKesehatan) {
    return kategoriKesehatan.map((kategori) => {
      const count = artikel.filter((art) => art.kategori_id === kategori.id).length;
      return { ...kategori, count };
    });
  }

  getTop3Kategori(artikelCountPerKategori) {
    return artikelCountPerKategori
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }

  getNamaKategori(kategoriId, kategoriKesehatan) {
    const kategori = kategoriKesehatan.find(k => k.id === kategoriId);
    return kategori ? kategori.nama_kategori : 'Kategori Tidak Ditemukan';
  }
  getUserRole() {
    return "user"; 
  }
}