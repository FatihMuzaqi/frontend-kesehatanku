import { instance } from '.';

export class ContactModel {

  async fetchKategori() {
    try {
      const [kategoriRes, artikelRes] = await Promise.all([
        instance.get(`/api/kategori`),
        instance.get(`/api/artikel`)
      ]);

      const kategoriData = kategoriRes.data.data;
      const artikelData = artikelRes.data.data;

      const kategoriWithCount = kategoriData.map(k => {
        const count = artikelData.filter(a => String(a.kategori_id) === String(k.id)).length;
        return { ...k, count };
      });

      return kategoriWithCount;
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
      throw error;
    }
  }

  validateFormData(formData) {
    const errors = {};

    if (!formData.name?.trim()) {
      errors.name = 'Nama lengkap wajib diisi';
    }

    if (!formData.email?.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }

    if (!formData.message?.trim()) {
      errors.message = 'Pesan wajib diisi';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Pesan minimal 10 karakter';
    }

    if (formData.phone && !/^[\+]?[0-9\s\-\(\)]+$/.test(formData.phone)) {
      errors.phone = 'Format nomor telepon tidak valid';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  async submitContactForm(formData) {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.'
        });
      }, 1000);
    });
  }
  getInitialFormState() {
    return {
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    };
  }
}