import { ContactModel } from '../Model/ContactModel';

export class ContactPresenter {
  constructor(view) {
    this.view = view;
    this.model = new ContactModel();
    this.init();
  }

  async init() {
    try {
      this.view.setLoading(true);
      const categories = await this.model.fetchKategori();
      this.view.setCategories(categories);
    } catch (error) {
      this.view.showAlert('danger', 'Gagal memuat data kategori');
    } finally {
      this.view.setLoading(false);
    }
  }

  handleInputChange(name, value) {
    this.view.updateFormField(name, value);
  }

  async handleSubmit(formData) {
    const validation = this.model.validateFormData(formData);
    
    if (!validation.isValid) {
      const errorMessages = Object.values(validation.errors);
      this.view.showAlert('danger', errorMessages.join(', '));
      return;
    }

    try {
      this.view.setSubmitting(true);
      const result = await this.model.submitContactForm(formData);
      
      if (result.success) {
        this.view.showAlert('success', result.message);
        this.view.resetForm();
      }
    } catch (error) {
      this.view.showAlert('danger', 'Terjadi kesalahan saat mengirim pesan');
    } finally {
      this.view.setSubmitting(false);
    }
  }

  hideAlert() {
    this.view.hideAlert();
  }

  getInitialFormState() {
    return this.model.getInitialFormState();
  }
}